// AUTO-GENERATED from source/system/controllers
// Do not edit manually

export interface RouteRule {
  pattern: string;
  action: string;
  params?: Record<string, any>;
}

export interface ControllerRoute {
  name: string;
  functionName: string;
  filePath: string;
  routes: RouteRule[];
}

export interface RoutesMap {
  controllers: ControllerRoute[];
  routeCount: number;
  generatedAt: string;
}

export const routesMap: RoutesMap = {
  "controllers": [
    {
      "name": "content",
      "functionName": "routes_content",
      "filePath": "/source/system/controllers/content/routes.php",
      "routes": [
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/from_friends$/i",
          "action": "items_from_friends",
          "params": { "1": "ctype_name" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/bind_form\\/([a-z0-9\\-_]+)\\/([0-9]+)$/i",
          "action": "item_bind_form",
          "params": { "1": "ctype_name", "2": "child_ctype_name", "3": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/bind_form\\/([a-z0-9\\-_]+)\\/([0-9]+)\\/(childs|parents|unbind)$/i",
          "action": "item_bind_form",
          "params": { "1": "ctype_name", "2": "child_ctype_name", "3": "id", "4": "mode" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/bind\\/([a-z0-9\\-_]+)$/i",
          "action": "item_bind",
          "params": { "1": "ctype_name", "2": "child_ctype_name" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/unbind\\/([a-z0-9\\-_]+)$/i",
          "action": "item_unbind",
          "params": { "1": "ctype_name", "2": "child_ctype_name" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/bind_list\\/([a-z0-9\\-_]+)\\/([0-9]+)$/i",
          "action": "item_bind_list",
          "params": { "1": "ctype_name", "2": "child_ctype_name", "3": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/bind_list\\/([a-z0-9\\-_]+)$/i",
          "action": "item_bind_list",
          "params": { "1": "ctype_name", "2": "child_ctype_name" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/add\\/([0-9]+)$/i",
          "action": "item_add",
          "params": { "1": "ctype_name", "2": "to_id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/add$/i",
          "action": "item_add",
          "params": { "1": "ctype_name" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/edit\\/([0-9]+)$/i",
          "action": "item_edit",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/owner\\/([0-9]+)$/i",
          "action": "item_owner",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/approve\\/([0-9]+)$/i",
          "action": "item_approve",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/return_for_revision\\/([0-9]+)$/i",
          "action": "item_return_for_revision",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/return\\/([0-9]+)$/i",
          "action": "item_return",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/props\\/([0-9]+)$/i",
          "action": "item_props_fields",
          "params": { "1": "ctype_name", "2": "category_id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/delete\\/([0-9]+)$/i",
          "action": "item_delete",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/trash_put\\/([0-9]+)$/i",
          "action": "item_trash_put",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/trash_remove\\/([0-9]+)$/i",
          "action": "item_trash_remove",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/addcat\\/([0-9]+)$/i",
          "action": "category_add",
          "params": { "1": "ctype_name", "2": "to_id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/addcat$/i",
          "action": "category_add",
          "params": { "1": "ctype_name", "to_id": "0" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/editcat\\/([0-9]+)$/i",
          "action": "category_edit",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/delcat\\/([0-9]+)$/i",
          "action": "category_delete",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/editfolder\\/([0-9]+)$/i",
          "action": "folder_edit",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/delfolder\\/([0-9]+)$/i",
          "action": "folder_delete",
          "params": { "1": "ctype_name", "2": "id" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/([a-z0-9\\-\\/]+).html$/i",
          "action": "item_view",
          "params": { "1": "ctype_name", "2": "slug" }
        },
        {
          "pattern": "/^([a-z0-9\\-\\/]+).html$/i",
          "action": "item_view",
          "params": { "ctype_name": "cmsConfig::get('ctype_default')", "1": "slug" }
        },
        {
          "pattern": "/^([a-z0-9\\-_]+)\\/([a-z0-9\\-\\/]+)\\/view\\-([a-z0-9\\-_]+)\\/?([a-z0-9_]*)$/i",
          "action": "item_view",
          "params": { "1": "ctype_name", "2": "slug", "3": "child_ctype_name", "4": "dataset" }
        },
        {
          "pattern": "/^([a-z0-9\\-\\/]+)\\/view\\-([a-z0-9\\-_]+)\\/?([a-z0-9_]*)$/i",
          "action": "item_view",
          "params": { "ctype_name": "cmsConfig::get('ctype_default')", "1": "slug", "2": "child_ctype_name", "3": "dataset" }
        },
        {
          "pattern": "/^([a-z0-9_]+)\\-([a-z0-9_]+)\\/([a-z0-9\\-\\/]+)$/i",
          "action": "category_view",
          "params": { "1": "ctype_name", "2": "dataset", "3": "slug" }
        },
        {
          "pattern": "/^([a-z0-9_]+)\\/([a-z0-9\\-\\/]+)$/i",
          "action": "category_view",
          "params": { "1": "ctype_name", "2": "slug" }
        },
        {
          "pattern": "/^([a-z0-9_]+)\\-([a-z0-9_]+)$/i",
          "action": "category_view",
          "params": { "1": "ctype_name", "2": "dataset", "slug": "index" }
        },
        {
          "pattern": "/^([a-z0-9_]+)$/i",
          "action": "category_view",
          "params": { "1": "ctype_name", "slug": "index" }
        }
      ]
    },
    {
      "name": "photos",
      "functionName": "routes_photos",
      "filePath": "/source/system/controllers/photos/routes.php",
      "routes": [
        {
          "pattern": "/^photos\\/([a-z0-9\\-\\/]+).html$/i",
          "action": "view",
          "params": { "1": "slug" }
        },
        {
          "pattern": "/^photos\\/camera\\-(.+)$/i",
          "action": "camera",
          "params": { "1": "name" }
        }
      ]
    }
  ],
  "routeCount": 33,
  "generatedAt": "2026-03-21T16:30:00.000Z"
};

export function getRoutesByController(name: string): ControllerRoute | undefined {
  return routesMap.controllers.find(c => c.name === name);
}

export function getAllRoutes(): RouteRule[] {
  return routesMap.controllers.flatMap(c => c.routes);
}
