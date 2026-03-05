import { addonStructures, templateStructure } from "../data/schemas.js";

interface ScaffoldAddonOptions {
  name: string;
  title: string;
  author?: string;
  author_url?: string;
  version?: string;
  type: "basic" | "with_admin" | "with_hooks" | "with_routes" | "with_widget";
  hooks?: string[];
  description?: string;
}

export function scaffoldAddon(opts: ScaffoldAddonOptions): object {
  const name = opts.name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name.split('_').map(capitalize).join('');
  const NAME = name.toUpperCase();
  const version = opts.version || "1.0.0";
  const author = opts.author || "Author";
  const author_url = opts.author_url || "https://example.com";
  const title = opts.title;
  const description = opts.description || `Дополнение ${title}`;

  const files: Record<string, string> = {};

  // ── manifest.ru.ini — корень пакета (НЕ внутри контроллера) ─────────────────
  // Пакет для менеджера расширений: manifest.ru.ini + install.sql + package/
  const [major, minor, build] = version.split('.').map(Number);

  files['[pkg] manifest.ru.ini'] = `[info]
title = "${title}"
description = "${description}"
image_hint =

[version]
major = ${major || 1}
minor = ${minor || 0}
build = ${build || 1}

[author]
name = "${author}"
url = "${author_url}"

[install]
type = controller
name = ${name}`;

  // ── install.sql — SQL для создания таблиц ────────────────────────────────────
  files['[pkg] install.sql'] = `CREATE TABLE IF NOT EXISTS \`cms_${name}_items\` (
    \`id\`       int(10) unsigned NOT NULL AUTO_INCREMENT,
    \`user_id\`  int(10) unsigned NOT NULL DEFAULT '0',
    \`title\`    varchar(255) NOT NULL DEFAULT '',
    \`text\`     text,
    \`date_pub\` datetime NOT NULL,
    \`is_pub\`   tinyint(1) unsigned NOT NULL DEFAULT '1',
    PRIMARY KEY (\`id\`),
    KEY \`user_id\` (\`user_id\`),
    KEY \`is_pub\` (\`is_pub\`),
    KEY \`date_pub\` (\`date_pub\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Замените cms_ на реальный префикс БД из system/config/config.php`;

  // ── Файлы контроллера (package/system/controllers/{name}/) ──────────────────
  const ctrl = `package/system/controllers/${name}`;

  // ── model.php ────────────────────────────────────────────────────────────────
  files[`${ctrl}/model.php`] = `<?php

class model${Name} extends cmsModel {

    /**
     * Получить опубликованные элементы
     */
    public function getPublished(int $limit = 10): array {
        return $this->filterEqual('is_pub', 1)
                    ->orderBy('date_pub', 'desc')
                    ->limit($limit)
                    ->get('${name}_items');
    }

    /**
     * Получить элементы пользователя
     */
    public function getByUser(int $user_id): array {
        return $this->filterEqual('user_id', $user_id)
                    ->orderBy('date_pub', 'desc')
                    ->get('${name}_items');
    }

}`;

  // ── frontend.php ─────────────────────────────────────────────────────────────
  // Правильный паттерн InstantCMS: route() + runAction(), экшены — в actions/
  files[`${ctrl}/frontend.php`] = `<?php
/**
 * @property \\model${Name} $model
 */
class ${name} extends cmsFrontend {

    protected $useOptions = true;

    public function route($uri) {

        $action_name = $this->parseRoute($this->cms_core->uri);
        if (!$action_name) {
            cmsCore::error404();
        }

        $this->runAction($action_name);
    }

}`;

  // ── routes.php — только для with_routes ─────────────────────────────────────
  // Для остальных типов InstantCMS использует стандартный маппинг URL → action:
  // /controller/         → actionIndex
  // /controller/view/123 → actionView + request->get('id')
  if (opts.type === 'with_routes') {
    files[`${ctrl}/routes.php`] = generateRoutes(name);
  }

  // ── actions/index.php ────────────────────────────────────────────────────────
  files[`${ctrl}/actions/index.php`] = `<?php

class action${Name}Index extends cmsAction {

    public function run() {

        $page    = $this->request->get('page', 1);
        $perpage = $this->options['perpage'] ?? 10;

        $total = $this->model->filterEqual('is_pub', 1)->getCount('${name}_items');

        $items = $this->model
            ->filterEqual('is_pub', 1)
            ->orderBy('date_pub', 'desc')
            ->limitPage($page, $perpage)
            ->get('${name}_items');

        $this->cms_template->setTitle(LANG_${NAME}_TITLE);

        return $this->cms_template->render('index', [
            'items'   => $items,
            'total'   => $total,
            'page'    => (int) $page,
            'perpage' => (int) $perpage,
        ]);
    }

}`;

  // ── actions/view.php ─────────────────────────────────────────────────────────
  files[`${ctrl}/actions/view.php`] = `<?php

class action${Name}View extends cmsAction {

    public function run() {

        $id   = $this->request->get('id', 0);
        $item = $this->model->getItemByField('${name}_items', 'id', (int) $id);

        if (!$item || !$item['is_pub']) {
            return cmsCore::error404();
        }

        $item = cmsEventsManager::hook('${name}_before_item', $item);

        $this->cms_template->setTitle($item['title']);

        return $this->cms_template->render('view', [
            'item' => $item,
        ]);
    }

}`;

  // ── Языковой файл ────────────────────────────────────────────────────────────
  files[`package/system/languages/ru/controllers/${name}/${name}.php`] = `<?php

define('LANG_${NAME}_TITLE',  '${title}');
define('LANG_${NAME}_ADD',    'Добавить');
define('LANG_${NAME}_EDIT',   'Редактировать');
define('LANG_${NAME}_DELETE', 'Удалить');
define('LANG_${NAME}_ITEMS',  'Элементы');`;

  // ── Хуки ────────────────────────────────────────────────────────────────────
  if (opts.hooks && opts.hooks.length > 0) {
    for (const hookName of opts.hooks) {
      const hookCamel = hookName
        .split('_')
        .map((w: string) => capitalize(w))
        .join('');

      files[`${ctrl}/hooks/${hookName}.php`] = `<?php

class on${Name}${hookCamel} extends cmsAction {

    public function run($data) {

        // TODO: реализовать логику хука "${hookName}"
        // $this->cms_user — текущий пользователь
        // $this->model    — модель дополнения ${name}
        // $this->request  — объект запроса

        return $data; // ОБЯЗАТЕЛЬНО вернуть данные
    }

}`;
    }
  }

  // ── Бэкенд (если нужен) ──────────────────────────────────────────────────────
  if (opts.type === 'with_admin') {
    files[`${ctrl}/backend.php`] = generateBackend(name, Name, NAME);
    files[`${ctrl}/backend/forms/form_item.php`] = generateFormItem(Name, NAME);
    files[`${ctrl}/backend/grids/grid_items.php`] = generateGridItems(name, Name, NAME);
    files[`${ctrl}/backend/forms/form_options.php`] = generateFormOptions(Name);
  }

  // ── Виджет (если нужен) ──────────────────────────────────────────────────────
  if (opts.type === 'with_widget') {
    files[`${ctrl}/widgets/list/widget.php`] = generateWidget(name, Name);
    files[`${ctrl}/widgets/list/options.form.php`] = generateWidgetForm(Name);
  }

  return {
    addon_name: name,
    addon_class: Name,
    type: opts.type,
    files_count: Object.keys(files).length,
    files,
    installation_note: `Структура пакета: manifest.ru.ini + install.sql + package/ → устанавливается через менеджер пакетов`,
    next_steps: [
      `1. Упаковать: manifest.ru.ini, install.sql, package/ → zip-архив ${name}.zip`,
      `2. Установить через Панель управления → Расширения → Загрузить пакет`,
      `3. Создать шаблоны в /templates/default/controllers/${name}/index.tpl.php и view.tpl.php`,
      `4. Шаблон виджета: /templates/default/controllers/${name}/widgets/list/list.tpl.php`,
    ]
  };
}

export function scaffoldTemplate(opts: { name: string; title: string; author?: string }): object {
  const name = opts.name.toLowerCase().replace(/[^a-z0-9_]/g, '_');

  const files: Record<string, string> = {
    'manifest.php': `<?php
return [
    'title'  => '${opts.title}',
    'author' => [
        'name' => '${opts.author || 'Author'}',
        'url'  => 'https://example.com',
        'help' => 'https://example.com/docs'
    ],
    'properties' => [
        'has_options'                => true,
        'has_profile_themes_support' => false,
        'has_profile_themes_options' => false,
        'is_dynamic_layout'          => false,
        'is_backend'                 => false,
        'is_frontend'                => true
    ]
];`,
    'main.tpl.php': `<!DOCTYPE html>
<html lang="<?= LANG_CODE ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($cms_template->title) ?></title>
    <?= $cms_template->getHead() ?>
</head>
<body>

<header class="site-header">
    <?php include __DIR__ . '/inc/header.php'; ?>
</header>

<main class="site-main">
    <div class="container">
        <?= $cms_template->getContent() ?>
    </div>
</main>

<footer class="site-footer">
    <?php include __DIR__ . '/inc/footer.php'; ?>
</footer>

<?= $cms_template->getBottom() ?>
</body>
</html>`,
    'css/main.css': `/* ${opts.title} - Main Styles */
:root {
    --color-primary: #4a90d9;
    --color-text: #333;
    --color-bg: #fff;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; color: var(--color-text); background: var(--color-bg); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }`
  };

  return {
    template_name: name,
    files,
    structure: templateStructure,
    placement: `/templates/${name}/`,
    notes: [
      "Шаблон размещается в /templates/{name}/",
      "Для переопределения шаблонов контроллеров: создать controllers/{controller}/{action}.tpl.php",
      "Системные переменные в .tpl.php: $cms_template, $cms_user, $cms_config"
    ]
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateBackend(name: string, Name: string, NAME: string): string {
  return `<?php

class backend${Name} extends cmsBackend {

    public $useDefaultOptionsAction     = true;
    public $useDefaultPermissionsAction = true;

    public function getBackendMenu() {
        return [
            [
                'title'   => LANG_OPTIONS,
                'url'     => href_to($this->root_url),
                'options' => ['icon' => 'cog']
            ],
            [
                'title'   => LANG_${NAME}_ITEMS,
                'url'     => href_to($this->root_url, 'items'),
                'options' => ['icon' => 'list']
            ]
        ];
    }

    public function actionIndex() {
        return $this->redirect(href_to($this->root_url, 'items'));
    }

    public function actionItems() {

        $grid = $this->getGrid('grid_items');

        $this->cms_template->setTitle(LANG_${NAME}_ITEMS);

        return $this->cms_template->render('backend/items', [
            'grid' => $grid->render()
        ]);
    }

    public function actionItemAdd() {

        $form = $this->makeForm('form_item');

        if ($this->request->isPost()) {
            $item_data = $form->parse($this->request->data('post'));
            if ($form->validate($item_data)) {
                $item_data['date_pub'] = date('Y-m-d H:i:s');
                $this->model->insert('${name}_items', $item_data);
                return $this->redirect(href_to($this->root_url, 'items'));
            }
        }

        $this->cms_template->setTitle(LANG_ADD);

        return $this->cms_template->render('backend/item_form', [
            'form' => $form->render()
        ]);
    }

    public function actionItemEdit(int $id = 0) {

        $item = $this->model->getItemByField('${name}_items', 'id', $id);
        if (!$item) { return cmsCore::error404(); }

        $form = $this->makeForm('form_item', $item);

        if ($this->request->isPost()) {
            $item_data = $form->parse($this->request->data('post'));
            if ($form->validate($item_data)) {
                $this->model->update('${name}_items', $id, $item_data);
                return $this->redirect(href_to($this->root_url, 'items'));
            }
        }

        $this->cms_template->setTitle(LANG_EDIT . ': ' . $item['title']);

        return $this->cms_template->render('backend/item_form', [
            'item' => $item,
            'form' => $form->render()
        ]);
    }

    public function actionItemDelete(int $id = 0) {
        $this->model->delete('${name}_items', $id);
        return $this->redirect(href_to($this->root_url, 'items'));
    }

}`;
}

function generateFormItem(Name: string, NAME: string): string {
  return `<?php

class form${Name}Item extends cmsForm {

    public function init() {

        return [
            [
                'type'   => 'fieldset',
                'title'  => LANG_BASIC_OPTIONS,
                'childs' => [
                    new fieldString('title', [
                        'title' => LANG_TITLE,
                        'rules' => [['required'], ['max_length', 255]]
                    ]),
                    new fieldHtml('text', [
                        'title' => LANG_TEXT
                    ]),
                    new fieldList('is_pub', [
                        'title'   => LANG_IS_PUB,
                        'default' => 1,
                        'items'   => [0 => LANG_NO, 1 => LANG_YES]
                    ])
                ]
            ]
        ];
    }

}`;
}

function generateGridItems(name: string, Name: string, NAME: string): string {
  return `<?php

class grid${Name}Items extends cmsGrid {

    public function init() {

        $this->model->orderBy('id', 'desc');

        return [
            'source'  => '${name}_items',
            'actions' => [
                'add' => [
                    'title' => LANG_ADD,
                    'url'   => href_to($this->root_url, 'item_add')
                ],
            ],
            'columns' => [
                ['field' => 'id',       'title' => 'ID', 'width' => 60],
                ['field' => 'title',    'title' => LANG_TITLE],
                ['field' => 'date_pub', 'title' => LANG_DATE, 'type' => 'date', 'width' => 140],
                ['field' => 'is_pub',   'title' => LANG_IS_PUB, 'type' => 'bool', 'width' => 80],
            ],
            'row_actions' => [
                'edit' => [
                    'title' => LANG_EDIT,
                    'url'   => href_to($this->root_url, 'item_edit', '{id}')
                ],
                'delete' => [
                    'title'   => LANG_DELETE,
                    'url'     => href_to($this->root_url, 'item_delete', '{id}'),
                    'confirm' => true
                ],
            ]
        ];
    }

}`;
}

function generateFormOptions(Name: string): string {
  return `<?php

class form${Name}Options extends cmsForm {

    public $is_tabbed = true;

    public function init() {

        return [
            [
                'type'   => 'fieldset',
                'title'  => LANG_BASIC_OPTIONS,
                'childs' => [
                    new fieldNumber('perpage', [
                        'title'   => LANG_LIST_LIMIT,
                        'default' => 10,
                        'rules'   => [['required'], ['min', 1]]
                    ])
                ]
            ]
        ];
    }

}`;
}

function generateWidget(name: string, Name: string): string {
  return `<?php

class widget${Name}List extends cmsWidget {

    public function run() {

        $limit = $this->getOption('limit', 5);

        $controller = cmsCore::getController('${name}');

        $items = $controller->model
            ->filterEqual('is_pub', 1)
            ->orderBy('date_pub', 'desc')
            ->limit($limit)
            ->get('${name}_items');

        if (!$items) { return false; }

        return [
            'items' => cmsEventsManager::hook('${name}_before_list', $items),
            'limit' => $limit
        ];
    }

}`;
}

function generateWidgetForm(Name: string): string {
  return `<?php

class formWidget${Name}List extends cmsForm {

    public function init() {
        return [
            [
                'type'   => 'fieldset',
                'title'  => LANG_OPTIONS,
                'childs' => [
                    new fieldNumber('limit', [
                        'title'   => LANG_LIST_LIMIT,
                        'default' => 5,
                        'rules'   => [['min', 1]]
                    ])
                ]
            ]
        ];
    }

}`;
}

function generateRoutes(name: string): string {
  return `<?php

function routes_${name}() {

    return [
        // /myaddon/item-slug.html
        [
            'pattern' => '/^([a-z0-9\\-_]+)\\.html$/i',
            'action'  => 'view',
            1         => 'slug'
        ],
        // /myaddon/page/2
        [
            'pattern' => '/^page\\/(\\d+)$/i',
            'action'  => 'index',
            1         => 'page'
        ],
        // /myaddon/ (главная)
        [
            'pattern' => '/^$/',
            'action'  => 'index'
        ]
    ];

}`;
}
