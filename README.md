# InstantCMS MCP Server

MCP (Model Context Protocol) сервер для разработки дополнений и шаблонов на базе **InstantCMS 2**.

Подключив этот сервер к AI-ассистенту (Claude, Cursor и др.), вы получаете полный контекст системы — хуки, API классов, структуры файлов — и можете создавать рабочие дополнения с первого запроса.

---

## Возможности

- **102 хука** с описанием параметров, типов и готовыми примерами реализации
- **170 событий** из таблицы cms_events
- **38 классов ядра** (cmsModel, cmsTemplate, cmsDatabase и др.) с 500+ методами
- **Генерация скаффолда** — все файлы дополнения за один вызов
- **50 таблиц БД** с полными схемами
- **61 контроллер** с 809 экшенами
- **120 хелпер-функций** (template, html, files, strings)
- **6 PHP классов** (Jevix, Google Auth, Mobile Detect, RSS, IDNA, YAML)
- **Валидация структуры** дополнений
- **Поиск хуков** по имени, описанию, категории
- **Примеры кода** для типовых задач

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

## Инструменты (38)

### Базовые (14)
| Tool | Описание |
|------|---------|
| `get_addon_structure` | Структура файлов дополнения (5 типов) |
| `scaffold_addon` | Генерация готового кода всех файлов |
| `list_hooks` | Список хуков с фильтрацией |
| `get_hook_details` | Детали хука + пример реализации |
| `search_hooks` | Полнотекстовый поиск хуков |
| `get_component_api` | API класса (cmsModel, cmsTemplate и др.) |
| `list_components` | Список всех компонентов |
| `validate_addon` | Валидация структуры дополнения |
| `get_field_types` | Типы полей форм |
| `get_code_example` | Примеры кода для типовых задач |
| `scaffold_template` | Генерация шаблона темы |
| `get_template_structure` | Структура и переменные шаблона |
| `scaffold_layout_scheme` | Схема виджетов для modern |
| `list_layout_presets` | Пресеты схем |

### База данных — статика (6)
| Tool | Описание |
|------|---------|
| `introspect_database` | Список таблиц БД |
| `describe_table` | Структура таблицы |
| `list_content_types` | Типы контента |
| `list_database_events` | Карта событий |
| `analyze_controller` | Анализ контроллера |
| `list_controllers` | Список контроллеров |

### MariaDB — динамика (6)
| Tool | Описание |
|------|---------|
| `maria_execute_query` | SQL запрос |
| `maria_list_tables` | Список таблиц |
| `maria_describe_table` | Структура таблицы |
| `maria_get_database_info` | Статистика БД |
| `maria_search_tables` | Поиск таблиц |
| `maria_get_table_data` | Данные с пагинацией |

### Исходный код (6)
| Tool | Описание |
|------|---------|
| `list_widgets` | Список виджетов |
| `get_widget_info` | Детали виджета |
| `list_traits` | Список трейтов |
| `get_trait_info` | Методы трейта |
| `list_field_types` | Типы полей |
| `get_field_type_info` | Детали поля |

### Миграции (2)
| Tool | Описание |
|------|---------|
| `generate_migration` | Генерация SQL и install.php |
| `get_field_suggestions` | Подсказки по полям |

### AI анализ (2)
| Tool | Описание |
|------|---------|
| `analyze_requirement` | AI анализ запроса |
| `suggest_addon_structure` | Структура по типу |

---

## Ресурсы (4)

| URI | Описание |
|-----|---------|
| `instantcms://hooks/all` | Все хуки (JSON) |
| `instantcms://components/all` | Все компоненты (JSON) |
| `instantcms://addon/types` | Типы дополнений (JSON) |
| `instantcms://quickstart` | Краткое руководство (Markdown) |

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
│   ├── hooks.ts           # 102 хука по 17 категориям
│   ├── components.ts     # API базовых классов
│   ├── core-api.ts       # 38 классов ядра с методами
│   ├── libs-api.ts       # Хелперы, классы, сторонние библиотеки
│   ├── js-api.ts         # JavaScript API для фронтенда
│   ├── database-schema.ts # 50 таблиц БД
│   ├── events-map.ts     # 170 событий
│   ├── controllers-map.ts # 61 контроллер, 809 экшенов
│   ├── traits-map.ts      # 10 трейтов, 56 методов
│   ├── fields-map.ts      # 32 типа полей
│   ├── widgets-map.ts     # 4 виджета
│   └── schemas.ts        # Структуры дополнений
├── tools/
│   ├── hooks-tool.ts     # list / get / search хуков
│   ├── addon-tool.ts     # структура, API, валидация
│   ├── scaffold-tool.ts   # генерация файлов
│   ├── layout-tool.ts    # схемы виджетов
│   ├── db-tool.ts        # статические данные БД
│   ├── controllers-tool.ts # контроллеры
│   ├── source-tool.ts    # виджеты, трейты, поля
│   ├── migration-tool.ts  # миграции
│   ├── requirement-tool.ts # AI анализ
│   └── parser/           # Парсеры данных
├── server.ts             # 38 инструментов + 4 ресурса
└── index.ts              # Точка входа
```

---

## Типы дополнений

| Тип | Описание |
|-----|----------|
| `basic` | Только фронтенд |
| `with_admin` | Фронтенд + CRUD в админке |
| `with_hooks` | Интеграция через хуки |
| `with_routes` | Кастомные URL-маршруты |
| `with_widget` | Виджет |

---

## Библиотеки (system/libs)

### Хелпер-функции (120)

| Модуль | Кол-во | Описание |
|--------|--------|---------|
| template.helper | 28 | HTML-шаблонизация |
| html.helper | 30 | Экранирование, типографика |
| files.helper | 19 | Файловые операции |
| strings.helper | 43 | Строки, даты, URL, SEO |

### PHP классы (6)

| Класс | Назначение |
|-------|------------|
| Jevix | XSS-фильтрация, HTML/XML парсер |
| googleAuthenticator | Google Authenticator 2FA |
| Mobile_Detect | Определение мобильных устройств |
| lastRSS | RSS парсер |
| idna_convert | IDN Unicode/Punycode |
| spyc | YAML парсер |

### Сторонние (3)

| Библиотека | Назначение |
|------------|------------|
| scssphp | Компилятор SCSS/SASS |
| geshi | Подсветка синтаксиса |
| phpmailer | Отправка email |

---

## Разработка

```bash
# Установка зависимостей
npm install

# Режим наблюдения (hot reload)
npm run dev

# Пересборка
npm run build

# Тесты (71 тест)
npm test

# Парсинг данных
npm run parse:all
```

---

## Совместимость

- **InstantCMS**: 2.x
- **Node.js**: 18+
- **MCP SDK**: @modelcontextprotocol/sdk ^1.0

---

## Статистика

| Метрика | Значение |
|---------|----------|
| MCP инструментов | **38** |
| MCP ресурсов | **4** |
| Тестов | **71** |
| SQL таблиц | **50** |
| Хуков | **102** |
| Событий | **170** |
| Контроллеров | **61** |
| Экшенов | **809** |
| Классов ядра | **38** |
| Виджетов | **4** |
| Трейтов | **10** |
| Типов полей | **32** |
| Хелпер-функций | **120** |
| PHP классов | **6** |

---

## Лицензия

MIT
