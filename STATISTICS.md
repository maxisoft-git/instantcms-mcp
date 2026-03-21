# InstantCMS MCP Server — Статистика

> Автоматически генерируется. Дата: 21.03.2026

---

## MCP Инструменты

**Всего: 38 инструментов**

### Базовые (14)

| # | Инструмент | Описание |
|---|-----------|---------|
| 1 | `get_addon_structure` | Структура файлов дополнения |
| 2 | `scaffold_addon` | Генерация скаффолда дополнения |
| 3 | `list_hooks` | Список хуков с фильтрацией |
| 4 | `get_hook_details` | Детали хука с примером |
| 5 | `search_hooks` | Поиск хуков |
| 6 | `get_component_api` | API компонента |
| 7 | `list_components` | Список компонентов |
| 8 | `validate_addon` | Валидация структуры |
| 9 | `get_field_types` | Типы полей форм |
| 10 | `get_code_example` | Примеры кода |
| 11 | `scaffold_template` | Генерация шаблона |
| 12 | `get_template_structure` | Структура шаблона |
| 13 | `scaffold_layout_scheme` | Схема виджетов |
| 14 | `list_layout_presets` | Пресеты схем |

### База данных — статика (6)

Генерируется из SQL и source кода.

| # | Инструмент | Описание |
|---|-----------|---------|
| 15 | `introspect_database` | Список таблиц БД |
| 16 | `describe_table` | Структура таблицы |
| 17 | `list_content_types` | Типы контента |
| 18 | `list_database_events` | Карта событий |
| 19 | `analyze_controller` | Анализ контроллера |
| 20 | `list_controllers` | Список контроллеров |
| 21 | `get_controller_actions` | Экшены контроллера |
| 22 | `list_system_traits` | Системные трейты |

### MariaDB — динамика (6)

Требуют настройки переменных окружения: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`

| # | Инструмент | Описание |
|---|-----------|---------|
| 23 | `maria_execute_query` | SQL запрос |
| 24 | `maria_list_tables` | Список таблиц |
| 25 | `maria_describe_table` | Структура таблицы |
| 26 | `maria_get_database_info` | Статистика БД |
| 27 | `maria_search_tables` | Поиск таблиц |
| 28 | `maria_get_table_data` | Данные с пагинацией |

### Исходный код — парсинг (6)

Генерируется из `source/system/`

| # | Инструмент | Описание |
|---|-----------|---------|
| 29 | `list_widgets` | Список виджетов |
| 30 | `get_widget_info` | Детали виджета |
| 31 | `list_traits` | Список трейтов |
| 32 | `get_trait_info` | Методы трейта |
| 33 | `list_field_types` | Типы полей |
| 34 | `get_field_type_info` | Детали поля |

### Миграции — генерация (2)

| # | Инструмент | Описание |
|---|-----------|---------|
| 35 | `generate_migration` | Генерация SQL и install.php |
| 36 | `get_field_suggestions` | Подсказки по полям |

### Анализ и AI (2)

| # | Инструмент | Описание |
|---|-----------|---------|
| 37 | `analyze_requirement` | AI анализ запроса → структура дополнения |
| 38 | `suggest_addon_structure` | Структура по типу дополнения |

---

## MCP Resources

**Всего: 4 ресурса**

| URI | Описание |
|-----|---------|
| `instantcms://hooks/all` | Все хуки (JSON) |
| `instantcms://components/all` | Все компоненты (JSON) |
| `instantcms://addon/types` | Типы дополнений (JSON) |
| `instantcms://quickstart` | Краткое руководство (Markdown) |

---

## Данные из SQL (Фаза 0)

Парсер: `src/tools/parser/sql-parser.ts`

### Таблицы базы данных

**Источник:** `source/install/languages/ru/sql/base.sql`

| Метрика | Значение |
|---------|----------|
| Таблиц | **50** |
| Сгенерировано | `src/data/database-schema.ts` |

#### Основные таблицы

| Таблица | Описание |
|---------|---------|
| `cms_content_types` | Типы контента |
| `cms_con_pages` | Страницы контента |
| `cms_users` | Пользователи |
| `cms_controllers` | Компоненты |
| `cms_events` | События |
| `cms_widgets` | Виджеты |
| `cms_menu` / `cms_menu_items` | Меню |
| `cms_perms_rules` / `cms_perms_users` | Права доступа |
| `cms_scheduler_tasks` | Задачи планировщика |
| `cms_jobs` | Очередь задач |
| `cms_sessions_online` | Онлайн сессии |

### События (хуки)

**Источник:** `source/install/languages/ru/sql/base.sql` (INSERT events)

| Метрика | Значение |
|---------|----------|
| Событий | **95** |
| Сгенерировано | `src/data/events-map.ts` |

---

## Данные из исходного кода (Фаза 2)

### Контроллеры

**Источник:** `source/system/controllers/`

| Метрика | Значение |
|---------|----------|
| Контроллеров | **61** |
| Экшенов | **107** |
| Сгенерировано | `src/data/controllers-map.ts` |

#### Контроллеры с backend

| Контроллер | Backend | Model |
|------------|---------|-------|
| activity | ✓ | ✓ |
| admin | ✓ | ✓ |
| auth | ✓ | ✓ |
| content | ✓ | ✓ |
| messages | ✓ | ✓ |
| users | ✓ | ✓ |
| ... | ... | ... |

### Виджеты

**Источник:** `source/system/widgets/`

| Метрика | Значение |
|---------|----------|
| Виджетов | **4** |
| Сгенерировано | `src/data/widgets-map.ts` |

| Виджет | Описание |
|--------|---------|
| `text` | Текстовый блок |
| `menu` | Меню |
| `html` | HTML блок |
| `template` | Элементы шаблона |

### Трейты

**Источник:** `source/system/traits/`

| Метрика | Значение |
|---------|----------|
| Трейтов | **10** |
| Методов | **56** |
| Сгенерировано | `src/data/traits-map.ts` |

#### Трейты по namespace

| Namespace | Трейтов | Примеры |
|-----------|---------|---------|
| `icms\traits\services` | 4 | `fieldsParseable`, `listgrid` |
| `icms\traits\controllers` | 2 | `oneable`, `eventDispatcher` |
| `icms\traits\core` | 2 | `corePropertyLoadable` |
| `icms\traits\age` | 1 | `age` |

### Примеры кода (get_code_example)

**35+ типовых задач** с примерами кода:

| Категория | Примеры |
|----------|---------|
| CRUD | список с пагинацией, просмотр, добавление, редактирование, удаление |
| AJAX | JSON ответ, AJAX удаление |
| **Кэш** | **set/get/clean, pause/resume, Redis/Memcached, инвалидация, именование ключей** |
| Хуки | создание и вызов своих хуков |
| Права | проверка авторизации, прав доступа |
| RSS | генерация RSS ленты |
| Sitemap | интеграция с sitemap |
| Поиск | индексация в поисковый модуль |
| Теги | работа с системой тегов |
| Рейтинг | интеграция с голосованием |
| Файлы | загрузка изображений |
| SEO | метатеги, OpenGraph |
| Уведомления | email и in-site уведомления |
| Миграции | генерация таблиц |
| Security | XSS, CSRF, SQL injection, RBAC, file upload |

### Поля форм

**Источник:** `source/system/fields/`

| Метрика | Значение |
|---------|----------|
| Типов полей | **31** |
| Системных | **~10** |
| Полей с опциями | **25** (6 наследуют от родителя) |
| Опций с данными | **100%** |
| Сгенерировано | `src/data/fields-map.ts` (~3733 строк) |

#### Структура данных полей

Каждое поле содержит:
- `name` — техническое имя (string, number, list...)
- `className` — PHP класс (fieldString, fieldNumber...)
- `title` — заголовок из LANG_PARSER_*
- `sqlTemplate` — SQL шаблон (varchar({max_length}), DECIMAL...)
- `filterType` — тип фильтра (str, int, date...)
- `filterHint` — подсказка для фильтра
- `varType` — тип переменной (string, integer, array...)
- `allowIndex` — можно ли индексировать
- `nativeTag` — нативный HTML тег
- `dynamicList` — динамическая загрузка списка
- `validationRules[]` — правила валидации
- `methods{}` — какие методы переопределены (parse, store, getInput...)
- `options[]` — массив опций:
  - `name` — имя опции
  - `type` — тип (text, number, boolean, select, multiselect, date...)
  - `description` — описание
  - `default` — значение по умолчанию
  - `required` — обязательная
  - `extended` — расширенная опция
  - `hint` — подсказка
  - `visible_depend` — условия видимости
  - `items` — статические варианты для select

#### Популярные поля

| Тип | SQL | Опций | validationRules |
|-----|-----|-------|-----------------|
| `string` | varchar(255) | 10 | min_length |
| `number` | DECIMAL(9,2) | 20 | digits |
| `list` | int | 10 | array_key |
| `text` | TEXT | 5 | - |
| `html` | TEXT | 10 | - |
| `checkbox` | TINYINT | 1 | - |
| `image` | text | 12 | - |
| `date` | timestamp | 2 | date |

---

## Хуки

**Источник:** `src/data/hooks.ts`

| Метрика | Значение |
|---------|----------|
| Хуков | **102** |
| Категорий | **16** |
| Содержательных примеров | **102** (100%) |

### Категории хуков

| Категория | Хуков |
|-----------|-------|
| engine | 3 |
| content | 24 |
| users | 18 |
| comments | 8 |
| forms | 6 |
| admin | 5 |
| template | 4 |
| search | 4 |
| sitemap | 4 |
| rss | 3 |
| cron | 3 |
| activity | 4 |
| subscriptions | 3 |
| groups | 3 |
| rating | 5 |
| moderation | 6 |

### Примеры хуков

| Хук | Тип | Описание |
|-----|-----|---------|
| `content_after_add_approve` | action | После публикации контента |
| `user_registered` | action | После регистрации |
| `html_filter` | filter | Фильтрация HTML |
| `widget_content_list_before` | filter | Перед списком виджетов |

---

## Компоненты API

**Источник:** `src/data/components.ts`

| Компонент | Методов | Описание |
|-----------|---------|---------|
| `cmsModel` | 50+ | Query builder, CRUD |
| `cmsTemplate` | 30+ | Шаблонизация |
| `cmsRequest` | 15+ | HTTP запросы |
| `cmsCache` | 10+ | Кэширование |
| `cmsEventsManager` | 8+ | События |
| `cmsUser` | 25+ | Пользователи |
| `cmsController` | 20+ | Базовый контроллер |
| `cmsForm` | 15+ | Формы |

---

## Библиотеки (system/libs)

**Источник:** `source/system/libs/`

### Хелперы (функции)

| Модуль | Функций | Описание |
|--------|---------|----------|
| `template.helper` | 28 | HTML-шаблонизация: ссылки, изображения, формы, дата |
| `html.helper` | 30 | HTML утилиты: экранирование, типографика, форматирование |
| `files.helper` | 19 | Файловые операции: копирование, удаление, загрузка |
| `strings.helper` | 43 | Строки: форматирование, даты, URL, SEO |

### Классы

| Класс | Описание |
|-------|----------|
| `Jevix` | XSS-фильтрация и HTML/XML парсер |
| `googleAuthenticator` | Google Authenticator 2FA |
| `Mobile_Detect` | Определение мобильных устройств |
| `lastRSS` | RSS парсер |
| `idna_convert` | IDN Unicode/Punycode конвертация |
| `spyc` | YAML парсер |

### Сторонние библиотеки

| Библиотека | Назначение |
|------------|------------|
| `scssphp` | Компилятор SCSS/SASS |
| `geshi` | Подсветка синтаксиса кода |
| `phpmailer` | Отправка email |

---

## Структура файлов

```
src/
├── server.ts              ← 756 строк, 34 инструмента, 4 ресурса
├── index.ts               ← Точка входа
├── tools/
│   ├── hooks-tool.ts      ← 3 функции
│   ├── addon-tool.ts       ← 5 функций
│   ├── scaffold-tool.ts    ← 2 функции
│   ├── layout-tool.ts     ← 2 функции
│   ├── db-tool.ts         ← 4 функции (статика)
│   ├── controllers-tool.ts ← 4 функции
│   ├── maria-tool.ts      ← 6 функций (MariaDB)
│   ├── source-tool.ts     ← 6 функций
│   ├── mariadb.ts         ← 226 строк, пул соединений
│   └── parser/
│       ├── sql-parser.ts          ← 210 строк
│       ├── events-parser.ts       ← 119 строк
│       ├── controllers-parser.ts  ← 323 строки
│       ├── widgets-parser.ts       ← 179 строк
│       ├── traits-parser.ts       ← 162 строки
│       └── fields-parser.ts        ← 159 строк
 └── data/
    ├── hooks.ts           ← 2017 строк, 102 хука
    ├── components.ts       ← 1438 строк, API компонентов
    ├── schemas.ts          ← 1424 строки, схемы дополнений
    ├── database-schema.ts  ← 4583 строки, 50 таблиц
    ├── events-map.ts       ← 1354 строки, 95 событий
    ├── controllers-map.ts   ← 3377 строк, 61 контроллер
    ├── traits-map.ts       ← 1024 строки, 10 трейтов
    ├── fields-map.ts       ← 1036 строк, 31 поле
    ├── widgets-map.ts      ← 153 строки, 4 виджета
    ├── libs-api.ts        ← ~400 строк, библиотеки
    └── js-api.ts          ← ~190 строк, JS API

source/                    ← Исходный код InstantCMS 2
├── system/
│   ├── controllers/       ← 38 директорий контроллеров
│   ├── core/            ← 40 файлов ядра
│   ├── fields/          ← 31 тип поля
│   ├── traits/          ← 10 трейтов
│   ├── widgets/          ← 4 виджета
│   └── libs/            ← 15 файлов: helpers + classes
└── install/
    └── languages/
        └── ru/sql/
            └── base.sql   ← 1162 строки, схема БД

total source: ~20,500 строк
```

---

## npm скрипты

| Скрипт | Описание |
|--------|---------|
| `npm run build` | Компиляция TypeScript |
| `npm run dev` | Режим разработки (watch) |
| `npm run start` | Запуск сервера |
| `npm run test` | Запуск тестов (46 тестов) |
| `npm run test:coverage` | Запуск тестов с покрытием |
| `npm run parse:database` | Парсинг SQL → database-schema.ts |
| `npm run parse:events` | Парсинг событий → events-map.ts |
| `npm run parse:controllers` | Парсинг контроллеров → controllers-map.ts |
| `npm run parse:widgets` | Парсинг виджетов → widgets-map.ts |
| `npm run parse:traits` | Парсинг трейтов → traits-map.ts |
| `npm run parse:fields` | Парсинг полей → fields-map.ts |
| `npm run parse:all` | Все парсеры |

---

## Переменные окружения (MariaDB)

```bash
DB_HOST=localhost      # Хост базы данных
DB_PORT=3306            # Порт
DB_USER=root            # Пользователь
DB_PASSWORD=            # Пароль
DB_DATABASE=instantcms  # Имя базы
```

---

## Статистика

| Метрика | Значение |
|---------|----------|
| MCP инструментов | **38** |
| MCP ресурсов | **4** |
| Тестов | **71** |
| Строк кода (tools) | **~2,500** |
| Строк кода (data) | **~16,500** |
| Строк кода (parsers) | **~1,500** |
| Строк кода (total) | **~20,500** |
| SQL таблиц | **50** |
| SQL событий | **95** |
| Контроллеров | **61** |
| Экшенов | **107** |
| Виджетов | **4** |
| Трейтов | **10** |
| Методов трейтов | **56** |
| Типов полей | **31** |
| Хуков | **102** |
| Компонентов API | **8** |
| Хелпер-функций | **120** |
| PHP классов | **6** |
| Сторонних библиотек | **3** |

---

## Зависимости
```json
{
  "@modelcontextprotocol/sdk": "^1.27.1",
  "mysql2": "^3.20.0",
  "tsx": "^4.21.0",
  "typescript": "^5.9.3",
  "jest": "^30.3.0",
  "ts-jest": "^29.4.6"
}
```
