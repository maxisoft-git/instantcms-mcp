import { addonStructures, fieldTypes, controllerDirectoryLayout, classNamingConventions } from "../data/schemas.js";
import { components } from "../data/components.js";

export function getAddonStructure(addonType: string = "basic"): object {
  const structure = addonStructures[addonType];

  if (!structure) {
    return {
      error: `Тип дополнения "${addonType}" не найден`,
      available_types: Object.keys(addonStructures)
    };
  }

  return {
    type: structure.type,
    description: structure.description,
    notes: structure.notes || [],
    available_types: Object.keys(addonStructures).map(t => ({
      key: t,
      description: addonStructures[t].description
    })),
    files: structure.files.map(f => ({
      path: f.path,
      required: f.required,
      description: f.description,
      template: f.template
    })),
    directory_layout: controllerDirectoryLayout,
    naming_conventions: classNamingConventions,
    db_conventions: {
      table_naming: "Таблицы: {addon_name}_{entity}. Пример: catalog_items, catalog_categories",
      prefix: "Префикс из конфига: в install.php используйте $this->db->prefix, в SQL-запросах — {prefix}",
      common_fields: {
        id: "INT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
        user_id: "INT UNSIGNED — ID автора",
        date_pub: "DATETIME — дата публикации",
        is_pub: "TINYINT(1) — статус (1=опубликован, 0=скрыт)",
        title: "VARCHAR(255) — заголовок",
        ordering: "INT UNSIGNED — порядок сортировки (для drag&drop в гридах)"
      }
    },
    url_structure: {
      frontend: "/{addon_name}/{action}/{param}",
      backend: "/admin/{addon_name}/{action}/{param}",
      examples: [
        "/{name}/ → action index (actions/index.php)",
        "/{name}/view/123 → action view (actions/view.php), request->get('id')=123",
        "/admin/{name}/ → backend action index (backend/actions/index.php)",
        "/admin/{name}/items → backend action items (backend/actions/items.php)",
        "/admin/{name}/items/add → external_action_prefix='items_' → backend/actions/items_add.php",
        "/admin/{name}/items/edit/5 → backend/actions/items_add.php с params[0]=5"
      ]
    },
    language_files: {
      location: "/system/languages/{lang}/controllers/{name}/{name}.php",
      note: "Языковые файлы расположены ВНЕ папки контроллера!",
      examples: [
        "/system/languages/ru/controllers/catalog/catalog.php",
        "/system/languages/en/controllers/catalog/catalog.php"
      ]
    },
    template_files: {
      frontend: "/templates/{theme}/controllers/{name}/{action}.tpl.php",
      backend: "/templates/admincoreui/controllers/{name}/{action}.tpl.php",
      widgets: "/templates/{theme}/controllers/{name}/{widget_name}.tpl.php"
    }
  };
}

export function getComponentApi(componentName: string): object {
  const lower = componentName.toLowerCase();
  const component = components.find(
    c => c.name.toLowerCase().includes(lower) ||
         c.class.toLowerCase().includes(lower)
  );

  if (!component) {
    return {
      error: `Компонент "${componentName}" не найден`,
      available: components.map(c => ({ name: c.name, class: c.class, description: c.description.slice(0, 80) }))
    };
  }

  return {
    name: component.name,
    class: component.class,
    description: component.description,
    access: component.access,
    methods: component.methods
  };
}

export function listComponents(): object {
  return {
    total: components.length,
    components: components.map(c => ({
      name: c.name,
      class: c.class,
      description: c.description,
      methods_count: c.methods.length,
      access: c.access
    }))
  };
}

export function validateAddon(structure: Record<string, string>): object {
  const errors: string[] = [];
  const warnings: string[] = [];
  const tips: string[] = [];

  const files = Object.keys(structure);

  // Обязательные файлы
  const required = ['manifest.xml', 'install.php', 'uninstall.php', 'frontend.php'];
  for (const req of required) {
    if (!files.includes(req)) {
      errors.push(`Отсутствует обязательный файл: ${req}`);
    }
  }

  // Проверки manifest.xml
  if (structure['manifest.xml']) {
    const manifest = structure['manifest.xml'];
    if (!manifest.includes('<name>')) errors.push('manifest.xml: отсутствует тег <name>');
    if (!manifest.includes('<title>')) errors.push('manifest.xml: отсутствует тег <title>');
    if (!manifest.includes('<version>')) warnings.push('manifest.xml: рекомендуется указать <version>');
    if (!manifest.includes('<author>')) warnings.push('manifest.xml: рекомендуется указать <author>');
  }

  // Проверки frontend.php
  if (structure['frontend.php']) {
    const frontend = structure['frontend.php'];
    if (!frontend.includes('cmsFrontend') && !frontend.includes('cmsController')) {
      errors.push('frontend.php: класс должен наследовать cmsFrontend или cmsController');
    }
    if (!frontend.includes('actionIndex') && !frontend.includes('function action')) {
      warnings.push('frontend.php: нет ни одного action-метода (actionIndex и т.д.)');
    }
  }

  // Проверки backend.php
  if (structure['backend.php']) {
    const backend = structure['backend.php'];
    if (!backend.includes('cmsBackend')) {
      errors.push('backend.php: класс должен наследовать cmsBackend');
    }
  }

  // Проверки install.php
  if (structure['install.php']) {
    const install = structure['install.php'];
    if (!install.includes('cmsInstaller')) {
      errors.push('install.php: класс должен наследовать cmsInstaller');
    }
    if (!install.includes('public function install()')) {
      errors.push('install.php: отсутствует метод install()');
    }
  }

  // Проверки uninstall.php
  if (structure['uninstall.php']) {
    const uninstall = structure['uninstall.php'];
    if (!uninstall.includes('cmsInstaller')) {
      errors.push('uninstall.php: класс должен наследовать cmsInstaller');
    }
    if (!uninstall.includes('public function uninstall()')) {
      errors.push('uninstall.php: отсутствует метод uninstall()');
    }
  }

  // Проверки хуков
  const hookFiles = files.filter(f => f.startsWith('hooks/'));
  for (const hookFile of hookFiles) {
    const content = structure[hookFile];
    if (content && !content.includes('extends cmsAction')) {
      errors.push(`${hookFile}: класс хука должен наследовать cmsAction`);
    }
    if (content && !content.includes('public function run(')) {
      errors.push(`${hookFile}: отсутствует метод run($data)`);
    }
    if (content && !content.includes('return $data')) {
      warnings.push(`${hookFile}: метод run() должен возвращать $data`);
    }
  }

  // Проверки языковых файлов
  if (!files.some(f => f.startsWith('languages/'))) {
    warnings.push('Нет языковых файлов в languages/. Рекомендуется добавить languages/ru/lang.php');
  }

  // Советы
  if (!files.some(f => f.startsWith('widgets/'))) {
    tips.push('Рассмотрите добавление виджета в widgets/ для размещения на страницах');
  }
  if (!structure['routes.php']) {
    tips.push('Если нужны кастомные URL — добавьте routes.php');
  }

  return {
    is_valid: errors.length === 0,
    files_checked: files.length,
    errors,
    warnings,
    tips,
    summary: errors.length === 0
      ? `✓ Дополнение прошло валидацию (${warnings.length} предупреждений)`
      : `✗ Найдено ${errors.length} ошибок, ${warnings.length} предупреждений`
  };
}

export function getFieldTypes(fieldType?: string): object {
  if (fieldType) {
    const ft = fieldTypes[fieldType] || fieldTypes[`field${fieldType}`];
    if (!ft) {
      return {
        error: `Тип поля "${fieldType}" не найден`,
        available: Object.keys(fieldTypes)
      };
    }
    return { name: fieldType, ...ft };
  }

  return {
    total: Object.keys(fieldTypes).length,
    field_types: Object.entries(fieldTypes).map(([name, info]) => ({
      name,
      description: info.description,
      example: info.example
    })),
    usage_note: "Поля используются в классах форм (cmsForm). Экземпляры передаются в массив init()"
  };
}

export function getCodeExample(task: string): object {
  const lower = task.toLowerCase();

  const examples: Array<{ keywords: string[]; title: string; code: string; explanation: string }> = [
    {
      keywords: ['список', 'items', 'list', 'страниц', 'paginat'],
      title: "Список элементов с пагинацией",
      explanation: "Паттерн получения постраничного списка из БД",
      code: `public function actionIndex() {
    $page    = $this->request->get('page', 1);
    $perpage = $this->options['perpage'] ?? 10;

    $this->model->filterEqual('is_pub', 1)->orderBy('date_pub', 'desc');

    $total = $this->model->getCount('myaddon_items');
    $items = $this->model->limitPage($page, $perpage)->get('myaddon_items');

    if (!$items && $page > 1) { return cmsCore::error404(); }

    return $this->cms_template->render('index', [
        'items'   => $items,
        'total'   => $total,
        'page'    => $page,
        'perpage' => $perpage,
    ]);
}`
    },
    {
      keywords: ['ajax', 'json', 'fetch', 'запрос'],
      title: "Обработка AJAX запроса",
      explanation: "Паттерн для AJAX action, возвращающего JSON",
      code: `public function actionSave() {

    if (!$this->request->isPost() || !$this->request->isAjax()) {
        return $this->renderJSON(['error' => 'Bad request']);
    }

    $title = $this->request->post('title', '');

    if (empty($title)) {
        return $this->renderJSON(['error' => 'Заголовок обязателен']);
    }

    $id = $this->model->insert('myaddon_items', [
        'title'    => $title,
        'user_id'  => $this->cms_user->id,
        'date_pub' => date('Y-m-d H:i:s'),
        'is_pub'   => 1
    ]);

    return $this->renderJSON([
        'success' => true,
        'id'      => $id
    ]);
}`
    },
    {
      keywords: ['форм', 'form', 'валидац'],
      title: "Обработка формы",
      explanation: "Паттерн для страницы с формой добавления",
      code: `public function actionAdd() {

    $form = $this->makeForm('form_item');

    if ($this->request->isPost()) {

        $item_data = $form->parse($this->request->data('post'));

        if ($form->validate($item_data)) {

            $item_data['user_id']  = $this->cms_user->id;
            $item_data['date_pub'] = date('Y-m-d H:i:s');

            $id = $this->model->insert('myaddon_items', $item_data);

            return $this->redirect($this->href_to('view', $id));
        }
    }

    $this->cms_template->setTitle('Добавить элемент');

    return $this->cms_template->render('add', [
        'form' => $form->render()
    ]);
}`
    },
    {
      keywords: ['кэш', 'cache', 'кэшировани'],
      title: "Кэширование данных",
      explanation: "Паттерн get-or-set кэширования",
      code: `public function getPopularItems(): array {

    $cache = cmsCache::getInstance();
    $key   = 'myaddon.popular.list';

    $items = $cache->get($key);

    if ($items === false) {
        $items = $this->model
            ->filterEqual('is_pub', 1)
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get('myaddon_items');

        $cache->set($key, $items, 3600); // кэш на 1 час
    }

    return $items ?: [];
}

// Очищать кэш при изменении данных:
public function updateItem(int $id, array $data): void {
    $this->model->update('myaddon_items', $id, $data);
    cmsCache::getInstance()->clean('myaddon.popular.list');
}`
    },
    {
      keywords: ['хук', 'hook', 'событи', 'event'],
      title: "Создание и вызов хука",
      explanation: "Как добавить свои хуки для расширяемости дополнения",
      code: `// 1. Запуск хука в вашем коде (для расширяемости):
$item = cmsEventsManager::hook('myaddon_before_item', $item);
// Другие дополнения могут модифицировать $item через хук 'myaddon_before_item'

// 2. Реализация хука другого дополнения в файле hooks/content_after_add_approve.php:
class onMyaddonContentAfterAddApprove extends cmsAction {

    public function run($data) {

        $ctype_name = $data['ctype_name'];
        $item       = $data['item'];

        // Добавить запись в свою систему
        $this->model->insert('myaddon_notifications', [
            'type'       => 'new_content',
            'target_id'  => $item['id'],
            'user_id'    => $item['user_id'],
            'created_at' => date('Y-m-d H:i:s')
        ]);

        return $data; // ОБЯЗАТЕЛЬНО
    }

}`
    },
    {
      keywords: ['прав', 'перм', 'permission', 'acl', 'доступ'],
      title: "Проверка прав доступа",
      explanation: "Работа с системой прав пользователей",
      code: `public function actionSecure() {

    // Проверить авторизацию
    if (!$this->cms_user->is_logged) {
        return $this->redirect(href_to('auth', 'login'));
    }

    // Проверить конкретное право
    if (!$this->cms_user->checkAccess('myaddon', 'can_post')) {
        return $this->cms_template->render('no_access');
    }

    // Проверить роль
    if (!$this->cms_user->isInGroup('admins')) {
        return cmsCore::error404();
    }

    // Для регистрации своих прав — используйте хук:
    // controller_{name}_perms
    return $this->cms_template->render('secure_page');
}`
    },
    {
      keywords: ['файл', 'upload', 'загруз', 'изображ', 'image'],
      title: "Загрузка файлов/изображений",
      explanation: "Работа с загрузкой файлов через форму",
      code: `// В форме (forms/form_item.php):
new fieldImage('photo', [
    'title'     => 'Фото',
    'max_width' => 800,
    'max_height'=> 600,
    'max_size'  => 2048  // KB
]),

// В контроллере после сохранения формы:
public function actionAdd() {
    $form = $this->makeForm('form_item');
    if ($this->request->isPost()) {
        $item_data = $form->parse($this->request->data('post'));
        // $item_data['photo'] содержит путь к загруженному файлу
        if ($form->validate($item_data)) {
            $this->model->insert('myaddon_items', $item_data);
        }
    }
}`
    }
  ];

  const matched = examples.filter(ex =>
    ex.keywords.some(kw => lower.includes(kw))
  );

  if (matched.length === 0) {
    return {
      message: "Точный пример не найден. Доступные темы:",
      available_topics: examples.map(ex => ex.title),
      tip: "Уточните запрос: 'список с пагинацией', 'обработка формы', 'AJAX', 'кэширование', 'хуки', 'права доступа', 'загрузка файлов'"
    };
  }

  return {
    query: task,
    found: matched.length,
    examples: matched.map(ex => ({
      title: ex.title,
      explanation: ex.explanation,
      code: ex.code
    }))
  };
}
