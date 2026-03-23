import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { listHooks, getHookDetails, searchHooks } from "./tools/hooks-tool.js";
import {
  getAddonStructure,
  getComponentApi,
  listComponents,
  validateAddon,
  getFieldTypes,
  getCodeExample
} from "./tools/addon-tool.js";
import { scaffoldAddon, scaffoldTemplate } from "./tools/scaffold-tool.js";
import { scaffoldLayoutScheme, listLayoutPresets, layoutPresets } from "./tools/layout-tool.js";
import { introspectDatabase, listContentTypes, listDatabaseEvents, describeTable } from "./tools/db-tool.js";
import { analyzeController, listControllers, getControllerActionsList, listSystemTraits } from "./tools/controllers-tool.js";
import { mariaExecuteQuery, mariaListTables, mariaDescribeTable, mariaGetDatabaseInfo, mariaSearchTables, mariaGetTableData } from "./tools/maria-tool.js";
import { listWidgets, getWidgetInfo, listTraits, getTraitInfo, listFields, getFieldInfo, listRoutes } from "./tools/source-tool.js";
import { generateMigration, generateFieldSuggestions } from "./tools/migration-tool.js";
import { analyzeRequirement, suggestAddonStructure } from "./tools/requirement-tool.js";

import { hooks, hookCategories } from "./data/hooks.js";
import { components } from "./data/components.js";
import { addonStructures, templateStructure } from "./data/schemas.js";

export function createServer(): McpServer {

  const server = new McpServer({
    name: "instantcms-mcp",
    version: "1.0.0",
    description: "MCP сервер для разработки дополнений и шаблонов InstantCMS 2"
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TOOLS
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 1. Структура дополнения ──────────────────────────────────────────────
  server.tool(
    "get_addon_structure",
    "Возвращает полную структуру файлов и папок для дополнения InstantCMS с описанием каждого файла и шаблонами кода",
    {
      addon_type: z.enum(["basic", "with_admin", "with_hooks", "with_routes", "with_widget"])
        .default("basic")
        .describe("Тип дополнения: basic (только фронтенд), with_admin (с CRUD панелью), with_hooks (с хуками), with_routes (кастомные URL), with_widget (с виджетом)")
    },
    async ({ addon_type }) => {
      const result = getAddonStructure(addon_type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 2. Генерация скаффолда дополнения ────────────────────────────────────
  server.tool(
    "scaffold_addon",
    "Генерирует готовый код всех файлов дополнения InstantCMS на основе параметров. Возвращает map {имя_файла: содержимое}",
    {
      name: z.string().describe("Техническое имя дополнения (латинские буквы, цифры, подчёркивание). Пример: my_addon"),
      title: z.string().describe("Отображаемое название дополнения. Пример: Мой каталог"),
      type: z.enum(["basic", "with_admin", "with_hooks", "with_routes", "with_widget"])
        .default("basic")
        .describe("Тип дополнения"),
      author: z.string().optional().describe("Имя автора"),
      author_url: z.string().optional().describe("URL сайта автора"),
      version: z.string().optional().default("1.0.0").describe("Версия дополнения"),
      description: z.string().optional().describe("Описание дополнения"),
      hooks: z.array(z.string()).optional().describe("Список хуков для интеграции. Пример: ['content_after_add_approve', 'user_registered']")
    },
    async (opts) => {
      const result = scaffoldAddon(opts as Parameters<typeof scaffoldAddon>[0]);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 3. Список хуков ──────────────────────────────────────────────────────
  server.tool(
    "list_hooks",
    "Список всех доступных хуков InstantCMS с краткими описаниями. Поддерживает фильтрацию по категории и типу",
    {
      category: z.string().optional()
        .describe(`Фильтр по категории. Доступные: ${hookCategories.join(', ')}`),
      type: z.enum(["filter", "action"]).optional()
        .describe("Тип хука: filter (изменяет данные) или action (реагирует на событие)")
    },
    async ({ category, type }) => {
      const result = listHooks(category, type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 4. Детали хука ───────────────────────────────────────────────────────
  server.tool(
    "get_hook_details",
    "Подробная информация о конкретном хуке: параметры, возвращаемый тип, пример реализации, как зарегистрировать в manifest.xml",
    {
      hook_name: z.string().describe("Имя хука. Пример: content_after_add_approve, user_registered, html_filter")
    },
    async ({ hook_name }) => {
      const result = getHookDetails(hook_name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 5. Поиск хуков ───────────────────────────────────────────────────────
  server.tool(
    "search_hooks",
    "Полнотекстовый поиск хуков по имени, описанию, категории или параметрам",
    {
      query: z.string().describe("Поисковый запрос. Пример: 'после добавления материала', 'profile', 'email'")
    },
    async ({ query }) => {
      const result = searchHooks(query);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 6. API компонента ────────────────────────────────────────────────────
  server.tool(
    "get_component_api",
    "API конкретного класса/компонента InstantCMS: методы, сигнатуры, описания, примеры вызовов",
    {
      component_name: z.string()
        .describe("Имя компонента или класса. Пример: cmsModel, cmsTemplate, cmsRequest, cmsCache, cmsEventsManager")
    },
    async ({ component_name }) => {
      const result = getComponentApi(component_name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 7. Список компонентов ────────────────────────────────────────────────
  server.tool(
    "list_components",
    "Список всех документированных компонентов и классов InstantCMS с кратким описанием и способом доступа",
    {},
    async () => {
      const result = listComponents();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 8. Валидация дополнения ──────────────────────────────────────────────
  server.tool(
    "validate_addon",
    "Валидация структуры дополнения InstantCMS. Проверяет наличие обязательных файлов, правильность классов, соглашения об именовании",
    {
      files: z.record(z.string(), z.string())
        .describe("Map файлов дополнения: {путь_к_файлу: содержимое}. Пример: {'frontend.php': '<?php class myaddon...'}")
    },
    async ({ files }) => {
      const result = validateAddon(files);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 9. Типы полей форм ───────────────────────────────────────────────────
  server.tool(
    "get_field_types",
    "Информация о типах полей для форм InstantCMS (fieldString, fieldList, fieldImage и др.) с примерами использования",
    {
      field_type: z.string().optional()
        .describe("Имя конкретного типа поля для детальной информации. Если не указан — возвращает все типы")
    },
    async ({ field_type }) => {
      const result = getFieldTypes(field_type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 10. Примеры кода ─────────────────────────────────────────────────────
  server.tool(
    "get_code_example",
    "Получить готовый пример кода для типовой задачи в InstantCMS",
    {
      task: z.string()
        .describe("Описание задачи. Пример: 'список с пагинацией', 'обработка AJAX', 'кэширование', 'работа с хуками', 'загрузка файлов'")
    },
    async ({ task }) => {
      const result = getCodeExample(task);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 11. Генерация шаблона ────────────────────────────────────────────────
  server.tool(
    "scaffold_template",
    "Генерирует скаффолд шаблона (темы) для InstantCMS: manifest.php, main.tpl.php, базовые CSS/JS",
    {
      name: z.string().describe("Техническое имя шаблона (латинские буквы). Пример: mytheme"),
      title: z.string().describe("Отображаемое название. Пример: My Beautiful Theme"),
      author: z.string().optional().describe("Имя автора")
    },
    async (opts) => {
      const result = scaffoldTemplate(opts);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 12. Структура шаблона ────────────────────────────────────────────────
  server.tool(
    "get_template_structure",
    "Полная структура шаблона InstantCMS: обязательные и опциональные файлы, переменные доступные в .tpl.php, переопределение шаблонов контроллеров",
    {},
    async () => {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            ...templateStructure,
            available_tpl_variables: {
              "$cms_template": "Экземпляр cmsTemplate — управление выводом",
              "$cms_user": "Текущий пользователь (id, login, is_logged, group_id, ...)",
              "$cms_config": "Конфигурация сайта",
              "Все ключи из render()": "Переменные, переданные из контроллера через render('tpl', ['var' => val])"
            },
            tpl_helpers: {
              "href_to('ctrl', 'action', $params)": "Генерация URL",
              "href_to_admin('ctrl', 'action')": "URL в админку",
              "htmlspecialchars($str)": "Экранирование HTML",
              "LANG_CONST": "Языковые константы",
              "date_format($date)": "Форматирование даты"
            }
          }, null, 2)
        }]
      };
    }
  );

  // ── 13. Генерация схемы виджетов (layout scheme) ─────────────────────────
  server.tool(
    "scaffold_layout_scheme",
    `Генерирует YAML-схему расположения виджетов для импорта в шаблон modern InstantCMS.
Схема описывает ряды (rows) и колонки (cols) Bootstrap 4 сетки с позициями для виджетов.
Результат импортируется через: Панель управления → Оформление → Шаблоны → Modern → Схема → Импорт.
Можно задать произвольную схему через параметр rows, или использовать готовый пресет через preset.`,
    {
      template: z.string().optional().default("modern")
        .describe("Имя шаблона. По умолчанию: modern"),

      preset: z.enum(["simple", "with_sidebar_left", "modern_full"]).optional()
        .describe(`Готовый пресет схемы. Используйте вместо rows для быстрого старта:
  simple          — шапка + контент/сайдбар + подвал
  with_sidebar_left — три колонки: лево/контент/право + двухколоночный футер
  modern_full     — полная схема modern (топ-бар, лого, навбар, баннер, три колонки, префутер, футер)`),

      rows: z.array(z.object({
        title: z.string().describe("Отображаемое название ряда в админке"),
        tag: z.string().nullish().describe("HTML тег Bootstrap row-элемента. null = без тега. Примеры: div, main"),
        parent_col: z.string().optional()
          .describe("position_name колонки-родителя (для вложенных рядов). Ряд будет вложен внутрь этой позиции"),
        nested_position: z.string().optional().default("after")
          .describe("Позиция вложения: 'after' (после виджетов, по умолчанию)"),
        class: z.string().nullish().describe("CSS классы на Bootstrap row-элементе. Bootstrap 4: py-3, mt-auto"),
        outer_tag: z.string().optional()
          .describe("Внешний HTML тег-обёртка вокруг ряда. Примеры: header, footer, section, div, nav"),
        outer_class: z.string().optional().describe("CSS классы внешнего тега"),
        container: z.string().optional()
          .describe("Класс контейнера Bootstrap 4: 'container', 'container-fluid', '' (без контейнера). По умолчанию: 'container'"),
        container_tag: z.string().optional().describe("HTML тег контейнера. По умолчанию: div"),
        container_class: z.string().optional()
          .describe("CSS классы контейнера. Примеры: 'd-flex justify-content-between align-items-center flex-nowrap'"),
        no_gutters: z.boolean().optional().describe("Добавить Bootstrap no-gutters к ряду"),
        cols: z.array(z.object({
          title: z.string().describe("Отображаемое название колонки"),
          position: z.string().optional()
            .describe("Имя позиции для привязки виджетов. Авто-генерируется как pos_N если не задано. Используйте con_* для полноширинных позиций"),
          tag: z.string().optional().describe("HTML тег колонки. По умолчанию: div. Примеры: article, aside, nav"),
          class: z.string().nullish().describe("CSS классы на колонке. Bootstrap 4: mb-3 mb-md-4"),
          type: z.enum(["typical", "custom"]).optional().default("typical")
            .describe("Тип колонки: typical = обычная Bootstrap-колонка, custom = кастомный HTML с {position}"),
          wrapper: z.string().optional()
            .describe("Для type=custom: HTML-обёртка с плейсхолдером {position}. Примеры: '{position}' или '<div class=\"my-wrap\">{position}</div>'"),
          col: z.string().optional()
            .describe("Bootstrap 4 col-класс (xs/default). Примеры: col, col-sm-12, col-sm"),
          col_md: z.string().optional()
            .describe("Bootstrap 4 col-md класс. Примеры: col-md-6, col-md"),
          col_lg: z.string().optional()
            .describe("Bootstrap 4 col-lg класс. Примеры: col-lg-8, col-lg-4, col-lg-3, col-lg"),
          col_xl: z.string().optional()
            .describe("Bootstrap 4 col-xl класс. Примеры: col-xl-2"),
          col_class: z.string().optional()
            .describe("Переопределить все responsive классы одним значением"),
          order: z.number().optional().describe("Bootstrap order (default). 0 = без order"),
          cut_before: z.boolean().optional()
            .describe("Вставить Bootstrap w-100 перед колонкой (принудительный перенос строки)")
        })).describe("Колонки ряда")
      })).optional()
        .describe("Массив рядов схемы. Используйте вместо preset для кастомной схемы")
    },
    async ({ template, preset, rows }) => {
      let input;

      if (preset && !rows) {
        // Use preset
        const p = layoutPresets[preset];
        input = { ...p.scheme, template: template || p.scheme.template };
      } else if (rows) {
        input = { template: template || 'modern', rows };
      } else {
        // Default: list presets
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              error: "Укажите preset или rows",
              available_presets: listLayoutPresets()
            }, null, 2)
          }]
        };
      }

      const result = scaffoldLayoutScheme(input as Parameters<typeof scaffoldLayoutScheme>[0]);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 14. Список пресетов схем виджетов ────────────────────────────────────
  server.tool(
    "list_layout_presets",
    "Список готовых пресетов схем расположения виджетов для шаблона modern InstantCMS. Используйте preset в scaffold_layout_scheme для быстрой генерации.",
    {},
    async () => {
      return {
        content: [{
          type: "text",
          text: JSON.stringify(listLayoutPresets(), null, 2)
        }]
      };
    }
  );

  // ── 15. Анализ структуры базы данных ──────────────────────────────────────
  server.tool(
    "introspect_database",
    "Анализ структуры базы данных InstantCMS. Без параметров — список всех таблиц. С параметром table_name — детали конкретной таблицы.",
    {
      table_name: z.string().optional().describe("Имя таблицы (без префикса cms_). Пример: users, content_types, widgets")
    },
    async ({ table_name }) => {
      const result = introspectDatabase(table_name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 16. Описание конкретной таблицы ──────────────────────────────────────
  server.tool(
    "describe_table",
    "Подробное описание таблицы: поля, индексы, связи, типы данных. Генерирует примеры SQL-запросов.",
    {
      table_name: z.string().describe("Имя таблицы (можно с префиксом cms_ или без). Пример: cms_users, content_types")
    },
    async ({ table_name }) => {
      const result = describeTable(table_name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 17. Типы контента ────────────────────────────────────────────────────
  server.tool(
    "list_content_types",
    "Информация о типах контента: cms_content_types, cms_con_pages, cms_users. Поля, ключи, связи.",
    {},
    async () => {
      const result = listContentTypes();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 18. Карта событий (events) ────────────────────────────────────────────
  server.tool(
    "list_database_events",
    "Все зарегистрированные события (хуки) из таблицы cms_events. Показывает какой контроллер на какое событие подписан.",
    {},
    async () => {
      const result = listDatabaseEvents();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 19. Анализ контроллера ───────────────────────────────────────────────
  server.tool(
    "analyze_controller",
    "Подробная информация о контроллере: класс, наследование, экшены, трейты, файлы.",
    {
      name: z.string().describe("Имя контроллера. Пример: content, users, messages"),
      type: z.enum(["frontend", "backend"]).optional().describe("Тип контроллера")
    },
    async ({ name, type }) => {
      const result = analyzeController(name, type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 20. Список контроллеров ──────────────────────────────────────────────
  server.tool(
    "list_controllers",
    "Список всех контроллеров: frontend и backend. Можно фильтровать по типу.",
    {
      filter: z.enum(["frontend", "backend"]).optional().describe("Фильтр по типу контроллера")
    },
    async ({ filter }) => {
      const result = listControllers(filter);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 21. Экшены контроллера ───────────────────────────────────────────────
  server.tool(
    "get_controller_actions",
    "Список всех экшенов контроллера с параметрами, видимостью и трейтами.",
    {
      name: z.string().describe("Имя контроллера. Пример: content, users"),
      type: z.enum(["frontend", "backend"]).optional().describe("Тип контроллера")
    },
    async ({ name, type }) => {
      const result = getControllerActionsList(name, type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 22. Системные трейты ─────────────────────────────────────────────────
  server.tool(
    "list_system_traits",
    "Список всех системных трейтов icms используемых в контроллерах. Трейты предоставляют готовую функциональность.",
    {},
    async () => {
      const result = listSystemTraits();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // MARIADB TOOLS (Фаза 1: Работа с базой данных)
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Внимание: Для работы требуется настроить переменные окружения:
  // DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE

  // ── 23. Выполнить SQL запрос ─────────────────────────────────────────────
  server.tool(
    "maria_execute_query",
    "Выполняет произвольный SQL запрос к базе данных MariaDB. Возвращает результат с колонками, строками и временем выполнения.",
    {
      sql: z.string().describe("SQL запрос для выполнения. Пример: SELECT * FROM cms_users LIMIT 10")
    },
    async ({ sql }) => {
      const result = await mariaExecuteQuery(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 24. Список таблиц ────────────────────────────────────────────────────
  server.tool(
    "maria_list_tables",
    "Возвращает список всех таблиц в текущей базе данных MariaDB.",
    {},
    async () => {
      const result = await mariaListTables();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 25. Описание таблицы ────────────────────────────────────────────────
  server.tool(
    "maria_describe_table",
    "Подробное описание структуры таблицы: колонки, типы, индексы, количество строк.",
    {
      table_name: z.string().describe("Имя таблицы. Пример: cms_users, cms_content")
    },
    async ({ table_name }) => {
      const result = await mariaDescribeTable(table_name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 26. Информация о базе данных ─────────────────────────────────────────
  server.tool(
    "maria_get_database_info",
    "Статистика базы данных: имя, количество таблиц, строк, размер.",
    {},
    async () => {
      const result = await mariaGetDatabaseInfo();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 27. Поиск таблиц ─────────────────────────────────────────────────────
  server.tool(
    "maria_search_tables",
    "Поиск таблиц по имени. Полезно когда не помните точное имя таблицы.",
    {
      pattern: z.string().describe("Строка для поиска. Пример: users, content, widget")
    },
    async ({ pattern }) => {
      const result = await mariaSearchTables(pattern);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 28. Данные из таблицы ───────────────────────────────────────────────
  server.tool(
    "maria_get_table_data",
    "Получить данные из таблицы с поддержкой пагинации, сортировки и фильтрации.",
    {
      table_name: z.string().describe("Имя таблицы. Пример: cms_users"),
      limit: z.number().optional().default(20).describe("Количество строк (по умолчанию 20)"),
      offset: z.number().optional().default(0).describe("Смещение для пагинации"),
      order_by: z.string().optional().default("id").describe("Поле для сортировки"),
      order_dir: z.enum(["ASC", "DESC"]).optional().default("DESC").describe("Направление сортировки"),
      filter: z.record(z.string(), z.unknown()).optional().describe("Фильтр в формате {поле: значение}")
    },
    async ({ table_name, limit, offset, order_by, order_dir, filter }) => {
      const result = await mariaGetTableData(table_name, { limit, offset, orderBy: order_by, orderDir: order_dir, filter });
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SOURCE CODE TOOLS (Фаза 2: Виджеты, трейты, поля)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── 29. Список виджетов ─────────────────────────────────────────────────
  server.tool(
    "list_widgets",
    "Список всех доступных виджетов InstantCMS. Можно фильтровать по контроллеру.",
    {
      controller: z.string().optional().describe("Фильтр по контроллеру. Пример: content, users")
    },
    async ({ controller }) => {
      const result = listWidgets(controller);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 30. Информация о виджете ────────────────────────────────────────────
  server.tool(
    "get_widget_info",
    "Подробная информация о виджете: класс, файл, настройки.",
    {
      name: z.string().describe("Имя виджета. Пример: text, menu, html")
    },
    async ({ name }) => {
      const result = getWidgetInfo(name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 31. Список трейтов ─────────────────────────────────────────────────
  server.tool(
    "list_traits",
    "Список всех системных трейтов. Можно фильтровать по namespace.",
    {
      namespace: z.string().optional().describe("Фильтр по namespace. Пример: services, controllers")
    },
    async ({ namespace }) => {
      const result = listTraits(namespace);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 32. Информация о трейте ────────────────────────────────────────────
  server.tool(
    "get_trait_info",
    "Подробная информация о трейте: методы, параметры, описание.",
    {
      name: z.string().describe("Имя трейта. Пример: fieldsParseable, listgrid")
    },
    async ({ name }) => {
      const result = getTraitInfo(name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 33. Список типов полей ─────────────────────────────────────────────
  server.tool(
    "list_field_types",
    "Список всех типов полей для форм InstantCMS: string, text, image, list и др.",
    {},
    async () => {
      const result = listFields();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 34. Информация о поле ─────────────────────────────────────────────
  server.tool(
    "get_field_type_info",
    "Подробная информация о типе поля: класс, опции, описание.",
    {
      name: z.string().describe("Имя типа поля. Пример: string, list, image, date")
    },
    async ({ name }) => {
      const result = getFieldInfo(name);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 35. Список маршрутов ───────────────────────────────────────────────
  server.tool(
    "list_routes",
    "Список всех маршрутов (routes) системы. Маршруты определяют URL-паттерны и действия контроллеров.",
    {
      controller: z.string().optional().describe("Имя контроллера для фильтрации (content, photos)")
    },
    async ({ controller }) => {
      const result = listRoutes(controller);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 36. Генерация миграции ────────────────────────────────────────────
  server.tool(
    "generate_migration",
    "Генерация SQL и PHP кода для создания таблицы. Генерирует install.php, SQL CREATE TABLE и соглашения по именованию.",
    {
      name: z.string().describe("Имя таблицы (без префикса cms_). Пример: my_items, catalog_products"),
      fields: z.array(z.object({
        name: z.string().describe("Имя поля"),
        type: z.string().describe("Тип: varchar(255), text, int(11), datetime, tinyint(1), decimal(10,2)"),
        nullable: z.boolean().optional().describe("Может быть NULL"),
        default: z.string().optional().describe("Значение по умолчанию"),
        comment: z.string().optional().describe("Комментарий к полю")
      })).describe("Массив полей таблицы")
    },
    async ({ name, fields }) => {
      const result = generateMigration(name, fields);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 36. Подсказки по полям ────────────────────────────────────────────
  server.tool(
    "get_field_suggestions",
    "Подсказки по типичным полям для генерации миграций: string, text, number, datetime, user, bool.",
    {
      field_type: z.enum(["string", "text", "number", "datetime", "user", "bool"]).describe("Тип категории полей")
    },
    async ({ field_type }) => {
      const result = generateFieldSuggestions(field_type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 37. Анализ требований ──────────────────────────────────────────
  server.tool(
    "analyze_requirement",
    "AI анализ запроса пользователя и предложение структуры дополнения. Определяет тип дополнения, необходимые хуки, таблицы, контроллеры.",
    {
      requirement: z.string().describe("Описание задачи. Пример: 'каталог товаров с корзиной', 'блог с комментариями', 'RSS лента новостей'")
    },
    async ({ requirement }) => {
      const result = analyzeRequirement(requirement);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ── 38. Структура по типу ─────────────────────────────────────────
  server.tool(
    "suggest_addon_structure",
    "Предложить структуру файлов для типа дополнения (basic, with_admin, with_hooks, with_routes, with_widget).",
    {
      type: z.enum(["basic", "with_admin", "with_hooks", "with_routes", "with_widget"]).describe("Тип дополнения")
    },
    async ({ type }) => {
      const result = suggestAddonStructure(type);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RESOURCES (статичные данные для контекста)
  // ═══════════════════════════════════════════════════════════════════════════

  server.resource(
    "instantcms-hooks-all",
    "instantcms://hooks/all",
    { mimeType: "application/json", description: "Полный список хуков InstantCMS" },
    async () => ({
      contents: [{
        uri: "instantcms://hooks/all",
        mimeType: "application/json",
        text: JSON.stringify({ total: hooks.length, categories: hookCategories, hooks }, null, 2)
      }]
    })
  );

  server.resource(
    "instantcms-components-all",
    "instantcms://components/all",
    { mimeType: "application/json", description: "Все компоненты и их API" },
    async () => ({
      contents: [{
        uri: "instantcms://components/all",
        mimeType: "application/json",
        text: JSON.stringify({ total: components.length, components }, null, 2)
      }]
    })
  );

  server.resource(
    "instantcms-addon-types",
    "instantcms://addon/types",
    { mimeType: "application/json", description: "Типы дополнений и их структуры" },
    async () => ({
      contents: [{
        uri: "instantcms://addon/types",
        mimeType: "application/json",
        text: JSON.stringify(addonStructures, null, 2)
      }]
    })
  );

  server.resource(
    "instantcms-quickstart",
    "instantcms://quickstart",
    { mimeType: "text/markdown", description: "Краткое руководство по созданию дополнения" },
    async () => ({
      contents: [{
        uri: "instantcms://quickstart",
        mimeType: "text/markdown",
        text: `# Быстрый старт: создание дополнения InstantCMS 2

## 1. Минимальный набор файлов
\`\`\`
/system/controllers/myaddon/
├── manifest.xml      ← метаданные и хуки
├── install.php       ← создание таблиц
├── uninstall.php     ← удаление таблиц
├── frontend.php      ← контроллер (class myaddon extends cmsFrontend)
└── model.php         ← модель (class modelMyaddon extends cmsModel)
\`\`\`

## 2. Соглашения об именовании классов
| Файл | Класс |
|------|-------|
| frontend.php | \`class myaddon extends cmsFrontend\` |
| backend.php | \`class backendMyaddon extends cmsBackend\` |
| model.php | \`class modelMyaddon extends cmsModel\` |
| hooks/hook_name.php | \`class onMyaddonHookName extends cmsAction\` |
| forms/form_item.php | \`class formMyaddonItem extends cmsForm\` |
| grids/grid_items.php | \`class gridMyaddonItems extends cmsGrid\` |
| widgets/list/widget.php | \`class widgetMyaddonList extends cmsWidget\` |

## 3. Базовый паттерн action
\`\`\`php
public function actionIndex() {
    $items = $this->model->filterEqual('is_pub', 1)->get('myaddon_items');
    return $this->cms_template->render('index', ['items' => $items]);
}
\`\`\`

## 4. Регистрация хука в manifest.xml
\`\`\`xml
<hooks>
    <hook controller="myaddon" name="content_after_add_approve" />
</hooks>
\`\`\`

## 5. Файл хука hooks/content_after_add_approve.php
\`\`\`php
class onMyaddonContentAfterAddApprove extends cmsAction {
    public function run($data) {
        // логика
        return $data; // ОБЯЗАТЕЛЬНО
    }
}
\`\`\`

## Инструменты MCP
- \`scaffold_addon\` — сгенерировать все файлы дополнения
- \`get_hook_details\` — детали хука с примером кода
- \`get_component_api\` — API класса (cmsModel, cmsTemplate и др.)
- \`validate_addon\` — проверить корректность структуры
`
      }]
    })
  );

  return server;
}
