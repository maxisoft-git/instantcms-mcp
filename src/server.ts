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
