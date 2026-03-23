interface CacheConfig {
  addon_name: string;
  options?: {
    use_memcached?: boolean;
    use_redis?: boolean;
    default_ttl?: number;
    use_tags?: boolean;
  };
}

export function scaffoldCache(opts: CacheConfig): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const files: Record<string, string> = {};

  const options = {
    use_memcached: opts.options?.use_memcached ?? false,
    use_redis: opts.options?.use_redis ?? false,
    default_ttl: opts.options?.default_ttl ?? 3600,
    use_tags: opts.options?.use_tags ?? true,
  };

  files[`${name}/cache.php`] = generateCacheClass(name, Name, options);

  if (options.use_tags) {
    files[`${name}/cache.tags.php`] = generateCacheTags(name, Name, options);
  }

  files[`${name}/cache.hooks.php`] = generateCacheHooks(name, Name, options);

  return {
    addon_name: name,
    options,
    files,
  };
}

function generateCacheClass(name: string, Name: string, options: any): string {
  return `<?php
// InstantCMS 2. ${name}/cache.php

class ${Name}Cache {
    private static $instance = null;
    private $cache = null;
    private $prefix = '${name}_';
    private $default_ttl = ${options.default_ttl};
    
    private function __construct() {
        $this->initCache();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function initCache() {
        if (${options.use_redis}) {
            $this->cache = cmsCache::getInstance('redis');
        } elseif (${options.use_memcached}) {
            $this->cache = cmsCache::getInstance('memcached');
        } else {
            $this->cache = cmsCache::getInstance();
        }
    }
    
    public function get($key, $callback = null, $ttl = null) {
        $cache_key = $this->prefix . $key;
        $data = $this->cache->get($cache_key);
        
        if ($data !== false) {
            return $data;
        }
        
        if ($callback !== null) {
            $data = call_user_func($callback);
            $this->set($key, $data, $ttl);
            return $data;
        }
        
        return null;
    }
    
    public function set($key, $value, $ttl = null) {
        $cache_key = $this->prefix . $key;
        $ttl = $ttl ?? $this->default_ttl;
        
        return $this->cache->set($cache_key, $value, $ttl);
    }
    
    public function delete($key) {
        $cache_key = $this->prefix . $key;
        return $this->cache->delete($cache_key);
    }
    
    public function clear() {
        return $this->cache->clean();
    }
    
    public function exists($key) {
        $cache_key = $this->prefix . $key;
        return $this->cache->get($cache_key) !== false;
    }
    
    public function increment($key, $offset = 1) {
        $cache_key = $this->prefix . $key;
        return $this->cache->increment($cache_key, $offset);
    }
    
    public function decrement($key, $offset = 1) {
        $cache_key = $this->prefix . $key;
        return $this->cache->decrement($cache_key, $offset);
    }
    
    public function remember($key, $callback, $ttl = null) {
        return $this->get($key, $callback, $ttl);
    }
    
    public function forget($key) {
        return $this->delete($key);
    }
    
    public function flush() {
        return $this->clear();
    }
    
    // Специальные методы для ${name}
    
    public function invalidateItem($item_id) {
        $this->delete('item_' . $item_id);
        $this->delete('list_page_1');
        
        if (${options.use_tags}) {
            $this->deleteTag('item:' . $item_id);
        }
    }
    
    public function invalidateList() {
        $this->delete('list_page_1');
        $this->delete('list_all');
        
        if (${options.use_tags}) {
            $this->deleteTag('list');
        }
    }
    
    public function warmUp($callback) {
        $data = call_user_func($callback);
        $this->set('list_all', $data);
        return $data;
    }
}`;
}

function generateCacheTags(name: string, Name: string, _options: any): string {
  return `<?php
// InstantCMS 2. ${name}/cache.tags.php

class ${Name}CacheTags {
    private static $instance = null;
    private $cache = null;
    private $prefix = '${name}_tags_';
    private $tag_index_key = '${name}_tag_index';
    
    private function __construct() {
        $this->cache = cmsCache::getInstance();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function get($key, $tags, $callback = null, $ttl = null) {
        $cache_key = $this->prefix . $key;
        $data = $this->cache->get($cache_key);
        
        if ($data !== false) {
            $this->registerTags($key, $tags);
            return $data;
        }
        
        if ($callback !== null) {
            $data = call_user_func($callback);
            $this->set($key, $data, $tags, $ttl);
            return $data;
        }
        
        return null;
    }
    
    public function set($key, $value, $tags, $ttl = null) {
        $cache_key = $this->prefix . $key;
        $this->cache->set($cache_key, $value, $ttl);
        $this->registerTags($key, $tags);
        
        return true;
    }
    
    public function invalidateTag($tag) {
        $tag_index = $this->cache->get($this->tag_index_key) ?: [];
        
        if (empty($tag_index[$tag])) {
            return;
        }
        
        foreach ($tag_index[$tag] as $key) {
            $this->cache->delete($this->prefix . $key);
        }
        
        unset($tag_index[$tag]);
        $this->cache->set($this->tag_index_key, $tag_index);
    }
    
    public function deleteTag($tag) {
        return $this->invalidateTag($tag);
    }
    
    public function flushByTag($tag) {
        return $this->invalidateTag($tag);
    }
    
    public function flushAll() {
        $tag_index = $this->cache->get($this->tag_index_key) ?: [];
        
        foreach ($tag_index as $tag => $keys) {
            foreach ($keys as $key) {
                $this->cache->delete($this->prefix . $key);
            }
        }
        
        $this->cache->delete($this->tag_index_key);
    }
    
    private function registerTags($key, $tags) {
        if (empty($tags)) {
            return;
        }
        
        $tag_index = $this->cache->get($this->tag_index_key) ?: [];
        
        if (!is_array($tags)) {
            $tags = [$tags];
        }
        
        foreach ($tags as $tag) {
            if (empty($tag_index[$tag])) {
                $tag_index[$tag] = [];
            }
            
            if (!in_array($key, $tag_index[$tag])) {
                $tag_index[$tag][] = $key;
            }
        }
        
        $this->cache->set($this->tag_index_key, $tag_index);
    }
    
    public function getTagStats() {
        $tag_index = $this->cache->get($this->tag_index_key) ?: [];
        return [
            'total_tags' => count($tag_index),
            'tags' => array_keys($tag_index),
        ];
    }
}`;
}

function generateCacheHooks(name: string, Name: string, options: any): string {
  return `<?php
// InstantCMS 2. ${name}/cache.hooks.php

class on${Name}CacheHook {
    public function onAfterSave($item) {
        ${Name}Cache::getInstance()->invalidateItem($item['id']);
        ${Name}Cache::getInstance()->invalidateList();
        
        if (${options.use_tags}) {
            ${Name}CacheTags::getInstance()->invalidateTag('item:' . $item['id']);
            ${Name}CacheTags::getInstance()->invalidateTag('list');
        }
    }
    
    public function onAfterDelete($item) {
        ${Name}Cache::getInstance()->invalidateItem($item['id']);
        ${Name}Cache::getInstance()->invalidateList();
        
        if (${options.use_tags}) {
            ${Name}CacheTags::getInstance()->invalidateTag('item:' . $item['id']);
            ${Name}CacheTags::getInstance()->invalidateTag('list');
        }
    }
    
    public function onAfterPublish($item) {
        ${Name}Cache::getInstance()->invalidateItem($item['id']);
        ${Name}Cache::getInstance()->invalidateList();
    }
    
    public function onAfterUnpublish($item) {
        ${Name}Cache::getInstance()->invalidateItem($item['id']);
        ${Name}Cache::getInstance()->invalidateList();
    }
    
    public function onAfterBulkUpdate($ids) {
        foreach ($ids as $id) {
            ${Name}Cache::getInstance()->invalidateItem($id);
        }
        ${Name}Cache::getInstance()->invalidateList();
    }
    
    public function onClearCache() {
        ${Name}Cache::getInstance()->clear();
        
        if (${options.use_tags}) {
            ${Name}CacheTags::getInstance()->flushAll();
        }
    }
}`;
}

export const cacheToolSchema = {
  name: 'scaffold_cache',
  description: 'Генерация системы кэширования для InstantCMS',
  inputSchema: {
    type: 'object' as const,
    properties: {
      addon_name: { type: 'string', description: 'Имя дополнения' },
      options: {
        type: 'object',
        properties: {
          use_memcached: { type: 'boolean', description: 'Использовать Memcached' },
          use_redis: { type: 'boolean', description: 'Использовать Redis' },
          default_ttl: { type: 'number', description: 'TTL по умолчанию (секунды)' },
          use_tags: { type: 'boolean', description: 'Использовать теги кэша' },
        },
      },
    },
    required: ['addon_name'],
  },
  inputExamples: [
    {
      addon_name: 'blog',
      options: { use_redis: true, default_ttl: 3600, use_tags: true },
    },
  ],
};
