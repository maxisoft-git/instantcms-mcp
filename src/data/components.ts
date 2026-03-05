export interface MethodParam {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ComponentMethod {
  name: string;
  signature: string;
  description: string;
  parameters: MethodParam[];
  return_type: string;
  example: string;
  deprecated?: boolean;
}

export interface Component {
  name: string;
  class: string;
  description: string;
  access: string;
  methods: ComponentMethod[];
}

export const components: Component[] = [
  {
    name: "cmsModel",
    class: "cmsModel",
    description: "Базовый класс для работы с базой данных. Query builder с fluent interface. Все модели контроллеров наследуют этот класс.",
    access: "$this->model — в контроллере. cmsCore::getModel('controller_name') — глобально.",
    methods: [
      {
        name: "filterEqual",
        signature: "filterEqual(string $field, mixed $value): static",
        description: "Фильтр WHERE field = value",
        parameters: [
          { name: "$field", type: "string", description: "Поле таблицы", required: true },
          { name: "$value", type: "mixed", description: "Значение для сравнения", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterEqual('is_pub', 1)->filterEqual('user_id', 5)->get('articles');`
      },
      {
        name: "filterNotEqual",
        signature: "filterNotEqual(string $field, mixed $value): static",
        description: "Фильтр WHERE field != value",
        parameters: [
          { name: "$field", type: "string", description: "Поле таблицы", required: true },
          { name: "$value", type: "mixed", description: "Значение", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterNotEqual('status', 'deleted')->get('items');`
      },
      {
        name: "filterIn",
        signature: "filterIn(string $field, array $values): static",
        description: "Фильтр WHERE field IN (values)",
        parameters: [
          { name: "$field", type: "string", description: "Поле", required: true },
          { name: "$values", type: "array", description: "Массив значений", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterIn('id', [1, 2, 3])->get('items');`
      },
      {
        name: "filterLike",
        signature: "filterLike(string $field, string $value): static",
        description: "Фильтр WHERE field LIKE %value%",
        parameters: [
          { name: "$field", type: "string", description: "Поле", required: true },
          { name: "$value", type: "string", description: "Строка для поиска", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterLike('title', 'поиск')->get('items');`
      },
      {
        name: "filterGt",
        signature: "filterGt(string $field, mixed $value): static",
        description: "Фильтр WHERE field > value",
        parameters: [
          { name: "$field", type: "string", description: "Поле", required: true },
          { name: "$value", type: "mixed", description: "Значение", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterGt('rating', 3)->get('items');`
      },
      {
        name: "filterLt",
        signature: "filterLt(string $field, mixed $value): static",
        description: "Фильтр WHERE field < value",
        parameters: [
          { name: "$field", type: "string", description: "Поле", required: true },
          { name: "$value", type: "mixed", description: "Значение", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->filterLt('date_expire', date('Y-m-d H:i:s'))->get('items');`
      },
      {
        name: "orderBy",
        signature: "orderBy(string $field, string $order = 'asc'): static",
        description: "Сортировка результатов",
        parameters: [
          { name: "$field", type: "string", description: "Поле для сортировки", required: true },
          { name: "$order", type: "string", description: "'asc' или 'desc'", default: "asc" }
        ],
        return_type: "static",
        example: `$items = $this->model->orderBy('date_pub', 'desc')->get('items');`
      },
      {
        name: "limit",
        signature: "limit(int $offset, int $count): static",
        description: "LIMIT для запроса. Если один параметр — только COUNT.",
        parameters: [
          { name: "$offset", type: "int", description: "Смещение (или количество, если один аргумент)", required: true },
          { name: "$count", type: "int", description: "Количество записей", required: false }
        ],
        return_type: "static",
        example: `$items = $this->model->limit(10)->get('items');
$page_items = $this->model->limit(0, 20)->get('items');`
      },
      {
        name: "limitPage",
        signature: "limitPage(int $page, int $perpage): static",
        description: "LIMIT для постраничной навигации",
        parameters: [
          { name: "$page", type: "int", description: "Номер страницы (с 1)", required: true },
          { name: "$perpage", type: "int", description: "Записей на страницу", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->limitPage($page, 15)->get('items');`
      },
      {
        name: "get",
        signature: "get(string $table): array",
        description: "Получить все записи по условиям фильтрации",
        parameters: [
          { name: "$table", type: "string", description: "Имя таблицы без префикса", required: true }
        ],
        return_type: "array",
        example: `$items = $this->model->filterEqual('is_pub', 1)->orderBy('id', 'desc')->limit(10)->get('myaddon_items');`
      },
      {
        name: "getItem",
        signature: "getItem(string $table): array|false",
        description: "Получить одну запись (LIMIT 1)",
        parameters: [
          { name: "$table", type: "string", description: "Имя таблицы", required: true }
        ],
        return_type: "array|false",
        example: `$item = $this->model->filterEqual('id', $id)->getItem('myaddon_items');
if (!$item) { return cmsCore::error404(); }`
      },
      {
        name: "getItemByField",
        signature: "getItemByField(string $table, string $field, mixed $value): array|false",
        description: "Получить запись по полю. Shortcut для filterEqual()->getItem()",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true },
          { name: "$field", type: "string", description: "Поле", required: true },
          { name: "$value", type: "mixed", description: "Значение", required: true }
        ],
        return_type: "array|false",
        example: `$item = $this->model->getItemByField('myaddon_items', 'slug', $slug);`
      },
      {
        name: "getCount",
        signature: "getCount(string $table): int",
        description: "Получить количество записей по условиям фильтра",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true }
        ],
        return_type: "int",
        example: `$total = $this->model->filterEqual('user_id', $user_id)->getCount('myaddon_items');`
      },
      {
        name: "insert",
        signature: "insert(string $table, array $data): int",
        description: "Вставка записи. Возвращает ID вставленной записи.",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true },
          { name: "$data", type: "array", description: "Данные для вставки ['field' => value]", required: true }
        ],
        return_type: "int",
        example: `$id = $this->model->insert('myaddon_items', [
    'title'    => $data['title'],
    'user_id'  => $this->cms_user->id,
    'date_pub' => date('Y-m-d H:i:s'),
    'is_pub'   => 1
]);`
      },
      {
        name: "update",
        signature: "update(string $table, int $id, array $data): bool",
        description: "Обновление записи по ID",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true },
          { name: "$id", type: "int", description: "ID записи", required: true },
          { name: "$data", type: "array", description: "Данные для обновления", required: true }
        ],
        return_type: "bool",
        example: `$this->model->update('myaddon_items', $id, [
    'title'  => $data['title'],
    'is_pub' => $data['is_pub']
]);`
      },
      {
        name: "updateFiltered",
        signature: "updateFiltered(string $table, array $data): bool",
        description: "Обновление записей по условиям фильтра",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true },
          { name: "$data", type: "array", description: "Данные для обновления", required: true }
        ],
        return_type: "bool",
        example: `// Скрыть все записи пользователя
$this->model->filterEqual('user_id', $user_id)->updateFiltered('myaddon_items', ['is_pub' => 0]);`
      },
      {
        name: "delete",
        signature: "delete(string $table, int $id, string $id_field = 'id'): bool",
        description: "Удаление записи по ID",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true },
          { name: "$id", type: "int", description: "ID записи", required: true },
          { name: "$id_field", type: "string", description: "Поле ID", default: "id" }
        ],
        return_type: "bool",
        example: `$this->model->delete('myaddon_items', $id);`
      },
      {
        name: "deleteFiltered",
        signature: "deleteFiltered(string $table): bool",
        description: "Удаление записей по условиям фильтра",
        parameters: [
          { name: "$table", type: "string", description: "Таблица", required: true }
        ],
        return_type: "bool",
        example: `$this->model->filterEqual('user_id', $user_id)->deleteFiltered('myaddon_items');`
      },
      {
        name: "useCache",
        signature: "useCache(string $key): static",
        description: "Кэширование результата следующего запроса",
        parameters: [
          { name: "$key", type: "string", description: "Ключ кэша", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->useCache('myaddon.items.list')->get('myaddon_items');`
      },
      {
        name: "select",
        signature: "select(string $fields): static",
        description: "Указать поля для SELECT",
        parameters: [
          { name: "$fields", type: "string", description: "SQL-строка полей", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model->select('id, title, date_pub')->get('myaddon_items');`
      },
      {
        name: "join",
        signature: "join(string $type, string $table, string $on): static",
        description: "JOIN таблиц",
        parameters: [
          { name: "$type", type: "string", description: "'left', 'inner', 'right'", required: true },
          { name: "$table", type: "string", description: "Таблица для JOIN", required: true },
          { name: "$on", type: "string", description: "ON условие", required: true }
        ],
        return_type: "static",
        example: `$items = $this->model
    ->join('left', 'cms_users u', 'u.id = i.user_id')
    ->select('i.*, u.login as user_login')
    ->get('myaddon_items i');`
      },
      {
        name: "groupBy",
        signature: "groupBy(string $field): static",
        description: "GROUP BY для агрегации",
        parameters: [
          { name: "$field", type: "string", description: "Поле группировки", required: true }
        ],
        return_type: "static",
        example: `$stats = $this->model->select('user_id, COUNT(*) as cnt')->groupBy('user_id')->get('myaddon_items');`
      }
    ]
  },
  {
    name: "cmsController / cmsFrontend / cmsBackend",
    class: "cmsController",
    description: "Базовые классы контроллеров. cmsFrontend — для фронтенда, cmsBackend — для админ-панели.",
    access: "$this — внутри контроллера. cmsCore::getController('name') — глобально.",
    methods: [
      {
        name: "href_to",
        signature: "href_to(string $action = '', mixed ...$params): string",
        description: "Генерация URL в рамках текущего контроллера",
        parameters: [
          { name: "$action", type: "string", description: "Действие контроллера", required: false, default: "''" },
          { name: "$params", type: "mixed", description: "Параметры URL", required: false }
        ],
        return_type: "string",
        example: `$url = $this->href_to('view', $item['id']);
// Результат: /myaddon/view/123`
      },
      {
        name: "redirect",
        signature: "redirect(string $url, int $code = 302): void",
        description: "HTTP редирект",
        parameters: [
          { name: "$url", type: "string", description: "URL для редиректа", required: true },
          { name: "$code", type: "int", description: "HTTP код", default: "302" }
        ],
        return_type: "void",
        example: `return $this->redirect($this->href_to());`
      },
      {
        name: "renderJSON",
        signature: "renderJSON(array $data): void",
        description: "Ответ в формате JSON (для AJAX запросов)",
        parameters: [
          { name: "$data", type: "array", description: "Данные ответа", required: true }
        ],
        return_type: "void",
        example: `return $this->renderJSON(['success' => true, 'id' => $new_id]);`
      },
      {
        name: "getForm",
        signature: "getForm(string $form_name, array $data = []): cmsForm",
        description: "Получить объект формы из файла forms/{form_name}.php",
        parameters: [
          { name: "$form_name", type: "string", description: "Имя файла формы", required: true },
          { name: "$data", type: "array", description: "Данные для инициализации", default: "[]" }
        ],
        return_type: "cmsForm",
        example: `$form = $this->getForm('item_form', ['id' => $item_id]);`
      },
      {
        name: "makeForm",
        signature: "makeForm(string $form_name, array $data = []): cmsForm",
        description: "Создать и инициализировать форму. Проксирует хук form_make.",
        parameters: [
          { name: "$form_name", type: "string", description: "Имя формы", required: true },
          { name: "$data", type: "array", description: "Данные", default: "[]" }
        ],
        return_type: "cmsForm",
        example: `$form = $this->makeForm('options', $this->options);
$form_data = $form->render();`
      },
      {
        name: "loadLanguage",
        signature: "loadLanguage(string $lang = ''): void",
        description: "Загрузить языковой файл контроллера",
        parameters: [
          { name: "$lang", type: "string", description: "Код языка (по умолчанию из конфига)", default: "''" }
        ],
        return_type: "void",
        example: `// В конструкторе или __construct
$this->loadLanguage();
// Теперь доступны константы из languages/{lang}/lang.php`
      },
      {
        name: "cmsCore::getController",
        signature: "cmsCore::getController(string $name): cmsController",
        description: "Получить экземпляр контроллера по имени",
        parameters: [
          { name: "$name", type: "string", description: "Имя контроллера", required: true }
        ],
        return_type: "cmsController",
        example: `$activity = cmsCore::getController('activity');
$activity->addEntry('myaddon', 'create', ['subject_id' => $id]);`
      }
    ]
  },
  {
    name: "cmsTemplate",
    class: "cmsTemplate",
    description: "Движок шаблонов. Singleton. Управляет рендерингом, CSS/JS, блоками страницы.",
    access: "$this->cms_template — в контроллере. cmsTemplate::getInstance() — глобально.",
    methods: [
      {
        name: "render",
        signature: "render(string $tpl_file, array $data = []): string",
        description: "Рендер шаблонного файла .tpl.php и вывод на страницу",
        parameters: [
          { name: "$tpl_file", type: "string", description: "Имя файла шаблона (без .tpl.php)", required: true },
          { name: "$data", type: "array", description: "Переменные для шаблона", default: "[]" }
        ],
        return_type: "string",
        example: `return $this->cms_template->render('index', [
    'items'   => $items,
    'total'   => $total,
    'page'    => $page,
    'perpage' => $perpage
]);`
      },
      {
        name: "renderInternal",
        signature: "renderInternal(cmsController $ctrl, string $tpl, array $data = []): string",
        description: "Рендер шаблона из директории конкретного контроллера (для хуков и виджетов)",
        parameters: [
          { name: "$ctrl", type: "cmsController", description: "Контроллер-владелец шаблона", required: true },
          { name: "$tpl", type: "string", description: "Имя шаблона", required: true },
          { name: "$data", type: "array", description: "Переменные", default: "[]" }
        ],
        return_type: "string",
        example: `return $this->cms_template->renderInternal($this, 'list', ['items' => $items]);`
      },
      {
        name: "fetch",
        signature: "fetch(string $tpl_file, array $data = []): string",
        description: "Рендер шаблона в строку (без вывода)",
        parameters: [
          { name: "$tpl_file", type: "string", description: "Путь к шаблону", required: true },
          { name: "$data", type: "array", description: "Переменные", default: "[]" }
        ],
        return_type: "string",
        example: `$html = $this->cms_template->fetch('myaddon/block', ['item' => $item]);
echo $html;`
      },
      {
        name: "setTitle",
        signature: "setTitle(string $title): void",
        description: "Установить заголовок страницы (<title>)",
        parameters: [
          { name: "$title", type: "string", description: "Заголовок страницы", required: true }
        ],
        return_type: "void",
        example: `$this->cms_template->setTitle('Название страницы | ' . cmsConfig::get('sitename'));`
      },
      {
        name: "addHeadCSS",
        signature: "addHeadCSS(string $file, bool $no_merge = false): void",
        description: "Добавить CSS файл в <head>",
        parameters: [
          { name: "$file", type: "string", description: "URL CSS файла", required: true },
          { name: "$no_merge", type: "bool", description: "Не объединять с другими CSS", default: "false" }
        ],
        return_type: "void",
        example: `$this->cms_template->addHeadCSS('/static/myaddon/style.css');`
      },
      {
        name: "addHeadJS",
        signature: "addHeadJS(string $file, bool $no_merge = false): void",
        description: "Добавить JS файл в <head>",
        parameters: [
          { name: "$file", type: "string", description: "URL JS файла", required: true },
          { name: "$no_merge", type: "bool", description: "Не объединять", default: "false" }
        ],
        return_type: "void",
        example: `$this->cms_template->addHeadJS('/static/myaddon/app.js');`
      },
      {
        name: "addBottom",
        signature: "addBottom(string $html): void",
        description: "Добавить HTML перед закрывающим </body>",
        parameters: [
          { name: "$html", type: "string", description: "HTML для вставки", required: true }
        ],
        return_type: "void",
        example: `$this->cms_template->addBottom('<script>initMyPlugin();</script>');`
      },
      {
        name: "renderJSON",
        signature: "renderJSON(array $data): void",
        description: "Вернуть JSON ответ и завершить выполнение",
        parameters: [
          { name: "$data", type: "array", description: "Данные", required: true }
        ],
        return_type: "void",
        example: `$this->cms_template->renderJSON(['success' => true, 'message' => 'OK']);`
      }
    ]
  },
  {
    name: "cmsCache",
    class: "cmsCache",
    description: "Кэширование данных. Поддерживает файловый кэш, Memcache, Redis.",
    access: "cmsCache::getInstance()",
    methods: [
      {
        name: "get",
        signature: "get(string $key): mixed|false",
        description: "Получить данные из кэша. false если не найдено или устарело.",
        parameters: [
          { name: "$key", type: "string", description: "Ключ кэша", required: true }
        ],
        return_type: "mixed|false",
        example: `$cache = cmsCache::getInstance();
$data = $cache->get('myaddon.list');
if ($data === false) {
    $data = $this->model->get('items');
    $cache->set('myaddon.list', $data, 300);
}`
      },
      {
        name: "set",
        signature: "set(string $key, mixed $data, int $ttl = 0): bool",
        description: "Сохранить данные в кэш",
        parameters: [
          { name: "$key", type: "string", description: "Ключ", required: true },
          { name: "$data", type: "mixed", description: "Данные", required: true },
          { name: "$ttl", type: "int", description: "Время жизни в секундах (0 = бессрочно)", default: "0" }
        ],
        return_type: "bool",
        example: `cmsCache::getInstance()->set('myaddon.count', $count, 3600);`
      },
      {
        name: "clean",
        signature: "clean(string $key): bool",
        description: "Удалить ключ из кэша",
        parameters: [
          { name: "$key", type: "string", description: "Ключ или префикс для очистки", required: true }
        ],
        return_type: "bool",
        example: `// Очищать кэш при изменении данных
cmsCache::getInstance()->clean('myaddon.list');
cmsCache::getInstance()->clean('myaddon.count');`
      }
    ]
  },
  {
    name: "cmsRequest",
    class: "cmsRequest",
    description: "Обработка HTTP-запросов. GET/POST параметры, проверки типа запроса.",
    access: "$this->request — в контроллере.",
    methods: [
      {
        name: "get",
        signature: "get(string $key, mixed $default = null): mixed",
        description: "Получить параметр из GET",
        parameters: [
          { name: "$key", type: "string", description: "Имя параметра", required: true },
          { name: "$default", type: "mixed", description: "Значение по умолчанию", default: "null" }
        ],
        return_type: "mixed",
        example: `$page = $this->request->get('page', 1);
$sort = $this->request->get('sort', 'date');`
      },
      {
        name: "post",
        signature: "post(string $key, mixed $default = null): mixed",
        description: "Получить параметр из POST",
        parameters: [
          { name: "$key", type: "string", description: "Имя параметра", required: true },
          { name: "$default", type: "mixed", description: "Значение по умолчанию", default: "null" }
        ],
        return_type: "mixed",
        example: `$title = $this->request->post('title', '');
$is_pub = $this->request->post('is_pub', 0);`
      },
      {
        name: "isPost",
        signature: "isPost(): bool",
        description: "Проверить, является ли запрос POST",
        parameters: [],
        return_type: "bool",
        example: `if ($this->request->isPost()) {
    // Обработать форму
    $data = $form->parse($this->request->data('post'));
}`
      },
      {
        name: "isAjax",
        signature: "isAjax(): bool",
        description: "Проверить, является ли запрос AJAX",
        parameters: [],
        return_type: "bool",
        example: `if ($this->request->isAjax()) {
    return $this->renderJSON(['success' => true]);
}`
      },
      {
        name: "data",
        signature: "data(string $type): array",
        description: "Получить все данные POST или GET",
        parameters: [
          { name: "$type", type: "string", description: "'post' или 'get'", required: true }
        ],
        return_type: "array",
        example: `$form_data = $form->parse($this->request->data('post'));`
      }
    ]
  },
  {
    name: "cmsEventsManager",
    class: "cmsEventsManager",
    description: "Система хуков и событий. Диспетчер событий InstantCMS.",
    access: "cmsEventsManager:: (статические методы)",
    methods: [
      {
        name: "hook",
        signature: "cmsEventsManager::hook(string $event, mixed $data, mixed $default = null, mixed $request = null): mixed",
        description: "Запустить хук. Данные последовательно проходят через всех слушателей.",
        parameters: [
          { name: "$event", type: "string", description: "Имя события", required: true },
          { name: "$data", type: "mixed", description: "Данные для передачи", required: true },
          { name: "$default", type: "mixed", description: "Значение по умолчанию", default: "null" },
          { name: "$request", type: "mixed", description: "Дополнительный контекст", default: "null" }
        ],
        return_type: "mixed",
        example: `// Простой хук
$items = cmsEventsManager::hook('myaddon_before_list', $items);

// Хук с дополнительными данными
$item = cmsEventsManager::hook('content_before_item', $item, $item, ['ctype' => $ctype]);`
      },
      {
        name: "hookAll",
        signature: "cmsEventsManager::hookAll(string $event, mixed $data, mixed $default = null): array",
        description: "Запустить хук и собрать результаты от всех слушателей в массив",
        parameters: [
          { name: "$event", type: "string", description: "Имя события", required: true },
          { name: "$data", type: "mixed", description: "Данные", required: true },
          { name: "$default", type: "mixed", description: "Значение по умолчанию", default: "null" }
        ],
        return_type: "array",
        example: `// Собрать пункты меню от всех дополнений
$menu_items = cmsEventsManager::hookAll('menu_admin', []);`
      }
    ]
  },
  {
    name: "cmsCore (утилиты)",
    class: "cmsCore",
    description: "Главный singleton CMS. Содержит утилиты для получения компонентов.",
    access: "cmsCore:: (статические методы)",
    methods: [
      {
        name: "cmsCore::getModel",
        signature: "cmsCore::getModel(string $controller): cmsModel",
        description: "Получить модель контроллера",
        parameters: [
          { name: "$controller", type: "string", description: "Имя контроллера", required: true }
        ],
        return_type: "cmsModel",
        example: `$content_model = cmsCore::getModel('content');
$items = $content_model->filterEqual('is_pub', 1)->get('con_articles');`
      },
      {
        name: "cmsCore::error404",
        signature: "cmsCore::error404(): void",
        description: "Показать страницу 404",
        parameters: [],
        return_type: "void",
        example: `if (!$item) { return cmsCore::error404(); }`
      },
      {
        name: "cmsConfig::get",
        signature: "cmsConfig::get(string $key, mixed $default = null): mixed",
        description: "Получить значение из конфигурации сайта",
        parameters: [
          { name: "$key", type: "string", description: "Ключ конфига", required: true },
          { name: "$default", type: "mixed", description: "Значение по умолчанию", default: "null" }
        ],
        return_type: "mixed",
        example: `$sitename = cmsConfig::get('sitename');
$template = cmsConfig::get('template', 'default');
$db_prefix = cmsConfig::get('db_prefix', 'cms_');`
      }
    ]
  }
];
