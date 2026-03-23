# InstantCMS MCP Server — Статистика

> Автоматически генерируется. Дата: 23.03.2026

---

## MCP Инструменты

**Всего: 51 инструмент** (+6 новых)

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

| # | Инструмент | Описание |
|---|-----------|---------|
| 23 | `maria_execute_query` | SQL запрос |
| 24 | `maria_list_tables` | Список таблиц |
| 25 | `maria_describe_table` | Структура таблицы |
| 26 | `maria_get_database_info` | Статистика БД |
| 27 | `maria_search_tables` | Поиск таблиц |
| 28 | `maria_get_table_data` | Данные с пагинацией |

### Исходный код — парсинг (6)

| # | Инструмент | Описание |
|---|-----------|---------|
| 29 | `list_widgets` | Список виджетов |
| 30 | `get_widget_info` | Детали виджета |
| 31 | `list_traits` | Список трейтов |
| 32 | `get_trait_info` | Методы трейта |
| 33 | `list_field_types` | Типы полей |
| 34 | `get_field_type_info` | Детали поля |

### Миграции — генерация (3)

| # | Инструмент | Описание |
|---|-----------|---------|
| 35 | `generate_migration` | Генерация SQL и install.php |
| 36 | `get_field_suggestions` | Подсказки по полям |
| 42 | `scaffold_migration` | Генерация install.php и uninstall.php файлов |

### Языковые файлы (2)

| # | Инструмент | Описание |
|---|-----------|---------|
| 40 | `list_lang_keys` | Список типовых языковых ключей |
| 41 | `scaffold_lang` | Генерация языкового файла |

### Анализ и AI (3)

| # | Инструмент | Описание |
|---|-----------|---------|
| 37 | `analyze_requirement` | AI анализ запроса → структура дополнения |
| 38 | `suggest_addon_structure` | Структура по типу дополнения |
| 39 | `scaffold_hook` | Генерация PHP файла хука |

### WYSIWYG Редакторы (6)

| # | Инструмент | Описание |
|---|-----------|---------|
| 46 | `list_wysiwyg_editors` | Список редакторов |
| 47 | `get_wysiwyg_editor` | Детали редактора |
| 48 | `get_wysiwyg_options` | Опции редактора |
| 49 | `get_wysiwyg_plugins` | Плагины редактора |
| 50 | `search_wysiwyg_editors` | Поиск редакторов |
| 51 | `get_wysiwyg_buttons` | Кнопки тулбара |

---

## WYSIWYG Редакторы

### Список редакторов

| Имя | Класс | Описание |
|-----|-------|---------|
| `ace` | `cmsWysiwygAce` | Редактор кода с подсветкой синтаксиса, автодополнением, сниппетами |
| `markitup` | `cmsWysiwygMarkitup` | Легковесный редактор разметки BB-code стиля |
| `redactor` | `cmsWysiwygRedactor` | Imperavi Redactor — визуальный WYSIWYG |
| `tinymce` | `cmsWysiwygTinymce` | TinyMCE — мощный редактор с 22+ плагинами |

### Опции по редакторам

#### Ace (редактор кода)

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `theme` | string | `ace/theme/github_light_default` | Тема оформления |
| `mode` | string | `ace/mode/html` | Режим подсветки |
| `fontSize` | number | `14` | Размер шрифта |
| `enableSnippets` | boolean | `true` | Сниппеты |
| `enableEmmet` | boolean | `false` | Emmet |
| `showLineNumbers` | boolean | `true` | Номера строк |

#### Markitup (разметка)

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `buttons` | array | `[0,1,2,3,9,14]` | IDs кнопок |
| `skin` | string | `simple` | Скин оформления |

**Кнопок:** 15 (Bold, Italic, Underline, Strikethrough, UL, OL, Quote, Link, Image URL, Image Upload, YouTube, Facebook, Code, Spoiler, Smiles)

#### Redactor (Imperavi)

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `plugins` | array | `["smiles","spoiler"]` | Плагины |
| `autoresize` | boolean | `true` | Автовысота |
| `minHeight` | number | `200` | Мин. высота |

**Плагины:** clips, fontcolor, fontfamily, fontsize, fullscreen, smiles, spoiler, textdirection
**Кнопок:** 22 (html, undo, redo, bold, italic, deleted, lists, indent, image, video, table, link, alignment...)

#### TinyMCE

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `plugins` | array | `["autoresize"]` | Плагины |
| `skin` | string | `oxide` | Скин |
| `min_height` | number | `350` | Мин. высота |
| `max_height` | number | `700` | Макс. высота |

**Плагины (22):** advlist, anchor, autolink, autoresize, charmap, code, codesample, emoticons, fullscreen, icmsinsertfile, icmsspoiler, image, insertdatetime, link, lists, media, nonbreaking, quickbars, searchreplace, smiles, table, wordcount

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

### Таблицы базы данных

| Метрика | Значение |
|---------|----------|
| Таблиц | **50** |
| Сгенерировано | `src/data/database-schema.ts` |

### События (хуки)

| Метрика | Значение |
|---------|----------|
| Событий | **95** |
| Сгенерировано | `src/data/events-map.ts` |

---

## Данные из исходного кода (Фаза 2)

### Контроллеры

| Метрика | Значение |
|---------|----------|
| Контроллеров | **61** |
| Экшенов | **107** |
| Сгенерировано | `src/data/controllers-map.ts` |

### Виджеты

| Метрика | Значение |
|---------|----------|
| Виджетов | **4** |
| Сгенерировано | `src/data/widgets-map.ts` |

### Трейты

| Метрика | Значение |
|---------|----------|
| Трейтов | **10** |
| Методов | **56** |
| Сгенерировано | `src/data/traits-map.ts` |

### Поля форм

| Метрика | Значение |
|---------|----------|
| Типов полей | **31** |
| Сгенерировано | `src/data/fields-map.ts` |

---

## Хуки

| Метрика | Значение |
|---------|----------|
| Хуков | **102** |
| Категорий | **16** |

---

## Структура файлов

```
src/
├── server.ts              ← 1100+ строк, 44 инструмента, 4 ресурса
├── index.ts               ← Точка входа
├── tools/
│   ├── hooks-tool.ts      ← 3 функции
│   ├── addon-tool.ts      ← 5 функций
│   ├── scaffold-tool.ts   ← 2 функции
│   ├── layout-tool.ts     ← 2 функции
│   ├── db-tool.ts         ← 4 функции (статика)
│   ├── controllers-tool.ts← 4 функции
│   ├── maria-tool.ts      ← 6 функций (MariaDB)
│   ├── source-tool.ts     ← 6 функций
│   ├── wysiwyg-tool.ts    ← 6 функций (NEW)
│   ├── mariadb.ts         ← пул соединений
│   └── parser/
│       ├── sql-parser.ts
│       ├── events-parser.ts
│       ├── controllers-parser.ts
│       ├── widgets-parser.ts
│       ├── traits-parser.ts
│       └── fields-parser.ts
└── data/
    ├── hooks.ts           ← 102 хука
    ├── components.ts      ← API компонентов
    ├── schemas.ts         ← схемы дополнений
    ├── database-schema.ts ← 50 таблиц
    ├── events-map.ts      ← 95 событий
    ├── controllers-map.ts  ← 61 контроллер
    ├── traits-map.ts      ← 10 трейтов
    ├── fields-map.ts      ← 31 поле
    ├── widgets-map.ts     ← 4 виджета
    ├── wysiwyg-map.ts     ← 4 редактора (NEW)
    ├── libs-api.ts
    └── js-api.ts
```

---

## npm скрипты

| Скрипт | Описание |
|--------|----------|
| `npm run build` | Компиляция TypeScript |
| `npm run dev` | Режим разработки (watch) |
| `npm run start` | Запуск сервера |
| `npm run test` | Запуск тестов |
| `npm run test:coverage` | Тесты с покрытием |
| `npm run parse:*` | Парсеры исходного кода |

---

## Статистика

| Метрика | Значение |
|---------|----------|
| MCP инструментов | **51** |
| MCP ресурсов | **4** |
| Тестов | **154** |
| Строк кода (tools) | **~3,000** |
| Строк кода (data) | **~17,000** |
| SQL таблиц | **50** |
| Контроллеров | **61** |
| Экшенов | **107** |
| Виджетов | **4** |
| Трейтов | **10** |
| Типов полей | **31** |
| Хуков | **102** |
| WYSIWYG редакторов | **4** |

---

## Зависимости

```json
{
  "@modelcontextprotocol/sdk": "^1.27.1",
  "mysql2": "^3.20.0",
  "tsx": "^4.21.0",
  "typescript": "^5.9.3",
  "jest": "^30.3.0",
  "ts-jest": "^29.4.6",
  "zod": "^4.3.6"
}
```
