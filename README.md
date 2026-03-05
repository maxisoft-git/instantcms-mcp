# InstantCMS MCP Server

MCP (Model Context Protocol) сервер для разработки дополнений и шаблонов на базе **InstantCMS 2**.

Подключив этот сервер к AI-ассистенту (Claude, Cursor и др.), вы получаете полный контекст системы — хуки, API классов, структуры файлов — и можете создавать рабочие дополнения с первого запроса.

---

## Возможности

- **102 хука** с описанием параметров, типов и готовыми примерами реализации
- **Генерация скаффолда** — все файлы дополнения за один вызов (manifest, install, model, frontend, actions, backend, widgets, routes)
- **API классов** — cmsModel, cmsTemplate, cmsRequest, cmsCache, cmsEventsManager и другие
- **Валидация** — проверка структуры дополнения на корректность
- **Поиск хуков** — по имени, описанию, категории, параметрам
- **Примеры кода** — паттерны для типовых задач (пагинация, AJAX, кэш, формы)

---

## Установка

### Требования

- Node.js 18+
- npm

### Клонирование и сборка

```bash
git clone https://github.com/your-username/instantcms-mcp.git
cd instantcms-mcp
npm install
npm run build
```

### Подключение к Claude Desktop

Добавьте в `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) или `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "instantcms": {
      "command": "node",
      "args": ["/absolute/path/to/instantcms-mcp/dist/index.js"]
    }
  }
}
```

Перезапустите Claude Desktop. В чате появятся инструменты с префиксом `instantcms`.

### Подключение к Cursor / другим MCP-клиентам

```json
{
  "mcp": {
    "servers": {
      "instantcms": {
        "command": "node",
        "args": ["/absolute/path/to/instantcms-mcp/dist/index.js"]
      }
    }
  }
}
```

### Запуск инспектора (отладка)

```bash
npm run inspector
```

---

## Инструменты

| Tool | Описание |
|------|----------|
| `get_addon_structure` | Структура файлов дополнения (5 типов) |
| `scaffold_addon` | Генерация готового кода всех файлов |
| `list_hooks` | Список хуков с фильтрацией по категории/типу |
| `get_hook_details` | Детали хука + пример реализации |
| `search_hooks` | Полнотекстовый поиск хуков |
| `get_component_api` | API класса (cmsModel, cmsTemplate и др.) |
| `list_components` | Список всех компонентов |
| `validate_addon` | Валидация структуры дополнения |
| `get_field_types` | Типы полей форм (14 типов) |
| `get_code_example` | Примеры кода для типовых задач |
| `scaffold_template` | Генерация шаблона темы |
| `get_template_structure` | Структура и переменные шаблона |

---

## Примеры использования

### Создать дополнение с нуля

```
Создай дополнение для отображения каталога товаров с категориями,
админ-панелью для управления, виджетом последних добавлений
и интеграцией с поиском сайта
```

### Найти нужный хук

```
Какой хук использовать, чтобы добавить вкладку на страницу профиля пользователя?
```

### Реализовать хук

```
Напиши реализацию хука content_after_add_approve, который добавляет
уведомление в нашу кастомную систему нотификаций
```

### Разобраться с API

```
Как правильно использовать cmsModel для постраничного вывода
с несколькими JOIN и сортировкой?
```

---

## Структура проекта

```
src/
├── data/
│   ├── hooks.ts        # 102 хука по 17 категориям
│   ├── components.ts   # API базовых классов
│   └── schemas.ts      # Структуры дополнений, типы полей
├── tools/
│   ├── hooks-tool.ts   # list / get / search хуков
│   ├── addon-tool.ts   # структура, API, валидация, примеры
│   └── scaffold-tool.ts # генерация файлов дополнений
├── server.ts           # Регистрация tools и resources
└── index.ts            # Точка входа (stdio transport)
```

---

## Структура генерируемого пакета

`scaffold_addon` создаёт пакет в формате менеджера расширений InstantCMS:

```
[pkg] manifest.ru.ini            ← метаданные пакета
[pkg] install.sql                ← SQL для создания таблиц
package/
  system/
    controllers/{name}/
      frontend.php               ← class {name} extends cmsFrontend
      backend.php                ← class backend{Name} extends cmsBackend
      model.php                  ← class model{Name} extends cmsModel
      actions/
        index.php                ← class action{Name}Index extends cmsAction
        view.php                 ← class action{Name}View extends cmsAction
      hooks/
        {hook_name}.php          ← class on{Name}{Hook} extends cmsAction
      backend/
        forms/form_item.php
        forms/form_options.php
        grids/grid_items.php
      widgets/list/
        widget.php
        options.form.php
    languages/ru/controllers/{name}/{name}.php
```

**Установка**: упаковать в ZIP и загрузить через «Панель управления → Расширения».

---

## Типы дополнений

| Тип | Описание |
|-----|----------|
| `basic` | Только фронтенд (список + просмотр) |
| `with_admin` | Фронтенд + CRUD в административной панели |
| `with_hooks` | Интеграция с другими компонентами через хуки |
| `with_routes` | Кастомные URL-маршруты |
| `with_widget` | Виджет для размещения на страницах |

---

## Категории хуков

| Категория | Кол-во | Описание |
|-----------|--------|----------|
| `content` | 24 | Материалы, типы контента, альбомы, фото |
| `users` | 22 | Регистрация, профили, дружба, стена, сообщения |
| `groups` | 8 | Группы сообщества |
| `comments` | 9 | Комментарии |
| `admin` | 5 | Административная панель |
| `template` | 6 | Рендер страниц, меню, виджеты |
| `activity` | 4 | Лента активности |
| `engine` | 8 | Системные события, email, настройки |
| `forms` | 3 | Формы |
| `search` | 1 | Полнотекстовый поиск |
| `sitemap` | 2 | XML-карта сайта |
| `rss` | 1 | RSS-ленты |
| `cron` | 3 | Планировщик задач |
| `subscriptions` | 3 | Подписки |
| `rating` | 2 | Рейтинг и голосование |
| `moderation` | 1 | Очередь модерации |
| `controllers` | 2 | Настройки контроллеров |

---

## Разработка

```bash
# Режим наблюдения (hot reload)
npm run dev

# Пересборка
npm run build

# Запуск инспектора MCP
npm run inspector
```

---

## Совместимость

- **InstantCMS**: 2.x (протестировано на 2.18.1)
- **Node.js**: 18+
- **MCP SDK**: @modelcontextprotocol/sdk ^1.0

---

## Лицензия

MIT
