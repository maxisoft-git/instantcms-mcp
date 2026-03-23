import { z } from 'zod';

const PermissionTypeEnum = z.enum([
  'view',
  'add',
  'edit',
  'delete',
  'publish',
  'moderate',
  'admin',
]);
type PermissionType = z.infer<typeof PermissionTypeEnum>;

interface PermissionRule {
  type: PermissionType;
  description: string;
  defaultRoles: string[];
}

const PERMISSION_RULES: PermissionRule[] = [
  { type: 'view', description: 'Просмотр контента', defaultRoles: ['all'] },
  { type: 'add', description: 'Добавление контента', defaultRoles: ['auth'] },
  { type: 'edit', description: 'Редактирование своего', defaultRoles: ['auth'] },
  { type: 'delete', description: 'Удаление своего', defaultRoles: ['auth'] },
  { type: 'publish', description: 'Публикация', defaultRoles: ['moderator', 'admin'] },
  { type: 'moderate', description: 'Модерация', defaultRoles: ['moderator', 'admin'] },
  { type: 'admin', description: 'Администрирование', defaultRoles: ['admin'] },
];

const permissionSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z][a-z0-9_]*$/, 'Только lowercase буквы, цифры и подчёркивание'),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  controller: z.string().optional(),
  permissions: z
    .array(z.enum(['view', 'add', 'edit', 'delete', 'publish', 'moderate', 'admin']))
    .optional(),
  category: z.string().optional(),
  options: z
    .object({
      withCategories: z.boolean().optional().default(false),
      withOwnership: z.boolean().optional().default(true),
      withRoles: z.boolean().optional().default(true),
    })
    .optional(),
});

type PermissionInput = z.infer<typeof permissionSchema>;

export function scaffoldPermission(input: PermissionInput): object {
  const name = input.name;
  const title = input.title;
  const description = input.description || '';
  const controller = input.controller || name;
  const permissions = input.permissions || ['view', 'add', 'edit', 'delete'];
  const category = input.category || 'content';
  const options = {
    withCategories: input.options?.withCategories ?? false,
    withOwnership: input.options?.withOwnership ?? true,
    withRoles: input.options?.withRoles ?? true,
  };

  const files: Record<string, string> = {};

  files[`${name}/manifest.json`] = `<?php
// InstantCMS 2. manifest.json
return [
    'type' => 'content_type',
    'name' => '${name}',
    'title' => '${title}',
    'description' => '${description}',
    'controller' => '${controller}',
    'permissions' => ['${permissions.join("', '")}'],
    'category' => '${category}',
    'version' => '1.0.0',
    'dependencies' => [],
    'options' => [
        'categories' => ${options.withCategories},
        'ownership' => ${options.withOwnership},
        'roles' => ${options.withRoles},
    ],
];`;

  const permConfigs = PERMISSION_RULES.filter(r => permissions.includes(r.type))
    .map(
      r => `        '${r.type}' => [
            'title' => '${r.description}',
            'default' => ['${r.defaultRoles.join("', '")}'],
        ]`
    )
    .join(',\n');

  files[`system/config/permissions/${name}.php`] = `<?php
// InstantCMS 2. system/config/permissions/${name}.php

return [
    'name' => '${name}',
    'title' => '${title}',
    'description' => '${description}',
    'controller' => '${controller}',
    'category' => '${category}',
    'rules' => [
${permConfigs}
    ],
];`;

  const permStrings = permissions.map(p => `'${p}'`).join(', ');
  const nameCapital = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

  files[`${name}/permissions.php`] = `<?php
// InstantCMS 2. ${name}/permissions.php

class ${nameCapital}Permissions {
    private static $instance = null;
    private $config = [];
    
    private function __construct() {
        $config_path = cmsConfig::get('root_path') . '/system/config/permissions/${name}.php';
        if (file_exists($config_path)) {
            $this->config = include $config_path;
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function can($permission, $user_id = null, $item = null) {
        $user_id = $user_id ?: cmsUser::getInstance()->id;
        
        if (!$user_id) {
            return in_array($permission, ['view']);
        }
        
        $user = cmsModel::getInstance('users')->getUser($user_id);
        if (!$user) {
            return false;
        }
        
        if (${options.withOwnership} && $item) {
            if ($item['user_id'] == $user_id && in_array($permission, ['edit', 'delete'])) {
                return true;
            }
        }
        
        $rules = $this->config['rules'][$permission]['default'] ?? [];
        
        if ($user['is_admin'] || in_array('admin', $rules)) {
            return true;
        }
        
        return in_array($this->getRoleById($role_id), $rules);
    }
    
    private function getRoleById($role_id) {
        $roles = [
            1 => 'admin',
            2 => 'moderator', 
            3 => 'auth',
            4 => 'all',
        ];
        return $roles[$role_id] ?? 'all';
    }
    
    public function getAvailablePermissions() {
        return [${permStrings}];
    }
}`;

  files[`system/hooks/${name}/permissions.hooks.php`] = `<?php
// InstantCMS 2. hooks/${name}/permissions.hooks.php

class on${nameCapital}PermissionsHook {
    public function onUserAfterLogin($user) {
        $permissions = ${nameCapital}Permissions::getInstance();
    }
    
    public function onContentBeforeSave($item) {
        $permissions = ${nameCapital}Permissions::getInstance();
        
        if (!$permissions->can('edit', null, $item)) {
            cmsUser::addSessionMessage('У вас нет прав на редактирование', 'error');
            return false;
        }
        
        return $item;
    }
    
    public function onContentBeforeDelete($item) {
        $permissions = ${nameCapital}Permissions::getInstance();
        
        if (!$permissions->can('delete', null, $item)) {
            cmsUser::addSessionMessage('У вас нет прав на удаление', 'error');
            return false;
        }
        
        return $item;
    }
}`;

  files[`${name}/backend/permissions.php`] = `<?php
// InstantCMS 2. ${name}/backend/permissions.php

class backend${nameCapital}Permissions extends cmsBackend {
    
    protected $useOptions = false;
    
    public function __construct($request) {
        parent::__construct($request);
        $this->controlName = '${nameCapital}Permissions';
    }
    
    public function actionIndex() {
        $this->renderTemplate('permissions', [
            'permissions' => ${nameCapital}Permissions::getInstance()->getAvailablePermissions(),
            'roles' => $this->model->getRoles(),
        ]);
    }
    
    public function actionSave() {
        $data = $this->request->getAll();
        
        $config_path = cmsConfig::get('root_path') . '/system/config/permissions/${name}.php';
        
        $config = [
            'name' => '${name}',
            'title' => '${title}',
            'rules' => [],
        ];
        
        foreach ([${permStrings}] as $perm) {
            $config['rules'][$perm] = [
                'title' => $data['titles'][$perm] ?? '',
                'default' => $data['defaults'][$perm] ?? [],
            ];
        }
        
        file_put_contents($config_path, '<?php\\nreturn ' . var_export($config, true) . ';');
        
        cmsUser::addSessionMessage('Права сохранены', 'success');
        $this->redirectToAction('index');
    }
    
    public function actionCheck() {
        $permission = $this->request->get('permission', '');
        $user_id = $this->request->get('user_id', 0);
        
        $permissions = ${nameCapital}Permissions::getInstance();
        $result = $permissions->can($permission, $user_id);
        
        $this->halt(200, json_encode(['allowed' => $result]));
    }
}`;

  if (options.withRoles) {
    files[`${name}/roles.php`] = `<?php
// InstantCMS 2. ${name}/roles.php

return [
    'admin' => [
        'title' => 'Администратор',
        'permissions' => ['${permissions.join("', '")}'],
    ],
    'moderator' => [
        'title' => 'Модератор',
        'permissions' => ['${permissions.filter((p: string) => p !== 'admin').join("', '")}'],
    ],
    'auth' => [
        'title' => 'Авторизованный',
        'permissions' => ['view', 'add'],
    ],
    'all' => [
        'title' => 'Гость',
        'permissions' => ['view'],
    ],
];`;
  }

  return {
    addon_name: name,
    title,
    permissions_count: permissions.length,
    options,
    files,
  };
}

export const permissionToolSchema = {
  name: 'scaffold_permission',
  description: 'Генерация системы прав доступа для дополнения InstantCMS',
  inputSchema: {
    type: 'object' as const,
    properties: {
      name: {
        type: 'string',
        description: 'Системное имя (латинница, snake_case)',
        pattern: '^[a-z][a-z0-9_]*$',
      },
      title: { type: 'string', description: 'Название дополнения' },
      description: { type: 'string', description: 'Описание' },
      controller: { type: 'string', description: 'Имя контроллера' },
      permissions: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['view', 'add', 'edit', 'delete', 'publish', 'moderate', 'admin'],
        },
        description: 'Список разрешений',
      },
      category: { type: 'string', description: 'Категория прав' },
      options: {
        type: 'object',
        properties: {
          withCategories: { type: 'boolean', description: 'С категориями' },
          withOwnership: { type: 'boolean', description: 'Проверка владельца' },
          withRoles: { type: 'boolean', description: 'С ролями' },
        },
      },
    },
    required: ['name', 'title'],
  },
  inputExamples: [
    {
      name: 'blog_post',
      title: 'Записи блога',
      permissions: ['view', 'add', 'edit', 'delete'],
      options: { withOwnership: true, withRoles: true },
    },
    {
      name: 'catalog_item',
      title: 'Товары каталога',
      permissions: ['view', 'add', 'edit', 'delete', 'publish'],
      options: { withCategories: true, withOwnership: true },
    },
  ],
};
