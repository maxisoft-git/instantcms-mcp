// Структуры файлов дополнений и шаблонов InstantCMS

export interface FileSpec {
  path: string;
  required: boolean;
  description: string;
  template?: string;
}

export interface AddonStructure {
  type: string;
  description: string;
  files: FileSpec[];
}

export const addonStructures: Record<string, AddonStructure> = {
  basic: {
    type: "basic",
    description: "Минимальное дополнение — только фронтенд без админ-панели",
    files: [
      {
        path: "frontend.php",
        required: true,
        description: "Основной контроллер фронтенда. Наследует cmsFrontend. Использует route()+runAction(), экшены в actions/*.php, шаблоны в /templates/default/controllers/{name}/.",
        template: `<?php
/**
 * @property \\model{Name} $model
 */
class {name} extends cmsFrontend {

    protected $useOptions = true;

    // Маршрутизация: route() + runAction()
    // Экшены — отдельные файлы в actions/*.php
    // Шаблоны — /templates/default/controllers/{name}/*.tpl.php
    public function route($uri) {

        $action_name = $this->parseRoute($this->cms_core->uri);
        if (!$action_name) {
            cmsCore::error404();
        }

        $this->runAction($action_name);
    }

}

// actions/index.php — class action{Name}Index extends cmsAction { run() }
// actions/view.php  — class action{Name}View extends cmsAction { run() }
// routes.php        — function routes_{name}() { return [...] }`
      },
      {
        path: "model.php",
        required: true,
        description: "Модель базы данных. Наследует cmsModel. Содержит специфичные запросы.",
        template: `<?php

class model{Name} extends cmsModel {

    // Получить опубликованные элементы
    public function getPublished($limit = 10) {
        return $this->filterEqual('is_pub', 1)
                    ->orderBy('date_pub', 'desc')
                    ->limit($limit)
                    ->get('{name}_items');
    }

}`
      },
      {
        path: "hooks/",
        required: false,
        description: "Директория с файлами хуков. Каждый файл = один хук. Имя файла = имя хука.",
        template: `// Пример файла hooks/content_after_add_approve.php
<?php

class on{Name}ContentAfterAddApprove extends cmsAction {

    public function run($data) {
        // Ваша логика
        return $data;
    }

}`
      },
      {
        path: "[ВНЕШНИЙ] system/languages/ru/controllers/{name}/{name}.php",
        required: true,
        description: "Языковой файл контроллера. Расположен ВНЕ папки контроллера: /system/languages/{lang}/controllers/{name}/{name}.php",
        template: `<?php
// Файл: /system/languages/ru/controllers/{name}/{name}.php

define('LANG_{NAME}_TITLE', 'Моё дополнение');
define('LANG_{NAME}_ADD',   'Добавить');
define('LANG_{NAME}_EDIT',  'Редактировать');`
      },
      {
        path: "manifest.xml",
        required: true,
        description: "Метаданные дополнения: название, версия, зависимости, хуки",
        template: `<?xml version="1.0" encoding="utf-8"?>
<addon>
    <name>{name}</name>
    <title>{Title}</title>
    <description>Описание дополнения</description>
    <version>1.0.0</version>
    <build>1</build>
    <author>
        <name>Author Name</name>
        <url>https://example.com</url>
        <email>author@example.com</email>
    </author>
    <dependencies>
        <!-- <controller name="content" /> -->
    </dependencies>
    <hooks>
        <!-- <hook controller="{name}" name="content_after_add_approve" /> -->
    </hooks>
</addon>`
      },
      {
        path: "install.php",
        required: true,
        description: "Скрипт установки дополнения. Создаёт таблицы БД, добавляет данные.",
        template: `<?php

class install{Name} extends cmsInstaller {

    public function install() {

        // Создать таблицу
        $this->db->query("CREATE TABLE IF NOT EXISTS \`{prefix}{name}_items\` (
            \`id\`       int(10) unsigned NOT NULL AUTO_INCREMENT,
            \`user_id\`  int(10) unsigned NOT NULL DEFAULT '0',
            \`title\`    varchar(255) NOT NULL DEFAULT '',
            \`text\`     text,
            \`date_pub\` datetime NOT NULL,
            \`is_pub\`   tinyint(1) unsigned NOT NULL DEFAULT '1',
            PRIMARY KEY (\`id\`),
            KEY \`user_id\` (\`user_id\`),
            KEY \`is_pub\` (\`is_pub\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

        return true;
    }

}`
      },
      {
        path: "uninstall.php",
        required: true,
        description: "Скрипт удаления дополнения. Удаляет таблицы, очищает данные.",
        template: `<?php

class uninstall{Name} extends cmsInstaller {

    public function uninstall() {

        $this->db->query("DROP TABLE IF EXISTS \`{prefix}{name}_items\`");

        return true;
    }

}`
      }
    ]
  },

  with_admin: {
    type: "with_admin",
    description: "Дополнение с полноценной админ-панелью (CRUD)",
    files: [
      {
        path: "frontend.php",
        required: true,
        description: "Фронтенд контроллер",
        template: `// Аналогично basic, см. выше`
      },
      {
        path: "backend.php",
        required: true,
        description: "Контроллер админ-панели. Наследует cmsBackend.",
        template: `<?php

class backend{Name} extends cmsBackend {

    public $useDefaultOptionsAction = true;
    public $useDefaultPermissionsAction = true;

    public function getBackendMenu() {
        return [
            [
                'title' => LANG_OPTIONS,
                'url'   => href_to($this->root_url),
                'options' => ['icon' => 'cog']
            ],
            [
                'title' => LANG_{NAME}_ITEMS,
                'url'   => href_to($this->root_url, 'items'),
                'options' => ['icon' => 'list']
            ]
        ];
    }

    public function actionIndex() {
        return $this->redirect(href_to($this->root_url, 'items'));
    }

    public function actionItems() {

        $grid = $this->getGrid('grid_items');

        return $this->cms_template->render('backend/items', [
            'grid' => $grid->render()
        ]);
    }

    public function actionItemAdd() {

        $form = $this->makeForm('form_item');

        if ($this->request->isPost()) {
            $item_data = $form->parse($this->request->data('post'));
            if ($form->validate($item_data)) {
                $this->model->insert('{name}_items', $item_data);
                return $this->redirect(href_to($this->root_url, 'items'));
            }
        }

        return $this->cms_template->render('backend/item_form', [
            'form' => $form->render()
        ]);
    }

    public function actionItemEdit($id = 0) {

        $item = $this->model->getItemByField('{name}_items', 'id', $id);
        if (!$item) { return cmsCore::error404(); }

        $form = $this->makeForm('form_item', $item);

        if ($this->request->isPost()) {
            $item_data = $form->parse($this->request->data('post'));
            if ($form->validate($item_data)) {
                $this->model->update('{name}_items', $id, $item_data);
                return $this->redirect(href_to($this->root_url, 'items'));
            }
        }

        return $this->cms_template->render('backend/item_form', [
            'item' => $item,
            'form' => $form->render()
        ]);
    }

    public function actionItemDelete($id = 0) {
        $this->model->delete('{name}_items', $id);
        return $this->redirect(href_to($this->root_url, 'items'));
    }

}`
      },
      {
        path: "backend/forms/form_item.php",
        required: false,
        description: "Форма для добавления/редактирования в админке",
        template: `<?php

class form{Name}Item extends cmsForm {

    public function init() {

        return [
            [
                'type'   => 'fieldset',
                'title'  => 'Основные данные',
                'childs' => [
                    new fieldString('title', [
                        'title' => LANG_TITLE,
                        'rules' => [['required']]
                    ]),
                    new fieldText('text', [
                        'title' => LANG_TEXT
                    ]),
                    new fieldList('is_pub', [
                        'title'   => LANG_IS_PUB,
                        'default' => 1,
                        'items'   => [
                            0 => LANG_NO,
                            1 => LANG_YES
                        ]
                    ])
                ]
            ]
        ];
    }

}`
      },
      {
        path: "backend/grids/grid_items.php",
        required: false,
        description: "Таблица-грид для списка элементов в админке",
        template: `<?php

class grid{Name}Items extends cmsGrid {

    public function init() {

        $this->model->orderBy('id', 'desc');

        return [
            'source'  => '{name}_items',
            'actions' => [
                'add'  => ['title' => LANG_ADD, 'url' => href_to($this->root_url, 'item_add')],
            ],
            'columns' => [
                ['field' => 'id',    'title' => 'ID', 'width' => 60],
                ['field' => 'title', 'title' => LANG_TITLE],
                ['field' => 'is_pub','title' => LANG_IS_PUB, 'type' => 'bool', 'width' => 80],
            ],
            'row_actions' => [
                'edit'   => ['title' => LANG_EDIT,   'url' => href_to($this->root_url, 'item_edit',   '{id}')],
                'delete' => ['title' => LANG_DELETE, 'url' => href_to($this->root_url, 'item_delete', '{id}'), 'confirm' => true],
            ]
        ];
    }

}`
      },
      {
        path: "backend/forms/form_options.php",
        required: false,
        description: "Форма настроек дополнения в админке",
        template: `<?php

class form{Name}Options extends cmsForm {

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

}`
      }
    ]
  },

  with_hooks: {
    type: "with_hooks",
    description: "Дополнение, интегрирующееся с другими компонентами через хуки",
    files: [
      {
        path: "hooks/{hook_name}.php",
        required: true,
        description: "Файл хука. Имя класса: on{AddonName}{HookName} (CamelCase). Наследует cmsAction.",
        template: `<?php
// Файл: hooks/content_after_add_approve.php
// Хук срабатывает после одобрения нового материала

class on{Name}ContentAfterAddApprove extends cmsAction {

    /**
     * @param array $data ['ctype_name' => string, 'item' => array]
     */
    public function run($data) {

        $ctype_name = $data['ctype_name'];
        $item       = $data['item'];

        // Доступны: $this->cms_user, $this->request, $this->model
        // $this->model — модель текущего дополнения ({name})
        // Для доступа к другим контроллерам:
        // $activity = cmsCore::getController('activity');

        // ОБЯЗАТЕЛЬНО вернуть $data!
        return $data;
    }

}`
      }
    ]
  },

  with_routes: {
    type: "with_routes",
    description: "Дополнение с кастомными маршрутами URL",
    files: [
      {
        path: "routes.php",
        required: false,
        description: "Определение маршрутов URL. Функция routes_{name}() возвращает массив маршрутов.",
        template: `<?php

function routes_{name}() {

    return [
        // /myaddon/category-slug
        [
            'pattern' => '/^([a-z0-9\\-_]+)$/',
            'action'  => 'category',
            1         => 'slug'
        ],
        // /myaddon/category-slug/item-slug.html
        [
            'pattern' => '/^([a-z0-9\\-_]+)\\/([a-z0-9\\-]+)\\.html$/',
            'action'  => 'view',
            1         => 'category',
            2         => 'slug'
        ],
        // /myaddon/tag/my-tag
        [
            'pattern' => '/^tag\\/([a-z0-9\\-_]+)$/',
            'action'  => 'tag',
            1         => 'tag'
        ]
    ];

}`
      }
    ]
  },

  with_widget: {
    type: "with_widget",
    description: "Дополнение с виджетом для размещения на страницах",
    files: [
      {
        path: "widgets/{widget_name}/widget.php",
        required: true,
        description: "Класс виджета. Наследует cmsWidget.",
        template: `<?php

class widget{Name}List extends cmsWidget {

    public function run() {

        $limit   = $this->getOption('limit', 5);
        $is_pub  = $this->getOption('is_pub', 1);

        $controller = cmsCore::getController('{name}');

        $items = $controller->model
            ->filterEqual('is_pub', $is_pub)
            ->orderBy('date_pub', 'desc')
            ->limit($limit)
            ->get('{name}_items');

        if (!$items) { return false; }

        return [
            'items' => $items,
            'limit' => $limit
        ];
    }

}`
      },
      {
        path: "widgets/{widget_name}/options.form.php",
        required: false,
        description: "Форма настроек виджета",
        template: `<?php

class formWidget{Name}List extends cmsForm {

    public function init() {
        return [
            [
                'type'   => 'fieldset',
                'title'  => LANG_OPTIONS,
                'childs' => [
                    new fieldNumber('limit', [
                        'title'   => LANG_LIST_LIMIT,
                        'default' => 5
                    ]),
                    new fieldList('is_pub', [
                        'title'   => 'Показывать',
                        'items'   => [1 => 'Опубликованные', 0 => 'Все'],
                        'default' => 1
                    ])
                ]
            ]
        ];
    }

}`
      }
    ]
  }
};

export const templateStructure = {
  description: "Структура шаблона (темы) для InstantCMS",
  required_files: [
    {
      path: "manifest.php",
      description: "Метаданные шаблона. Возвращает массив с title, author, properties.",
      template: `<?php
return [
    'title'  => 'My Template',
    'author' => [
        'name' => 'Author Name',
        'url'  => 'https://example.com',
        'help' => 'https://docs.example.com'
    ],
    'properties' => [
        'has_options'                => true,
        'has_profile_themes_support' => false,
        'has_profile_themes_options' => false,
        'is_dynamic_layout'          => false,
        'is_backend'                 => false,
        'is_frontend'                => true
    ]
];`
    },
    {
      path: "main.tpl.php",
      description: "Главный макет страницы. Содержит HTML-скелет сайта.",
      template: `<!DOCTYPE html>
<html lang="<?= LANG_CODE ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $cms_template->title ?></title>
    <?= $cms_template->getHead() ?>
</head>
<body>
    <header>
        <?= $cms_template->getBlock('header') ?>
    </header>
    <main>
        <?= $cms_template->getContent() ?>
    </main>
    <footer>
        <?= $cms_template->getBlock('footer') ?>
    </footer>
    <?= $cms_template->getBottom() ?>
</body>
</html>`
    }
  ],
  optional_files: [
    { path: "options.form.php", description: "Форма настроек шаблона в админке" },
    { path: "options.css.php", description: "CSS кастомизация из настроек" },
    { path: "scheme.php", description: "Цветовая схема шаблона" },
    { path: "css/main.css", description: "Основные стили" },
    { path: "js/main.js", description: "Основные скрипты" },
    { path: "images/", description: "Изображения шаблона" }
  ],
  controller_templates: {
    description: "Шаблоны для конкретных контроллеров. Путь: controllers/{controller}/{action}.tpl.php",
    example: "controllers/content/item_view.tpl.php — шаблон просмотра материала",
    override_note: "Шаблоны в папке шаблона переопределяют системные шаблоны из system/controllers/"
  }
};

export const fieldTypes: Record<string, { description: string; example: string }> = {
  fieldString: {
    description: "Однострочное текстовое поле",
    example: `new fieldString('title', [
    'title' => 'Заголовок',
    'rules' => [['required'], ['max_length', 255]]
])`
  },
  fieldText: {
    description: "Многострочное текстовое поле (textarea)",
    example: `new fieldText('description', [
    'title' => 'Описание',
    'rows'  => 5
])`
  },
  fieldHtml: {
    description: "HTML редактор (WYSIWYG)",
    example: `new fieldHtml('content', [
    'title' => 'Содержание',
    'rules' => [['required']]
])`
  },
  fieldNumber: {
    description: "Числовое поле",
    example: `new fieldNumber('count', [
    'title'   => 'Количество',
    'default' => 0,
    'rules'   => [['min', 0], ['max', 1000]]
])`
  },
  fieldList: {
    description: "Выпадающий список (select)",
    example: `new fieldList('status', [
    'title'   => 'Статус',
    'default' => 1,
    'items'   => [0 => 'Скрыт', 1 => 'Активен', 2 => 'Заблокирован']
])`
  },
  fieldListMultiple: {
    description: "Множественный выбор",
    example: `new fieldListMultiple('tags', [
    'title'     => 'Теги',
    'generator' => function() {
        return cmsCore::getModel('tags')->getTagsList();
    }
])`
  },
  fieldCheckbox: {
    description: "Чекбокс (булево поле)",
    example: `new fieldCheckbox('is_featured', [
    'title' => 'Рекомендуемый',
    'label' => 'Показывать в рекомендациях'
])`
  },
  fieldImage: {
    description: "Загрузка одного изображения",
    example: `new fieldImage('photo', [
    'title'     => 'Фото',
    'max_width' => 800,
    'max_size'  => 2048  // KB
])`
  },
  fieldFile: {
    description: "Загрузка файла",
    example: `new fieldFile('attachment', [
    'title'    => 'Прикрепить файл',
    'max_size' => 10240  // KB
])`
  },
  fieldDate: {
    description: "Поле выбора даты",
    example: `new fieldDate('date_pub', [
    'title'   => 'Дата публикации',
    'default' => date('Y-m-d H:i:s')
])`
  },
  fieldUrl: {
    description: "Поле для URL",
    example: `new fieldUrl('website', [
    'title' => 'Сайт',
    'rules' => [['url']]
])`
  },
  fieldHidden: {
    description: "Скрытое поле",
    example: `new fieldHidden('user_id', [
    'default' => $this->cms_user->id
])`
  },
  fieldCategory: {
    description: "Выбор категории типа контента",
    example: `new fieldCategory('category_id', [
    'title'      => 'Категория',
    'ctype_name' => 'articles'
])`
  }
};
