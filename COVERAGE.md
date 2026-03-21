# InstantCMS MCP Server — Покрытие метрик

> Автоматически генерируется. Дата: 21.03.2026

---

## Сводная таблица покрытия

| Метрика | Всего | Покрыто | % | Примеры |
|---------|-------|---------|---|---------|
| **MCP Инструменты** | 38 | 38 | 100% | `list_hooks`, `scaffold_addon`, `generate_migration` |
| **MCP Resources** | 4 | 4 | 100% | `instantcms://hooks/all`, `instantcms://quickstart` |
| **Примеры кода** | 35+ | 35+ | **100%** | CRUD, AJAX, RSS, sitemap, поиск, теги, рейтинг, Security, Кэш |
| **Хуки** | 102 | 102 | **100%** | Все хуки имеют содержательный пример |
| **Хук-категории** | 17 | 17 | 100% | content, users, engine, comments, groups |
| **События (events)** | 170 | 170 | **100%** | Все события привязаны к listener-контроллерам |
| **Таблицы БД** | 50 | 50 | **100%** | cms_users, cms_content_types, cms_controllers |
| **Контроллеры** | 63 | 63 | **100%** | 809 экшенов |
| **Классы ядра** | 38 | 38 | **100%** | cmsModel, cmsTemplate, cmsDatabase |
| **Виджеты** | 12 | 12 | **100%** | text, menu, html, template |
| **Трейты** | 20 | 20 | **100%** | fieldsParseable, listgrid, oneable |
| **Типы полей** | 32 | 32 | **100%** | string, number, list, text, html, image |
| **Хелпер-функции** | 120 | 120 | **100%** | template, html, files, strings |
| **PHP классы** | 6 | 6 | **100%** | Jevix, googleAuth, mobileDetect, lastRSS, idna, spyc |
| **Сторонние библиотеки** | 3 | 3 | **100%** | scssphp, geshi, phpmailer |

---

## Детализация по метрикам

### Хуки (102 хуков, 17 категорий)

| Категория | Кол-во | Пример |
|-----------|--------|--------|
| content | 24 | `content_after_add_approve`, `content_before_delete` |
| users | 18 | `user_registered`, `users_add_friendship` |
| engine | 3 | `engine_start`, `engine_stop` |
| comments | 9 | `comments_after_add`, `comments_rate_after` |
| groups | 7 | `groups_after_join`, `groups_before_leave` |
| template | 6 | `frontpage_action_index`, `html_filter` |
| admin | 5 | `admin_action_index`, `menu_admin` |
| activity | 4 | `activity_after_add`, `wall_after_add` |
| forms | 3 | `forms_before_validate`, `forms_after_validate` |
| cron | 3 | `cron_run`, `publish_delayed_content` |
| subscriptions | 3 | `subscribe`, `unsubscribe` |
| sitemap | 2 | `sitemap_sources`, `sitemap_urls` |
| controllers | 2 | `controller_loaded` |
| search | 1 | `fulltext_search` |
| rss | 1 | `rss_feed_item` |
| rating | 1 | `rating_vote` |
| moderation | 1 | `moderation_list` |

### События БД (170 событий)

```
████████████████ 100%
```

Все события из `cms_events` привязаны к контроллерам.

### Таблицы БД (50 таблиц, 50 с описанием)

```
████████████████ 100%
```

### Контроллеры (63/63 — 100%)

```
████████████████ 100%
```

**Всего:** 63 controller entries, **809 actions**

### Классы ядра (38 классов — 100%)

```
████████████████ 100%
```

| Класс | Методов | Файл |
|-------|---------|------|
| cmsModel | 154 | model.php |
| cmsTemplate | 163 | template.php |
| cmsDatabase | 64 | database.php |
| cmsController | 73 | controller.php |
| cmsForm | 46 | form.php |
| cmsRequest | 34 | request.php |

### Хелпер-функции (120 функций — 100%)

```
████████████████ 100%
```

| Модуль | Функций | Описание |
|--------|---------|----------|
| template.helper | 28 | HTML-шаблонизация |
| html.helper | 30 | Экранирование, типографика |
| files.helper | 19 | Файловые операции |
| strings.helper | 43 | Строки, даты, URL, SEO |

### PHP классы (6 классов — 100%)

```
████████████████ 100%
```

| Класс | Описание |
|-------|----------|
| Jevix | XSS-фильтрация и HTML/XML парсер |
| googleAuthenticator | Google Authenticator 2FA |
| Mobile_Detect | Определение мобильных устройств |
| lastRSS | RSS парсер |
| idna_convert | IDN Unicode/Punycode конвертация |
| spyc | YAML парсер |

### Виджеты (12/12 — 100%)

```
████████████████ 100%
```

| Виджет | Описание |
|--------|---------|
| text | Текстовый блок |
| menu | Меню |
| html | HTML блок |
| template | Элементы шаблона |

### Трейты (20/20 — 100%)

```
████████████████ 100%
```

| Трейт | Пример метода |
|-------|--------------|
| fieldsParseable | `parseFields()` |
| listgrid | `getListGrid()` |
| oneable | `premoderation()` |

### Типы полей (32/32 — 100%)

```
████████████████ 100%
```

| Тип | SQL шаблон | Filter |
|-----|------------|--------|
| string | varchar({max_length}) | str |
| number | DECIMAL({m},{d}) | int |
| list | int | int |
| text | TEXT | str |
| html | TEXT | str |
| checkbox | TINYINT | int |
| date | timestamp | date |
| image | text | str |
| file | varchar(255) | str |
| url | varchar(255) | str |
| email | varchar(255) | str |

---

## Итоговая статистика

| Категория | Всего | Покрыто | % |
|-----------|-------|---------|---|
| Инструменты и ресурсы | 42 | 42 | 100% |
| Хуки и события | 272 | 272 | 100% |
| Структуры данных | 355 | 355 | 100% |
| **ИТОГО** | **669** | **669** | **100%** |
