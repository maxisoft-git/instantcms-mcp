import { z } from 'zod';

interface ComponentController {
  name: string;
  actions: string[];
  use_model?: boolean;
}

interface ScaffoldComponentOptions {
  addon_name: string;
  controllers?: ComponentController[];
  options?: {
    with_frontend?: boolean;
    with_admin?: boolean;
    with_model?: boolean;
    with_routes?: boolean;
    with_menu?: boolean;
  };
}

export function scaffoldComponent(opts: ScaffoldComponentOptions): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const files: Record<string, string> = {};

  const options = {
    with_frontend: opts.options?.with_frontend ?? true,
    with_admin: opts.options?.with_admin ?? true,
    with_model: opts.options?.with_model ?? true,
    with_routes: opts.options?.with_routes ?? true,
    with_menu: opts.options?.with_menu ?? true,
  };

  const controllers = opts.controllers || [
    { name: 'index', actions: ['index', 'view'], use_model: true },
  ];

  files[`${name}/manifest.json`] = generateManifest(name, Name, controllers, options);
  files[`${name}/backend.php`] = generateBackend(name, Name, controllers, options);

  if (options.with_frontend) {
    files[`${name}/frontend.php`] = generateFrontend(name, Name, controllers);
  }

  if (options.with_model || controllers.some(c => c.use_model)) {
    files[`${name}/model.php`] = generateModel(name, Name, controllers);
  }

  if (options.with_routes) {
    files[`${name}/routes.php`] = generateRoutes(name, Name, controllers);
  }

  files[`${name}/backend/index.php`] = generateBackendIndex(name, Name);

  if (options.with_menu) {
    files[`${name}/menu.php`] = generateMenu(name, Name, controllers);
  }

  files[`system/config/controllers/${name}.php`] = generateConfig(name, Name, controllers);

  return {
    addon_name: name,
    controllers_count: controllers.length,
    options,
    files,
  };
}

function generateManifest(
  name: string,
  Name: string,
  controllers: ComponentController[],
  options: any
): string {
  const category = 'content';
  return `<?php
// InstantCMS 2. manifest.json
return [
    'type' => 'component',
    'name' => '${name}',
    'title' => '${Name}',
    'description' => '${Name} component',
    'icon' => 'component_${name}',
    'version' => '1.0.0',
    'category' => '${category}',
    'files' => [
        'backend.php',
        'frontend.php',
        'model.php',
        'routes.php',
    ],
    'controllers' => ['${controllers.map(c => c.name).join("', '")}'],
    'options' => [
        'frontend' => ${options.with_frontend},
        'admin' => ${options.with_admin},
    ],
    'dependencies' => [],
];`;
}

function generateBackend(
  name: string,
  Name: string,
  _controllers: ComponentController[],
  _options: any
): string {
  return `<?php
// InstantCMS 2. ${name}/backend.php

class ${Name}Backend extends cmsBackend {
    
    protected $useOptions = true;
    protected $showTaxonomy = true;
    
    public function __construct($request) {
        parent::__construct($request);
        
        cmsTemplate::getInstance()->addChainLinks(
            'Настройки',
            $this->cms_config->href_to('controllers', '${name}')
        );
    }
    
    public function getBackendMenu() {
        return [
            [
                'title' => '${Name}',
                'url' => $this->cms_config->href_to(''),
                'options' => ['icon' => 'component_${name}'],
            ],
            [
                'title' => 'Настройки',
                'url' => $this->cms_config->href_to('options'),
                'icon' => 'settings',
            ],
        ];
    }
    
    public function validateVariants($${name}_item) {
        return true;
    }
    
    public function getContentDescription($item) {
        return '';
    }
    
    public function actionToggleEnabled($${name}_item) {
        return $this->redirectToAction('index');
    }
}`;
}

function generateFrontend(name: string, Name: string, controllers: ComponentController[]): string {
  return `<?php
// InstantCMS 2. ${name}/frontend.php

class ${Name}Frontend extends cmsFrontend {
    
    protected $useOptions = false;
    
    public function __construct($request) {
        parent::__construct($request);
        
        $this->setContext('${Name}', '${controllers[0]?.name || 'index'}');
    }
    
    public function routes() {
        return include __DIR__ . '/routes.php';
    }
    
    public function beforeWallPost($item, $user) {
        return $item;
    }
    
    public function getSeoPatterns() {
        return [
            'index' => [
                'title' => '{${name}_page}.title | {site.name}',
                'description' => '{${name}_page}.description',
                'keywords' => '{${name}_page}.keywords',
            ],
        ];
    }
    
    public function getTagCategory() {
        return [
            'name' => '${name}',
            'title' => '${Name}',
        ];
    }
}`;
}

function generateModel(name: string, Name: string, _controllers: ComponentController[]): string {
  return `<?php
// InstantCMS 2. ${name}/model.php

class ${Name}Model extends cmsModel {
    
    public $table = '${name}';
    public $cat_table = '${name}_cats';
    
    public function __construct() {
        parent::__construct();
        
        $this->useCategories = true;
        $this->cats_table = $this->cat_table;
    }
    
    public function get${Name}($id, $field = 'id') {
        return $this->getItem($this->table, function ($item) {
            $item['user'] = cmsModel::getInstance('users')->getUser($item['user_id']);
            return $item;
        }, [$field => $id]);
    }
    
    public function get${Name}s($filters = [], $order = 'id DESC', $page = 1, $perpage = 20) {
        $this->filterColumns($filters);
        
        return $this->get($this->table, function ($item) {
            $item['user'] = cmsModel::getInstance('users')->getUser($item['user_id']);
            return $item;
        }, $filters, $order, $page, $perpage);
    }
    
    public function getCategories() {
        return $this->get($this->cat_table, function ($item) {
            return $item;
        }, [], 'ordering ASC');
    }
    
    public function add${Name}($data) {
        $data['user_id'] = cmsUser::getInstance()->id;
        $data['date_pub'] = date('Y-m-d H:i:s');
        
        return $this->insert($this->table, $data);
    }
    
    public function update${Name}($id, $data) {
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        return $this->update($this->table, $id, $data);
    }
    
    public function delete${Name}($id) {
        return $this->delete($this->table, $id, [
            'images' => ['path' => 'upload/${name}/', 'field' => 'image'],
        ]);
    }
    
    public function countItems($category_id = null) {
        $this->filterIsNull('is_deleted');
        
        if ($category_id) {
            $this->filterEqual('category_id', $category_id);
        }
        
        return $this->getCount($this->table);
    }
}`;
}

function generateRoutes(name: string, Name: string, controllers: ComponentController[]): string {
  const routes = controllers
    .map(c => {
      return `    '${c.name}' => [
        '/' => ['${Name}Frontend', 'actionIndex', '{${c.name}_page}'],
        '/{slug}' => ['${Name}Frontend', 'actionView', '{slug}'],
    ],`;
    })
    .join('\n');

  return `<?php
// InstantCMS 2. ${name}/routes.php

return [
${routes}
];`;
}

function generateBackendIndex(name: string, Name: string): string {
  return `<?php
// InstantCMS 2. ${name}/backend/index.php

class ${Name}Backend extends cmsBackend {
    
    public function actionIndex() {
        $grid = $this->loadDataGrid('${name}');
        
        $this->renderTemplate('index', [
            'grid' => $grid,
        ]);
    }
    
    public function actionAdd() {
        $form = $this->getForm('${name}');
        
        if ($this->request->has('submit')) {
            $data = $form->parse($this->request, ['submit']);
            
            if ($form->validate($this, $data)) {
                $id = $this->model->add${Name}($data);
                
                cmsUser::addSessionMessage('Запись добавлена', 'success');
                $this->redirectToAction('edit', $id);
            }
        }
        
        $this->renderTemplate('form', [
            'form' => $form,
        ]);
    }
    
    public function actionEdit($id) {
        $item = $this->model->get${Name}($id);
        
        if (!$item) {
            cmsCore::error404();
        }
        
        $form = $this->getForm('${name}');
        
        if ($this->request->has('submit')) {
            $data = $form->parse($this->request, ['submit']);
            
            if ($form->validate($this, $data)) {
                $this->model->update${Name}($id, $data);
                
                cmsUser::addSessionMessage('Запись сохранена', 'success');
                $this->redirectToAction('edit', $id);
            }
        }
        
        $this->renderTemplate('form', [
            'item' => $item,
            'form' => $form,
        ]);
    }
    
    public function actionDelete($id) {
        $this->model->delete${Name}($id);
        
        cmsUser::addSessionMessage('Запись удалена', 'success');
        $this->redirectToAction('index');
    }
}`;
}

function generateMenu(name: string, Name: string, controllers: ComponentController[]): string {
  return `<?php
// InstantCMS 2. ${name}/menu.php

return [
    'url' => href_to('${controllers[0]?.name || '${name}'}'),
    'title' => '${Name}',
    'icon' => 'component_${name}',
    'visibility' => ['0' => 'all', '1' => 'auth', '2' => 'nonauth'],
];`;
}

function generateConfig(name: string, _Name: string, controllers: ComponentController[]): string {
  return `<?php
// InstantCMS 2. system/config/controllers/${name}.php

return [
    'enabled' => true,
    'controllers' => ['${controllers.map(c => c.name).join("', '")}'],
    'options' => [
        'is_premod' => false,
        'is_tags' => true,
        'is_rs' => true,
        'hits_to_top' => true,
        'profile_on' => true,
        'pub_days' => 0,
        'front_edit' => false,
    ],
];`;
}

export const componentToolSchema = {
  name: 'scaffold_component',
  description: 'Генерация полного компонента InstantCMS с backend, frontend, model',
  inputSchema: {
    type: 'object' as const,
    properties: {
      addon_name: { type: 'string', description: 'Имя компонента' },
      controllers: z
        .array(
          z.object({
            name: z.string().describe('Имя контроллера'),
            actions: z.array(z.string()).describe('Экшены'),
            use_model: z.boolean().optional().describe('Использовать модель'),
          })
        )
        .optional()
        .describe('Контроллеры'),
      options: z
        .object({
          with_frontend: z.boolean().optional().describe('С frontend'),
          with_admin: z.boolean().optional().describe('С админкой'),
          with_model: z.boolean().optional().describe('С моделью'),
          with_routes: z.boolean().optional().describe('С роутами'),
          with_menu: z.boolean().optional().describe('С меню'),
        })
        .optional()
        .describe('Опции'),
    },
    required: ['addon_name'],
  },
  inputExamples: [
    {
      addon_name: 'board',
      controllers: [{ name: 'index', actions: ['index', 'view', 'add', 'edit'], use_model: true }],
      options: { with_frontend: true, with_model: true },
    },
  ],
};
