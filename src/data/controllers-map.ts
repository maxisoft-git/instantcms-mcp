// AUTO-GENERATED from source/system/controllers
// Do not edit manually - run 'npm run parse:controllers' to regenerate

export interface ControllerAction {
  name: string;
  className: string;
  filePath: string;
  visibility: 'public' | 'private' | 'protected';
  hasParams: boolean;
  params: string[];
  traits: string[];
  description?: string;
}

export interface ControllerInfo {
  name: string;
  className: string;
  type: 'frontend' | 'backend';
  extends: string;
  filePath: string;
  actions: ControllerAction[];
  hasBackendFolder: boolean;
  hasModel: boolean;
  modelFile?: string;
}

export interface ControllersMap {
  controllers: ControllerInfo[];
  byName: Record<string, ControllerInfo>;
  controllerCount: number;
  generatedAt: string;
}

export const controllersMap: ControllersMap = {
  "controllers": [
    {
      "name": "activity",
      "className": "activity",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/activity/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionActivityDelete",
          "filePath": "/source/system/controllers/activity/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionActivityIndex",
          "filePath": "/source/system/controllers/activity/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "activity",
      "className": "backendActivity",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/activity/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "admin",
      "className": "admin",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/admin/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "admin",
      "className": "backendAdmin",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/admin/backend.php",
      "actions": [
        {
          "name": "actionAddonsList",
          "className": "actionAdminAddonsList",
          "filePath": "/source/system/controllers/admin/actions/addons_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCacheDelete",
          "className": "actionAdminCacheDelete",
          "filePath": "/source/system/controllers/admin/actions/cache_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCheckFtp",
          "className": "actionAdminCheckFtp",
          "filePath": "/source/system/controllers/admin/actions/check_ftp.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionClearCache",
          "className": "actionAdminClearCache",
          "filePath": "/source/system/controllers/admin/actions/clear_cache.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmLogin",
          "className": "actionAdminConfirmLogin",
          "filePath": "/source/system/controllers/admin/actions/confirm_login.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContent",
          "className": "actionAdminContent",
          "filePath": "/source/system/controllers/admin/actions/content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsAdd",
          "className": "actionAdminContentCatsAdd",
          "filePath": "/source/system/controllers/admin/actions/content_cats_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsDelete",
          "className": "actionAdminContentCatsDelete",
          "filePath": "/source/system/controllers/admin/actions/content_cats_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsEdit",
          "className": "actionAdminContentCatsEdit",
          "filePath": "/source/system/controllers/admin/actions/content_cats_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsOrder",
          "className": "actionAdminContentCatsOrder",
          "filePath": "/source/system/controllers/admin/actions/content_cats_order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentFilter",
          "className": "actionAdminContentFilter",
          "filePath": "/source/system/controllers/admin/actions/content_filter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemAdd",
          "className": "actionAdminContentItemAdd",
          "filePath": "/source/system/controllers/admin/actions/content_item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemDelete",
          "className": "actionAdminContentItemDelete",
          "filePath": "/source/system/controllers/admin/actions/content_item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemEdit",
          "className": "actionAdminContentItemEdit",
          "filePath": "/source/system/controllers/admin/actions/content_item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemMove",
          "className": "actionAdminContentItemMove",
          "filePath": "/source/system/controllers/admin/actions/content_item_move.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemToggle",
          "className": "actionAdminContentItemToggle",
          "filePath": "/source/system/controllers/admin/actions/content_item_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemTrashPut",
          "className": "actionAdminContentItemTrashPut",
          "filePath": "/source/system/controllers/admin/actions/content_item_trash_put.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemsEdit",
          "className": "actionAdminContentItemsEdit",
          "filePath": "/source/system/controllers/admin/actions/content_items_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentTreeAjax",
          "className": "actionAdminContentTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/content_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllers",
          "className": "actionAdminControllers",
          "filePath": "/source/system/controllers/admin/actions/controllers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersDelete",
          "className": "actionAdminControllersDelete",
          "filePath": "/source/system/controllers/admin/actions/controllers_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEdit",
          "className": "actionAdminControllersEdit",
          "filePath": "/source/system/controllers/admin/actions/controllers_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEvents",
          "className": "actionAdminControllersEvents",
          "filePath": "/source/system/controllers/admin/actions/controllers_events.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsReorder",
          "className": "actionAdminControllersEventsReorder",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsToggle",
          "className": "actionAdminControllersEventsToggle",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsUpdate",
          "className": "actionAdminControllersEventsUpdate",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersToggle",
          "className": "actionAdminControllersToggle",
          "filePath": "/source/system/controllers/admin/actions/controllers_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCredits",
          "className": "actionAdminCredits",
          "filePath": "/source/system/controllers/admin/actions/credits.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypes",
          "className": "actionAdminCtypes",
          "filePath": "/source/system/controllers/admin/actions/ctypes.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesAdd",
          "className": "actionAdminCtypesAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasets",
          "className": "actionAdminCtypesDatasets",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsAdd",
          "className": "actionAdminCtypesDatasetsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsDelete",
          "className": "actionAdminCtypesDatasetsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsEdit",
          "className": "actionAdminCtypesDatasetsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDelete",
          "className": "actionAdminCtypesDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesEdit",
          "className": "actionAdminCtypesEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldStringAjax",
          "className": "actionAdminCtypesFieldStringAjax",
          "filePath": "/source/system/controllers/admin/actions/ctypes_field_string_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFields",
          "className": "actionAdminCtypesFields",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsAdd",
          "className": "actionAdminCtypesFieldsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\controllers\\actions\\formFieldItem"
          ]
        },
        {
          "name": "actionCtypesFieldsDelete",
          "className": "actionAdminCtypesFieldsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsEdit",
          "className": "actionAdminCtypesFieldsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsOptions",
          "className": "actionAdminCtypesFieldsOptions",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_options.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsReorder",
          "className": "actionAdminCtypesFieldsReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsToggle",
          "className": "actionAdminCtypesFieldsToggle",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFilters",
          "className": "actionAdminCtypesFilters",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersAdd",
          "className": "actionAdminCtypesFiltersAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersDelete",
          "className": "actionAdminCtypesFiltersDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersEnable",
          "className": "actionAdminCtypesFiltersEnable",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_enable.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesLabels",
          "className": "actionAdminCtypesLabels",
          "filePath": "/source/system/controllers/admin/actions/ctypes_labels.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesModerators",
          "className": "actionAdminCtypesModerators",
          "filePath": "/source/system/controllers/admin/actions/ctypes_moderators.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPerms",
          "className": "actionAdminCtypesPerms",
          "filePath": "/source/system/controllers/admin/actions/ctypes_perms.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPermsSave",
          "className": "actionAdminCtypesPermsSave",
          "filePath": "/source/system/controllers/admin/actions/ctypes_perms_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesProps",
          "className": "actionAdminCtypesProps",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsAdd",
          "className": "actionAdminCtypesPropsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsBind",
          "className": "actionAdminCtypesPropsBind",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_bind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsDelete",
          "className": "actionAdminCtypesPropsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsEdit",
          "className": "actionAdminCtypesPropsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsReorder",
          "className": "actionAdminCtypesPropsReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsToggle",
          "className": "actionAdminCtypesPropsToggle",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsUnbind",
          "className": "actionAdminCtypesPropsUnbind",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelations",
          "className": "actionAdminCtypesRelations",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsAdd",
          "className": "actionAdminCtypesRelationsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsDelete",
          "className": "actionAdminCtypesRelationsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsEdit",
          "className": "actionAdminCtypesRelationsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesReorder",
          "className": "actionAdminCtypesReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGetTableList",
          "className": "actionAdminGetTableList",
          "filePath": "/source/system/controllers/admin/actions/get_table_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionAdminIndex",
          "filePath": "/source/system/controllers/admin/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexChartData",
          "className": "actionAdminIndexChartData",
          "filePath": "/source/system/controllers/admin/actions/index_chart_data.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexPageSettings",
          "className": "actionAdminIndexPageSettings",
          "filePath": "/source/system/controllers/admin/actions/index_page_settings.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexSaveOrder",
          "className": "actionAdminIndexSaveOrder",
          "filePath": "/source/system/controllers/admin/actions/index_save_order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInlineSave",
          "className": "actionAdminInlineSave",
          "filePath": "/source/system/controllers/admin/actions/inline_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstall",
          "className": "actionAdminInstall",
          "filePath": "/source/system/controllers/admin/actions/install.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstallFinish",
          "className": "actionAdminInstallFinish",
          "filePath": "/source/system/controllers/admin/actions/install_finish.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstallFtp",
          "className": "actionAdminInstallFtp",
          "filePath": "/source/system/controllers/admin/actions/install_ftp.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLoadIcmsNews",
          "className": "actionAdminLoadIcmsNews",
          "filePath": "/source/system/controllers/admin/actions/load_icms_news.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLoadIcmsSponsorship",
          "className": "actionAdminLoadIcmsSponsorship",
          "filePath": "/source/system/controllers/admin/actions/load_icms_sponsorship.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenu",
          "className": "actionAdminMenu",
          "filePath": "/source/system/controllers/admin/actions/menu.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuAdd",
          "className": "actionAdminMenuAdd",
          "filePath": "/source/system/controllers/admin/actions/menu_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuDelete",
          "className": "actionAdminMenuDelete",
          "filePath": "/source/system/controllers/admin/actions/menu_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuEdit",
          "className": "actionAdminMenuEdit",
          "filePath": "/source/system/controllers/admin/actions/menu_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemAdd",
          "className": "actionAdminMenuItemAdd",
          "filePath": "/source/system/controllers/admin/actions/menu_item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemDelete",
          "className": "actionAdminMenuItemDelete",
          "filePath": "/source/system/controllers/admin/actions/menu_item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemEdit",
          "className": "actionAdminMenuItemEdit",
          "filePath": "/source/system/controllers/admin/actions/menu_item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemMove",
          "className": "actionAdminMenuItemMove",
          "filePath": "/source/system/controllers/admin/actions/menu_item_move.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuTreeAjax",
          "className": "actionAdminMenuTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/menu_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMessagesNotices",
          "className": "actionAdminMessagesNotices",
          "filePath": "/source/system/controllers/admin/actions/messages_notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPackageFilesList",
          "className": "actionAdminPackageFilesList",
          "filePath": "/source/system/controllers/admin/actions/package_files_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionReorder",
          "className": "actionAdminReorder",
          "filePath": "/source/system/controllers/admin/actions/reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettings",
          "className": "actionAdminSettings",
          "filePath": "/source/system/controllers/admin/actions/settings.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsCheckNested",
          "className": "actionAdminSettingsCheckNested",
          "filePath": "/source/system/controllers/admin/actions/settings_check_nested.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsMailCheck",
          "className": "actionAdminSettingsMailCheck",
          "filePath": "/source/system/controllers/admin/actions/settings_mail_check.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsMime",
          "className": "actionAdminSettingsMime",
          "filePath": "/source/system/controllers/admin/actions/settings_mime.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsScheduler",
          "className": "actionAdminSettingsScheduler",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerAdd",
          "className": "actionAdminSettingsSchedulerAdd",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerDelete",
          "className": "actionAdminSettingsSchedulerDelete",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\controllers\\actions\\deleteItem"
          ]
        },
        {
          "name": "actionSettingsSchedulerEdit",
          "className": "actionAdminSettingsSchedulerEdit",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerRun",
          "className": "actionAdminSettingsSchedulerRun",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_run.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSiteon",
          "className": "actionAdminSettingsSiteon",
          "filePath": "/source/system/controllers/admin/actions/settings_siteon.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSwitchTemplate",
          "className": "actionAdminSettingsSwitchTemplate",
          "filePath": "/source/system/controllers/admin/actions/settings_switch_template.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSysInfo",
          "className": "actionAdminSettingsSysInfo",
          "filePath": "/source/system/controllers/admin/actions/settings_sys_info.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsTheme",
          "className": "actionAdminSettingsTheme",
          "filePath": "/source/system/controllers/admin/actions/settings_theme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsThemeIconList",
          "className": "actionAdminSettingsThemeIconList",
          "filePath": "/source/system/controllers/admin/actions/settings_theme_icon_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionToggleItem",
          "className": "actionAdminToggleItem",
          "filePath": "/source/system/controllers/admin/actions/toggle_item.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpdate",
          "className": "actionAdminUpdate",
          "filePath": "/source/system/controllers/admin/actions/update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpdateInstall",
          "className": "actionAdminUpdateInstall",
          "filePath": "/source/system/controllers/admin/actions/update_install.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsers",
          "className": "actionAdminUsers",
          "filePath": "/source/system/controllers/admin/actions/users.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersAdd",
          "className": "actionAdminUsersAdd",
          "filePath": "/source/system/controllers/admin/actions/users_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersAutocomplete",
          "className": "actionAdminUsersAutocomplete",
          "filePath": "/source/system/controllers/admin/actions/users_autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersDelete",
          "className": "actionAdminUsersDelete",
          "filePath": "/source/system/controllers/admin/actions/users_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersDeleteList",
          "className": "actionAdminUsersDeleteList",
          "filePath": "/source/system/controllers/admin/actions/users_delete_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersEdit",
          "className": "actionAdminUsersEdit",
          "filePath": "/source/system/controllers/admin/actions/users_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersFilter",
          "className": "actionAdminUsersFilter",
          "filePath": "/source/system/controllers/admin/actions/users_filter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupAdd",
          "className": "actionAdminUsersGroupAdd",
          "filePath": "/source/system/controllers/admin/actions/users_group_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupDelete",
          "className": "actionAdminUsersGroupDelete",
          "filePath": "/source/system/controllers/admin/actions/users_group_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupEdit",
          "className": "actionAdminUsersGroupEdit",
          "filePath": "/source/system/controllers/admin/actions/users_group_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupPerms",
          "className": "actionAdminUsersGroupPerms",
          "filePath": "/source/system/controllers/admin/actions/users_group_perms.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupPermsSave",
          "className": "actionAdminUsersGroupPermsSave",
          "filePath": "/source/system/controllers/admin/actions/users_group_perms_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupReorder",
          "className": "actionAdminUsersGroupReorder",
          "filePath": "/source/system/controllers/admin/actions/users_group_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgets",
          "className": "actionAdminWidgets",
          "filePath": "/source/system/controllers/admin/actions/widgets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsAdd",
          "className": "actionAdminWidgetsAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColAdd",
          "className": "actionAdminWidgetsColAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColDelete",
          "className": "actionAdminWidgetsColDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColEdit",
          "className": "actionAdminWidgetsColEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsCopy",
          "className": "actionAdminWidgetsCopy",
          "filePath": "/source/system/controllers/admin/actions/widgets_copy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsDelete",
          "className": "actionAdminWidgetsDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsEdit",
          "className": "actionAdminWidgetsEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsExportScheme",
          "className": "actionAdminWidgetsExportScheme",
          "filePath": "/source/system/controllers/admin/actions/widgets_export_scheme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsImportScheme",
          "className": "actionAdminWidgetsImportScheme",
          "filePath": "/source/system/controllers/admin/actions/widgets_import_scheme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsLoad",
          "className": "actionAdminWidgetsLoad",
          "filePath": "/source/system/controllers/admin/actions/widgets_load.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageAdd",
          "className": "actionAdminWidgetsPageAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageAutocomplete",
          "className": "actionAdminWidgetsPageAutocomplete",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageContentCats",
          "className": "actionAdminWidgetsPageContentCats",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_content_cats.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageDelete",
          "className": "actionAdminWidgetsPageDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageEdit",
          "className": "actionAdminWidgetsPageEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRemove",
          "className": "actionAdminWidgetsRemove",
          "filePath": "/source/system/controllers/admin/actions/widgets_remove.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsReorder",
          "className": "actionAdminWidgetsReorder",
          "filePath": "/source/system/controllers/admin/actions/widgets_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowAdd",
          "className": "actionAdminWidgetsRowAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowAddNs",
          "className": "actionAdminWidgetsRowAddNs",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_add_ns.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowDelete",
          "className": "actionAdminWidgetsRowDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowEdit",
          "className": "actionAdminWidgetsRowEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsToggle",
          "className": "actionAdminWidgetsToggle",
          "filePath": "/source/system/controllers/admin/actions/widgets_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsTreeAjax",
          "className": "actionAdminWidgetsTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/widgets_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsUnbindAllWidgets",
          "className": "actionAdminWidgetsUnbindAllWidgets",
          "filePath": "/source/system/controllers/admin/actions/widgets_unbind_all_widgets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsUpdate",
          "className": "actionAdminWidgetsUpdate",
          "filePath": "/source/system/controllers/admin/actions/widgets_update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "auth",
      "className": "auth",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/auth/frontend.php",
      "actions": [
        {
          "name": "actionLogout",
          "className": "auth",
          "filePath": "/source/system/controllers/auth/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionAuthIndex",
          "filePath": "/source/system/controllers/auth/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLogin",
          "className": "actionAuthLogin",
          "filePath": "/source/system/controllers/auth/actions/login.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRegister",
          "className": "actionAuthRegister",
          "filePath": "/source/system/controllers/auth/actions/register.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionReset",
          "className": "actionAuthReset",
          "filePath": "/source/system/controllers/auth/actions/reset.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRestore",
          "className": "actionAuthRestore",
          "filePath": "/source/system/controllers/auth/actions/restore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionResubmit",
          "className": "actionAuthResubmit",
          "filePath": "/source/system/controllers/auth/actions/resubmit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionVerify",
          "className": "actionAuthVerify",
          "filePath": "/source/system/controllers/auth/actions/verify.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actiongaLogin2fa",
          "className": "actionAuthgaLogin2fa",
          "filePath": "/source/system/controllers/authga/actions/login_2fa.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "auth",
      "className": "backendAuth",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/auth/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "authga",
      "className": "authga",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/authga/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "billing",
      "className": "billing",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/billing/frontend.php",
      "actions": [
        {
          "name": "actionAddBalance",
          "className": "actionBillingAddBalance",
          "filePath": "/source/system/controllers/billing/actions/add_balance.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionBuy",
          "className": "actionBillingBuy",
          "filePath": "/source/system/controllers/billing/actions/buy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCancel",
          "className": "actionBillingCancel",
          "filePath": "/source/system/controllers/billing/actions/cancel.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmOut",
          "className": "actionBillingConfirmOut",
          "filePath": "/source/system/controllers/billing/actions/confirm_out.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmTf",
          "className": "actionBillingConfirmTf",
          "filePath": "/source/system/controllers/billing/actions/confirm_tf.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeposit",
          "className": "actionBillingDeposit",
          "filePath": "/source/system/controllers/billing/actions/deposit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionExchange",
          "className": "actionBillingExchange",
          "filePath": "/source/system/controllers/billing/actions/exchange.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFail",
          "className": "actionBillingFail",
          "filePath": "/source/system/controllers/billing/actions/fail.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOrder",
          "className": "actionBillingOrder",
          "filePath": "/source/system/controllers/billing/actions/order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOut",
          "className": "actionBillingOut",
          "filePath": "/source/system/controllers/billing/actions/out.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOutDelete",
          "className": "actionBillingOutDelete",
          "filePath": "/source/system/controllers/billing/actions/out_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOutDone",
          "className": "actionBillingOutDone",
          "filePath": "/source/system/controllers/billing/actions/out_done.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPaypal",
          "className": "actionBillingPaypal",
          "filePath": "/source/system/controllers/billing/actions/paypal.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPlan",
          "className": "actionBillingPlan",
          "filePath": "/source/system/controllers/billing/actions/plan.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPrepare",
          "className": "actionBillingPrepare",
          "filePath": "/source/system/controllers/billing/actions/prepare.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProcess",
          "className": "actionBillingProcess",
          "filePath": "/source/system/controllers/billing/actions/process.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefs",
          "className": "actionBillingRefs",
          "filePath": "/source/system/controllers/billing/actions/refs.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionStatusPoll",
          "className": "actionBillingStatusPoll",
          "filePath": "/source/system/controllers/billing/actions/status_poll.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSuccess",
          "className": "actionBillingSuccess",
          "filePath": "/source/system/controllers/billing/actions/success.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTransfer",
          "className": "actionBillingTransfer",
          "filePath": "/source/system/controllers/billing/actions/transfer.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    {
      "name": "billing",
      "className": "backendBilling",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/billing/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    {
      "name": "bootstrap4",
      "className": "bootstrap4",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/bootstrap4/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "comments",
      "className": "comments",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/comments/frontend.php",
      "actions": [
        {
          "name": "actionApprove",
          "className": "actionCommentsApprove",
          "filePath": "/source/system/controllers/comments/actions/approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionCommentsDelete",
          "filePath": "/source/system/controllers/comments/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGet",
          "className": "actionCommentsGet",
          "filePath": "/source/system/controllers/comments/actions/get.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionCommentsIndex",
          "filePath": "/source/system/controllers/comments/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRate",
          "className": "actionCommentsRate",
          "filePath": "/source/system/controllers/comments/actions/rate.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefresh",
          "className": "actionCommentsRefresh",
          "filePath": "/source/system/controllers/comments/actions/refresh.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubmit",
          "className": "actionCommentsSubmit",
          "filePath": "/source/system/controllers/comments/actions/submit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrack",
          "className": "actionCommentsTrack",
          "filePath": "/source/system/controllers/comments/actions/track.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrackStop",
          "className": "actionCommentsTrackStop",
          "filePath": "/source/system/controllers/comments/actions/track_stop.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "comments",
      "className": "backendComments",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/comments/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "content",
      "className": "content",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/content/frontend.php",
      "actions": [
        {
          "name": "actionCategoryAdd",
          "className": "actionContentCategoryAdd",
          "filePath": "/source/system/controllers/content/actions/category_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryDelete",
          "className": "actionContentCategoryDelete",
          "filePath": "/source/system/controllers/content/actions/category_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryEdit",
          "className": "actionContentCategoryEdit",
          "filePath": "/source/system/controllers/content/actions/category_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryView",
          "className": "actionContentCategoryView",
          "filePath": "/source/system/controllers/content/actions/category_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFolderDelete",
          "className": "actionContentFolderDelete",
          "filePath": "/source/system/controllers/content/actions/folder_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFolderEdit",
          "className": "actionContentFolderEdit",
          "filePath": "/source/system/controllers/content/actions/folder_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemAdd",
          "className": "actionContentItemAdd",
          "filePath": "/source/system/controllers/content/actions/item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemApprove",
          "className": "actionContentItemApprove",
          "filePath": "/source/system/controllers/content/actions/item_approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBind",
          "className": "actionContentItemBind",
          "filePath": "/source/system/controllers/content/actions/item_bind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBindForm",
          "className": "actionContentItemBindForm",
          "filePath": "/source/system/controllers/content/actions/item_bind_form.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBindList",
          "className": "actionContentItemBindList",
          "filePath": "/source/system/controllers/content/actions/item_bind_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionContentItemChildsView",
          "filePath": "/source/system/controllers/content/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemDelete",
          "className": "actionContentItemDelete",
          "filePath": "/source/system/controllers/content/actions/item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemEdit",
          "className": "actionContentItemEdit",
          "filePath": "/source/system/controllers/content/actions/item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemOwner",
          "className": "actionContentItemOwner",
          "filePath": "/source/system/controllers/content/actions/item_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemOwnerProcess",
          "className": "actionContentItemOwnerProcess",
          "filePath": "/source/system/controllers/content/actions/item_owner_process.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemPropsFields",
          "className": "actionContentItemPropsFields",
          "filePath": "/source/system/controllers/content/actions/item_props_fields.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemReturn",
          "className": "actionContentItemReturn",
          "filePath": "/source/system/controllers/content/actions/item_return.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemReturnForRevision",
          "className": "actionContentItemReturnForRevision",
          "filePath": "/source/system/controllers/content/actions/item_return_for_revision.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemTrashPut",
          "className": "actionContentItemTrashPut",
          "filePath": "/source/system/controllers/content/actions/item_trash_put.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemTrashRemove",
          "className": "actionContentItemTrashRemove",
          "filePath": "/source/system/controllers/content/actions/item_trash_remove.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemUnbind",
          "className": "actionContentItemUnbind",
          "filePath": "/source/system/controllers/content/actions/item_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemView",
          "className": "actionContentItemView",
          "filePath": "/source/system/controllers/content/actions/item_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionItemsFromFriends",
          "className": "actionContentItemsFromFriends",
          "filePath": "/source/system/controllers/content/actions/items_from_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrash",
          "className": "actionContentTrash",
          "filePath": "/source/system/controllers/content/actions/trash.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetCatsAjax",
          "className": "actionContentWidgetCatsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_cats_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetCatsPresetsAjax",
          "className": "actionContentWidgetCatsPresetsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_cats_presets_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetDatasetsAjax",
          "className": "actionContentWidgetDatasetsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_datasets_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFieldsAjax",
          "className": "actionContentWidgetFieldsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_fields_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFieldsOptionsAjax",
          "className": "actionContentWidgetFieldsOptionsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_fields_options_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFiltersAjax",
          "className": "actionContentWidgetFiltersAjax",
          "filePath": "/source/system/controllers/content/actions/widget_filters_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetRelationsAjax",
          "className": "actionContentWidgetRelationsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_relations_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    {
      "name": "csp",
      "className": "csp",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/csp/frontend.php",
      "actions": [
        {
          "name": "actionReport",
          "className": "actionCspReport",
          "filePath": "/source/system/controllers/csp/actions/report.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "csp",
      "className": "backendCsp",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/csp/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "error404",
      "className": "error404",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/error404/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "error404",
          "filePath": "/source/system/controllers/error404/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "files",
      "className": "files",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/files/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionFilesDelete",
          "filePath": "/source/system/controllers/files/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDownload",
          "className": "actionFilesDownload",
          "filePath": "/source/system/controllers/files/actions/download.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFilesList",
          "className": "actionFilesFilesList",
          "filePath": "/source/system/controllers/files/actions/files_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUploadWithWysiwyg",
          "className": "actionFilesUploadWithWysiwyg",
          "filePath": "/source/system/controllers/files/actions/upload_with_wysiwyg.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "forms",
      "className": "forms",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/forms/frontend.php",
      "actions": [
        {
          "name": "actionEmbed",
          "className": "actionFormsEmbed",
          "filePath": "/source/system/controllers/forms/actions/embed.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFramejs",
          "className": "actionFormsFramejs",
          "filePath": "/source/system/controllers/forms/actions/framejs.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionFormsIndex",
          "filePath": "/source/system/controllers/forms/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSendAjax",
          "className": "actionFormsSendAjax",
          "filePath": "/source/system/controllers/forms/actions/send_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionView",
          "className": "actionFormsView",
          "filePath": "/source/system/controllers/forms/actions/view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "forms",
      "className": "backendForms",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/forms/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "frontpage",
      "className": "frontpage",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/frontpage/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "frontpage",
          "filePath": "/source/system/controllers/frontpage/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "geo",
      "className": "geo",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/geo/frontend.php",
      "actions": [
        {
          "name": "actionGetItems",
          "className": "actionGeoGetItems",
          "filePath": "/source/system/controllers/geo/actions/get_items.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidget",
          "className": "actionGeoWidget",
          "filePath": "/source/system/controllers/geo/actions/widget.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "geo",
      "className": "backendGeo",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/geo/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "groups",
      "className": "groups",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/groups/frontend.php",
      "actions": [
        {
          "name": "actionAcceptRequest",
          "className": "actionGroupsAcceptRequest",
          "filePath": "/source/system/controllers/groups/actions/accept_request.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionAdd",
          "className": "actionGroupsAdd",
          "filePath": "/source/system/controllers/groups/actions/add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeclineRequest",
          "className": "actionGroupsDeclineRequest",
          "filePath": "/source/system/controllers/groups/actions/decline_request.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionExpel",
          "className": "actionGroupsExpel",
          "filePath": "/source/system/controllers/groups/actions/expel.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroup",
          "className": "actionGroupsGroup",
          "filePath": "/source/system/controllers/groups/actions/group.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionGroupActivity",
          "className": "actionGroupsGroupActivity",
          "filePath": "/source/system/controllers/groups/actions/group_activity.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupApprove",
          "className": "actionGroupsGroupApprove",
          "filePath": "/source/system/controllers/groups/actions/group_approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupChangeOwner",
          "className": "actionGroupsGroupChangeOwner",
          "filePath": "/source/system/controllers/groups/actions/group_change_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupContent",
          "className": "actionGroupsGroupContent",
          "filePath": "/source/system/controllers/groups/actions/group_content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupDelete",
          "className": "actionGroupsGroupDelete",
          "filePath": "/source/system/controllers/groups/actions/group_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEdit",
          "className": "actionGroupsGroupEdit",
          "filePath": "/source/system/controllers/groups/actions/group_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRequests",
          "className": "actionGroupsGroupEditRequests",
          "filePath": "/source/system/controllers/groups/actions/group_edit_requests.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRoleDelete",
          "className": "actionGroupsGroupEditRoleDelete",
          "filePath": "/source/system/controllers/groups/actions/group_edit_role_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRoles",
          "className": "actionGroupsGroupEditRoles",
          "filePath": "/source/system/controllers/groups/actions/group_edit_roles.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditStaff",
          "className": "actionGroupsGroupEditStaff",
          "filePath": "/source/system/controllers/groups/actions/group_edit_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditStaffDelete",
          "className": "actionGroupsGroupEditStaffDelete",
          "filePath": "/source/system/controllers/groups/actions/group_edit_staff_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEnter",
          "className": "actionGroupsGroupEnter",
          "filePath": "/source/system/controllers/groups/actions/group_enter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupJoin",
          "className": "actionGroupsGroupJoin",
          "filePath": "/source/system/controllers/groups/actions/group_join.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupLeave",
          "className": "actionGroupsGroupLeave",
          "filePath": "/source/system/controllers/groups/actions/group_leave.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupMembers",
          "className": "actionGroupsGroupMembers",
          "filePath": "/source/system/controllers/groups/actions/group_members.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupUnbind",
          "className": "actionGroupsGroupUnbind",
          "filePath": "/source/system/controllers/groups/actions/group_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionGroupsIndex",
          "filePath": "/source/system/controllers/groups/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInvite",
          "className": "actionGroupsInvite",
          "filePath": "/source/system/controllers/groups/actions/invite.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteDelete",
          "className": "actionGroupsInviteDelete",
          "filePath": "/source/system/controllers/groups/actions/invite_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteFriends",
          "className": "actionGroupsInviteFriends",
          "filePath": "/source/system/controllers/groups/actions/invite_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteUsers",
          "className": "actionGroupsInviteUsers",
          "filePath": "/source/system/controllers/groups/actions/invite_users.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionGroupsItemChildsView",
          "filePath": "/source/system/controllers/groups/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProcessChangeOwner",
          "className": "actionGroupsProcessChangeOwner",
          "filePath": "/source/system/controllers/groups/actions/process_change_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRemoveStaff",
          "className": "actionGroupsRemoveStaff",
          "filePath": "/source/system/controllers/groups/actions/remove_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetRoles",
          "className": "actionGroupsSetRoles",
          "filePath": "/source/system/controllers/groups/actions/set_roles.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetStaff",
          "className": "actionGroupsSetStaff",
          "filePath": "/source/system/controllers/groups/actions/set_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "groups",
      "className": "backendGroups",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/groups/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "images",
      "className": "images",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/images/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionImagesDelete",
          "filePath": "/source/system/controllers/images/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpload",
          "className": "actionImagesUpload",
          "filePath": "/source/system/controllers/images/actions/upload.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUploadWithPreset",
          "className": "actionImagesUploadWithPreset",
          "filePath": "/source/system/controllers/images/actions/upload_with_preset.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "images",
      "className": "backendImages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/images/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendImages",
          "filePath": "/source/system/controllers/images/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "languages",
      "className": "languages",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/languages/frontend.php",
      "actions": [
        {
          "name": "actionTr",
          "className": "actionLanguagesTr",
          "filePath": "/source/system/controllers/languages/actions/tr.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "languages",
      "className": "backendLanguages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/languages/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "messages",
      "className": "messages",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/messages/frontend.php",
      "actions": [
        {
          "name": "actionContact",
          "className": "actionMessagesContact",
          "filePath": "/source/system/controllers/messages/actions/contact.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionMessagesDelete",
          "filePath": "/source/system/controllers/messages/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeleteMesage",
          "className": "actionMessagesDeleteMesage",
          "filePath": "/source/system/controllers/messages/actions/delete_mesage.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionForgive",
          "className": "actionMessagesForgive",
          "filePath": "/source/system/controllers/messages/actions/forgive.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIgnore",
          "className": "actionMessagesIgnore",
          "filePath": "/source/system/controllers/messages/actions/ignore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionMessagesIndex",
          "filePath": "/source/system/controllers/messages/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionNoticeAction",
          "className": "actionMessagesNoticeAction",
          "filePath": "/source/system/controllers/messages/actions/notice_action.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionNotices",
          "className": "actionMessagesNotices",
          "filePath": "/source/system/controllers/messages/actions/notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefresh",
          "className": "actionMessagesRefresh",
          "filePath": "/source/system/controllers/messages/actions/refresh.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRestoreMesage",
          "className": "actionMessagesRestoreMesage",
          "filePath": "/source/system/controllers/messages/actions/restore_mesage.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSend",
          "className": "actionMessagesSend",
          "filePath": "/source/system/controllers/messages/actions/send.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionShowOlder",
          "className": "actionMessagesShowOlder",
          "filePath": "/source/system/controllers/messages/actions/show_older.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWrite",
          "className": "actionMessagesWrite",
          "filePath": "/source/system/controllers/messages/actions/write.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "messages",
      "className": "backendMessages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/messages/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "moderation",
      "className": "moderation",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/moderation/frontend.php",
      "actions": [
        {
          "name": "actionDraft",
          "className": "actionModerationDraft",
          "filePath": "/source/system/controllers/moderation/actions/draft.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionModerationIndex",
          "filePath": "/source/system/controllers/moderation/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWaitingList",
          "className": "actionModerationWaitingList",
          "filePath": "/source/system/controllers/moderation/actions/waiting_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "moderation",
      "className": "backendModeration",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/moderation/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "photos",
      "className": "photos",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/photos/frontend.php",
      "actions": [
        {
          "name": "actionCamera",
          "className": "actionPhotosCamera",
          "filePath": "/source/system/controllers/photos/actions/camera.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionPhotosDelete",
          "filePath": "/source/system/controllers/photos/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDownload",
          "className": "actionPhotosDownload",
          "filePath": "/source/system/controllers/photos/actions/download.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionEdit",
          "className": "actionPhotosEdit",
          "filePath": "/source/system/controllers/photos/actions/edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionPhotosIndex",
          "filePath": "/source/system/controllers/photos/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMore",
          "className": "actionPhotosMore",
          "filePath": "/source/system/controllers/photos/actions/more.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetCover",
          "className": "actionPhotosSetCover",
          "filePath": "/source/system/controllers/photos/actions/set_cover.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpload",
          "className": "actionPhotosUpload",
          "filePath": "/source/system/controllers/photos/actions/upload.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionView",
          "className": "actionPhotosView",
          "filePath": "/source/system/controllers/photos/actions/view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "photos",
      "className": "backendPhotos",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/photos/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "queue",
      "className": "queue",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/queue/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "rating",
      "className": "rating",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/rating/frontend.php",
      "actions": [
        {
          "name": "actionInfo",
          "className": "actionRatingInfo",
          "filePath": "/source/system/controllers/rating/actions/info.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionVote",
          "className": "actionRatingVote",
          "filePath": "/source/system/controllers/rating/actions/vote.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "rating",
      "className": "backendRating",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/rating/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "recaptcha",
      "className": "recaptcha",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/recaptcha/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "recaptcha",
      "className": "backendRecaptcha",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/recaptcha/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "redirect",
      "className": "redirect",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/redirect/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "redirect",
          "filePath": "/source/system/controllers/redirect/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "redirect",
      "className": "backendRedirect",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/redirect/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "renderer",
      "className": "renderer",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/renderer/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    {
      "name": "rss",
      "className": "rss",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/rss/frontend.php",
      "actions": [
        {
          "name": "actionFeed",
          "className": "actionRssFeed",
          "filePath": "/source/system/controllers/rss/actions/feed.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "rss",
      "className": "backendRss",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/rss/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "search",
      "className": "search",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/search/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "actionSearchIndex",
          "filePath": "/source/system/controllers/search/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOpensearch",
          "className": "actionSearchOpensearch",
          "filePath": "/source/system/controllers/search/actions/opensearch.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "search",
      "className": "backendSearch",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/search/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "sitemap",
      "className": "sitemap",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/sitemap/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "actionSitemapIndex",
          "filePath": "/source/system/controllers/sitemap/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRobots",
          "className": "actionSitemapRobots",
          "filePath": "/source/system/controllers/sitemap/actions/robots.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "sitemap",
      "className": "backendSitemap",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/sitemap/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    {
      "name": "subscriptions",
      "className": "subscriptions",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/subscriptions/frontend.php",
      "actions": [
        {
          "name": "actionEmailUnsubscribe",
          "className": "actionSubscriptionsEmailUnsubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/email_unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGuestConfirm",
          "className": "actionSubscriptionsGuestConfirm",
          "filePath": "/source/system/controllers/subscriptions/actions/guest_confirm.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionListSubscribers",
          "className": "actionSubscriptionsListSubscribers",
          "filePath": "/source/system/controllers/subscriptions/actions/list_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubscribe",
          "className": "actionSubscriptionsSubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/subscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUnsubscribe",
          "className": "actionSubscriptionsUnsubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionViewList",
          "className": "actionSubscriptionsViewList",
          "filePath": "/source/system/controllers/subscriptions/actions/view_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "subscriptions",
      "className": "backendSubscriptions",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/subscriptions/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "tags",
      "className": "tags",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/tags/frontend.php",
      "actions": [
        {
          "name": "actionAutocomplete",
          "className": "actionTagsAutocomplete",
          "filePath": "/source/system/controllers/tags/actions/autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionTagsIndex",
          "filePath": "/source/system/controllers/tags/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "tags",
      "className": "backendTags",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/tags/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "typograph",
      "className": "typograph",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/typograph/frontend.php",
      "actions": [
        {
          "name": "actionGetSmiles",
          "className": "typograph",
          "filePath": "/source/system/controllers/typograph/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\oneable"
          ]
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "typograph",
      "className": "backendTypograph",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/typograph/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "users",
      "className": "users",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/users/frontend.php",
      "actions": [
        {
          "name": "actionFriendAdd",
          "className": "actionUsersFriendAdd",
          "filePath": "/source/system/controllers/users/actions/friend_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFriendDelete",
          "className": "actionUsersFriendDelete",
          "filePath": "/source/system/controllers/users/actions/friend_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionUsersIndex",
          "filePath": "/source/system/controllers/users/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionUsersItemChildsView",
          "filePath": "/source/system/controllers/users/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionKarmaVote",
          "className": "actionUsersKarmaVote",
          "filePath": "/source/system/controllers/users/actions/karma_vote.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionKeepInSubscribers",
          "className": "actionUsersKeepInSubscribers",
          "filePath": "/source/system/controllers/users/actions/keep_in_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfile",
          "className": "actionUsersProfile",
          "filePath": "/source/system/controllers/users/actions/profile.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileContent",
          "className": "actionUsersProfileContent",
          "filePath": "/source/system/controllers/users/actions/profile_content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileDelete",
          "className": "actionUsersProfileDelete",
          "filePath": "/source/system/controllers/users/actions/profile_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEdit",
          "className": "actionUsersProfileEdit",
          "filePath": "/source/system/controllers/users/actions/profile_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditNotices",
          "className": "actionUsersProfileEditNotices",
          "filePath": "/source/system/controllers/users/actions/profile_edit_notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditPassword",
          "className": "actionUsersProfileEditPassword",
          "filePath": "/source/system/controllers/users/actions/profile_edit_password.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditPrivacy",
          "className": "actionUsersProfileEditPrivacy",
          "filePath": "/source/system/controllers/users/actions/profile_edit_privacy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditSessions",
          "className": "actionUsersProfileEditSessions",
          "filePath": "/source/system/controllers/users/actions/profile_edit_sessions.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditSessionsDelete",
          "className": "actionUsersProfileEditSessionsDelete",
          "filePath": "/source/system/controllers/users/actions/profile_edit_sessions_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditTheme",
          "className": "actionUsersProfileEditTheme",
          "filePath": "/source/system/controllers/users/actions/profile_edit_theme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileFriends",
          "className": "actionUsersProfileFriends",
          "filePath": "/source/system/controllers/users/actions/profile_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileInvites",
          "className": "actionUsersProfileInvites",
          "filePath": "/source/system/controllers/users/actions/profile_invites.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileKarma",
          "className": "actionUsersProfileKarma",
          "filePath": "/source/system/controllers/users/actions/profile_karma.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileLock",
          "className": "actionUsersProfileLock",
          "filePath": "/source/system/controllers/users/actions/profile_lock.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileRestore",
          "className": "actionUsersProfileRestore",
          "filePath": "/source/system/controllers/users/actions/profile_restore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileSubscribers",
          "className": "actionUsersProfileSubscribers",
          "filePath": "/source/system/controllers/users/actions/profile_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileTab",
          "className": "actionUsersProfileTab",
          "filePath": "/source/system/controllers/users/actions/profile_tab.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionStatus",
          "className": "actionUsersStatus",
          "filePath": "/source/system/controllers/users/actions/status.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionStatusDelete",
          "className": "actionUsersStatusDelete",
          "filePath": "/source/system/controllers/users/actions/status_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubscribe",
          "className": "actionUsersSubscribe",
          "filePath": "/source/system/controllers/users/actions/subscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUnsubscribe",
          "className": "actionUsersUnsubscribe",
          "filePath": "/source/system/controllers/users/actions/unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "users",
      "className": "backendUsers",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/users/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendUsers",
          "filePath": "/source/system/controllers/users/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "wall",
      "className": "wall",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/wall/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionWallDelete",
          "filePath": "/source/system/controllers/wall/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGet",
          "className": "actionWallGet",
          "filePath": "/source/system/controllers/wall/actions/get.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGetReplies",
          "className": "actionWallGetReplies",
          "filePath": "/source/system/controllers/wall/actions/get_replies.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubmit",
          "className": "actionWallSubmit",
          "filePath": "/source/system/controllers/wall/actions/submit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "wall",
      "className": "backendWall",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/wall/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "widgets",
      "className": "widgets",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/widgets/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    {
      "name": "wysiwygs",
      "className": "wysiwygs",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/wysiwygs/frontend.php",
      "actions": [
        {
          "name": "actionLinksList",
          "className": "actionWysiwygsLinksList",
          "filePath": "/source/system/controllers/wysiwygs/actions/links_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    {
      "name": "wysiwygs",
      "className": "backendWysiwygs",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/wysiwygs/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendWysiwygs",
          "filePath": "/source/system/controllers/wysiwygs/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    }
  ],
  "byName": {
    "activity_frontend": {
      "name": "activity",
      "className": "activity",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/activity/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionActivityDelete",
          "filePath": "/source/system/controllers/activity/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionActivityIndex",
          "filePath": "/source/system/controllers/activity/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "activity_backend": {
      "name": "activity",
      "className": "backendActivity",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/activity/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "admin_frontend": {
      "name": "admin",
      "className": "admin",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/admin/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "admin_backend": {
      "name": "admin",
      "className": "backendAdmin",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/admin/backend.php",
      "actions": [
        {
          "name": "actionAddonsList",
          "className": "actionAdminAddonsList",
          "filePath": "/source/system/controllers/admin/actions/addons_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCacheDelete",
          "className": "actionAdminCacheDelete",
          "filePath": "/source/system/controllers/admin/actions/cache_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCheckFtp",
          "className": "actionAdminCheckFtp",
          "filePath": "/source/system/controllers/admin/actions/check_ftp.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionClearCache",
          "className": "actionAdminClearCache",
          "filePath": "/source/system/controllers/admin/actions/clear_cache.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmLogin",
          "className": "actionAdminConfirmLogin",
          "filePath": "/source/system/controllers/admin/actions/confirm_login.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContent",
          "className": "actionAdminContent",
          "filePath": "/source/system/controllers/admin/actions/content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsAdd",
          "className": "actionAdminContentCatsAdd",
          "filePath": "/source/system/controllers/admin/actions/content_cats_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsDelete",
          "className": "actionAdminContentCatsDelete",
          "filePath": "/source/system/controllers/admin/actions/content_cats_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsEdit",
          "className": "actionAdminContentCatsEdit",
          "filePath": "/source/system/controllers/admin/actions/content_cats_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentCatsOrder",
          "className": "actionAdminContentCatsOrder",
          "filePath": "/source/system/controllers/admin/actions/content_cats_order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentFilter",
          "className": "actionAdminContentFilter",
          "filePath": "/source/system/controllers/admin/actions/content_filter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemAdd",
          "className": "actionAdminContentItemAdd",
          "filePath": "/source/system/controllers/admin/actions/content_item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemDelete",
          "className": "actionAdminContentItemDelete",
          "filePath": "/source/system/controllers/admin/actions/content_item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemEdit",
          "className": "actionAdminContentItemEdit",
          "filePath": "/source/system/controllers/admin/actions/content_item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemMove",
          "className": "actionAdminContentItemMove",
          "filePath": "/source/system/controllers/admin/actions/content_item_move.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemToggle",
          "className": "actionAdminContentItemToggle",
          "filePath": "/source/system/controllers/admin/actions/content_item_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemTrashPut",
          "className": "actionAdminContentItemTrashPut",
          "filePath": "/source/system/controllers/admin/actions/content_item_trash_put.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentItemsEdit",
          "className": "actionAdminContentItemsEdit",
          "filePath": "/source/system/controllers/admin/actions/content_items_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionContentTreeAjax",
          "className": "actionAdminContentTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/content_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllers",
          "className": "actionAdminControllers",
          "filePath": "/source/system/controllers/admin/actions/controllers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersDelete",
          "className": "actionAdminControllersDelete",
          "filePath": "/source/system/controllers/admin/actions/controllers_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEdit",
          "className": "actionAdminControllersEdit",
          "filePath": "/source/system/controllers/admin/actions/controllers_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEvents",
          "className": "actionAdminControllersEvents",
          "filePath": "/source/system/controllers/admin/actions/controllers_events.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsReorder",
          "className": "actionAdminControllersEventsReorder",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsToggle",
          "className": "actionAdminControllersEventsToggle",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersEventsUpdate",
          "className": "actionAdminControllersEventsUpdate",
          "filePath": "/source/system/controllers/admin/actions/controllers_events_update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionControllersToggle",
          "className": "actionAdminControllersToggle",
          "filePath": "/source/system/controllers/admin/actions/controllers_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCredits",
          "className": "actionAdminCredits",
          "filePath": "/source/system/controllers/admin/actions/credits.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypes",
          "className": "actionAdminCtypes",
          "filePath": "/source/system/controllers/admin/actions/ctypes.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesAdd",
          "className": "actionAdminCtypesAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasets",
          "className": "actionAdminCtypesDatasets",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsAdd",
          "className": "actionAdminCtypesDatasetsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsDelete",
          "className": "actionAdminCtypesDatasetsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDatasetsEdit",
          "className": "actionAdminCtypesDatasetsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_datasets_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesDelete",
          "className": "actionAdminCtypesDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesEdit",
          "className": "actionAdminCtypesEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldStringAjax",
          "className": "actionAdminCtypesFieldStringAjax",
          "filePath": "/source/system/controllers/admin/actions/ctypes_field_string_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFields",
          "className": "actionAdminCtypesFields",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsAdd",
          "className": "actionAdminCtypesFieldsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\controllers\\actions\\formFieldItem"
          ]
        },
        {
          "name": "actionCtypesFieldsDelete",
          "className": "actionAdminCtypesFieldsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsEdit",
          "className": "actionAdminCtypesFieldsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsOptions",
          "className": "actionAdminCtypesFieldsOptions",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_options.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsReorder",
          "className": "actionAdminCtypesFieldsReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFieldsToggle",
          "className": "actionAdminCtypesFieldsToggle",
          "filePath": "/source/system/controllers/admin/actions/ctypes_fields_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFilters",
          "className": "actionAdminCtypesFilters",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersAdd",
          "className": "actionAdminCtypesFiltersAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersDelete",
          "className": "actionAdminCtypesFiltersDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesFiltersEnable",
          "className": "actionAdminCtypesFiltersEnable",
          "filePath": "/source/system/controllers/admin/actions/ctypes_filters_enable.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesLabels",
          "className": "actionAdminCtypesLabels",
          "filePath": "/source/system/controllers/admin/actions/ctypes_labels.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesModerators",
          "className": "actionAdminCtypesModerators",
          "filePath": "/source/system/controllers/admin/actions/ctypes_moderators.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPerms",
          "className": "actionAdminCtypesPerms",
          "filePath": "/source/system/controllers/admin/actions/ctypes_perms.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPermsSave",
          "className": "actionAdminCtypesPermsSave",
          "filePath": "/source/system/controllers/admin/actions/ctypes_perms_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesProps",
          "className": "actionAdminCtypesProps",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsAdd",
          "className": "actionAdminCtypesPropsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsBind",
          "className": "actionAdminCtypesPropsBind",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_bind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsDelete",
          "className": "actionAdminCtypesPropsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsEdit",
          "className": "actionAdminCtypesPropsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsReorder",
          "className": "actionAdminCtypesPropsReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsToggle",
          "className": "actionAdminCtypesPropsToggle",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesPropsUnbind",
          "className": "actionAdminCtypesPropsUnbind",
          "filePath": "/source/system/controllers/admin/actions/ctypes_props_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelations",
          "className": "actionAdminCtypesRelations",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsAdd",
          "className": "actionAdminCtypesRelationsAdd",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsDelete",
          "className": "actionAdminCtypesRelationsDelete",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesRelationsEdit",
          "className": "actionAdminCtypesRelationsEdit",
          "filePath": "/source/system/controllers/admin/actions/ctypes_relations_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCtypesReorder",
          "className": "actionAdminCtypesReorder",
          "filePath": "/source/system/controllers/admin/actions/ctypes_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGetTableList",
          "className": "actionAdminGetTableList",
          "filePath": "/source/system/controllers/admin/actions/get_table_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionAdminIndex",
          "filePath": "/source/system/controllers/admin/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexChartData",
          "className": "actionAdminIndexChartData",
          "filePath": "/source/system/controllers/admin/actions/index_chart_data.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexPageSettings",
          "className": "actionAdminIndexPageSettings",
          "filePath": "/source/system/controllers/admin/actions/index_page_settings.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndexSaveOrder",
          "className": "actionAdminIndexSaveOrder",
          "filePath": "/source/system/controllers/admin/actions/index_save_order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInlineSave",
          "className": "actionAdminInlineSave",
          "filePath": "/source/system/controllers/admin/actions/inline_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstall",
          "className": "actionAdminInstall",
          "filePath": "/source/system/controllers/admin/actions/install.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstallFinish",
          "className": "actionAdminInstallFinish",
          "filePath": "/source/system/controllers/admin/actions/install_finish.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInstallFtp",
          "className": "actionAdminInstallFtp",
          "filePath": "/source/system/controllers/admin/actions/install_ftp.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLoadIcmsNews",
          "className": "actionAdminLoadIcmsNews",
          "filePath": "/source/system/controllers/admin/actions/load_icms_news.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLoadIcmsSponsorship",
          "className": "actionAdminLoadIcmsSponsorship",
          "filePath": "/source/system/controllers/admin/actions/load_icms_sponsorship.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenu",
          "className": "actionAdminMenu",
          "filePath": "/source/system/controllers/admin/actions/menu.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuAdd",
          "className": "actionAdminMenuAdd",
          "filePath": "/source/system/controllers/admin/actions/menu_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuDelete",
          "className": "actionAdminMenuDelete",
          "filePath": "/source/system/controllers/admin/actions/menu_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuEdit",
          "className": "actionAdminMenuEdit",
          "filePath": "/source/system/controllers/admin/actions/menu_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemAdd",
          "className": "actionAdminMenuItemAdd",
          "filePath": "/source/system/controllers/admin/actions/menu_item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemDelete",
          "className": "actionAdminMenuItemDelete",
          "filePath": "/source/system/controllers/admin/actions/menu_item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemEdit",
          "className": "actionAdminMenuItemEdit",
          "filePath": "/source/system/controllers/admin/actions/menu_item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuItemMove",
          "className": "actionAdminMenuItemMove",
          "filePath": "/source/system/controllers/admin/actions/menu_item_move.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMenuTreeAjax",
          "className": "actionAdminMenuTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/menu_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMessagesNotices",
          "className": "actionAdminMessagesNotices",
          "filePath": "/source/system/controllers/admin/actions/messages_notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPackageFilesList",
          "className": "actionAdminPackageFilesList",
          "filePath": "/source/system/controllers/admin/actions/package_files_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionReorder",
          "className": "actionAdminReorder",
          "filePath": "/source/system/controllers/admin/actions/reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettings",
          "className": "actionAdminSettings",
          "filePath": "/source/system/controllers/admin/actions/settings.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsCheckNested",
          "className": "actionAdminSettingsCheckNested",
          "filePath": "/source/system/controllers/admin/actions/settings_check_nested.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsMailCheck",
          "className": "actionAdminSettingsMailCheck",
          "filePath": "/source/system/controllers/admin/actions/settings_mail_check.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsMime",
          "className": "actionAdminSettingsMime",
          "filePath": "/source/system/controllers/admin/actions/settings_mime.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsScheduler",
          "className": "actionAdminSettingsScheduler",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerAdd",
          "className": "actionAdminSettingsSchedulerAdd",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerDelete",
          "className": "actionAdminSettingsSchedulerDelete",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\controllers\\actions\\deleteItem"
          ]
        },
        {
          "name": "actionSettingsSchedulerEdit",
          "className": "actionAdminSettingsSchedulerEdit",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSchedulerRun",
          "className": "actionAdminSettingsSchedulerRun",
          "filePath": "/source/system/controllers/admin/actions/settings_scheduler_run.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSiteon",
          "className": "actionAdminSettingsSiteon",
          "filePath": "/source/system/controllers/admin/actions/settings_siteon.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSwitchTemplate",
          "className": "actionAdminSettingsSwitchTemplate",
          "filePath": "/source/system/controllers/admin/actions/settings_switch_template.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsSysInfo",
          "className": "actionAdminSettingsSysInfo",
          "filePath": "/source/system/controllers/admin/actions/settings_sys_info.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsTheme",
          "className": "actionAdminSettingsTheme",
          "filePath": "/source/system/controllers/admin/actions/settings_theme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSettingsThemeIconList",
          "className": "actionAdminSettingsThemeIconList",
          "filePath": "/source/system/controllers/admin/actions/settings_theme_icon_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionToggleItem",
          "className": "actionAdminToggleItem",
          "filePath": "/source/system/controllers/admin/actions/toggle_item.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpdate",
          "className": "actionAdminUpdate",
          "filePath": "/source/system/controllers/admin/actions/update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpdateInstall",
          "className": "actionAdminUpdateInstall",
          "filePath": "/source/system/controllers/admin/actions/update_install.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsers",
          "className": "actionAdminUsers",
          "filePath": "/source/system/controllers/admin/actions/users.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersAdd",
          "className": "actionAdminUsersAdd",
          "filePath": "/source/system/controllers/admin/actions/users_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersAutocomplete",
          "className": "actionAdminUsersAutocomplete",
          "filePath": "/source/system/controllers/admin/actions/users_autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersDelete",
          "className": "actionAdminUsersDelete",
          "filePath": "/source/system/controllers/admin/actions/users_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersDeleteList",
          "className": "actionAdminUsersDeleteList",
          "filePath": "/source/system/controllers/admin/actions/users_delete_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersEdit",
          "className": "actionAdminUsersEdit",
          "filePath": "/source/system/controllers/admin/actions/users_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersFilter",
          "className": "actionAdminUsersFilter",
          "filePath": "/source/system/controllers/admin/actions/users_filter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupAdd",
          "className": "actionAdminUsersGroupAdd",
          "filePath": "/source/system/controllers/admin/actions/users_group_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupDelete",
          "className": "actionAdminUsersGroupDelete",
          "filePath": "/source/system/controllers/admin/actions/users_group_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupEdit",
          "className": "actionAdminUsersGroupEdit",
          "filePath": "/source/system/controllers/admin/actions/users_group_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupPerms",
          "className": "actionAdminUsersGroupPerms",
          "filePath": "/source/system/controllers/admin/actions/users_group_perms.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupPermsSave",
          "className": "actionAdminUsersGroupPermsSave",
          "filePath": "/source/system/controllers/admin/actions/users_group_perms_save.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUsersGroupReorder",
          "className": "actionAdminUsersGroupReorder",
          "filePath": "/source/system/controllers/admin/actions/users_group_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgets",
          "className": "actionAdminWidgets",
          "filePath": "/source/system/controllers/admin/actions/widgets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsAdd",
          "className": "actionAdminWidgetsAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColAdd",
          "className": "actionAdminWidgetsColAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColDelete",
          "className": "actionAdminWidgetsColDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsColEdit",
          "className": "actionAdminWidgetsColEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_col_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsCopy",
          "className": "actionAdminWidgetsCopy",
          "filePath": "/source/system/controllers/admin/actions/widgets_copy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsDelete",
          "className": "actionAdminWidgetsDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsEdit",
          "className": "actionAdminWidgetsEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsExportScheme",
          "className": "actionAdminWidgetsExportScheme",
          "filePath": "/source/system/controllers/admin/actions/widgets_export_scheme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsImportScheme",
          "className": "actionAdminWidgetsImportScheme",
          "filePath": "/source/system/controllers/admin/actions/widgets_import_scheme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsLoad",
          "className": "actionAdminWidgetsLoad",
          "filePath": "/source/system/controllers/admin/actions/widgets_load.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageAdd",
          "className": "actionAdminWidgetsPageAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageAutocomplete",
          "className": "actionAdminWidgetsPageAutocomplete",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageContentCats",
          "className": "actionAdminWidgetsPageContentCats",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_content_cats.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageDelete",
          "className": "actionAdminWidgetsPageDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsPageEdit",
          "className": "actionAdminWidgetsPageEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_page_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRemove",
          "className": "actionAdminWidgetsRemove",
          "filePath": "/source/system/controllers/admin/actions/widgets_remove.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsReorder",
          "className": "actionAdminWidgetsReorder",
          "filePath": "/source/system/controllers/admin/actions/widgets_reorder.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowAdd",
          "className": "actionAdminWidgetsRowAdd",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowAddNs",
          "className": "actionAdminWidgetsRowAddNs",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_add_ns.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowDelete",
          "className": "actionAdminWidgetsRowDelete",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsRowEdit",
          "className": "actionAdminWidgetsRowEdit",
          "filePath": "/source/system/controllers/admin/actions/widgets_row_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsToggle",
          "className": "actionAdminWidgetsToggle",
          "filePath": "/source/system/controllers/admin/actions/widgets_toggle.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsTreeAjax",
          "className": "actionAdminWidgetsTreeAjax",
          "filePath": "/source/system/controllers/admin/actions/widgets_tree_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsUnbindAllWidgets",
          "className": "actionAdminWidgetsUnbindAllWidgets",
          "filePath": "/source/system/controllers/admin/actions/widgets_unbind_all_widgets.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetsUpdate",
          "className": "actionAdminWidgetsUpdate",
          "filePath": "/source/system/controllers/admin/actions/widgets_update.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "auth_frontend": {
      "name": "auth",
      "className": "auth",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/auth/frontend.php",
      "actions": [
        {
          "name": "actionLogout",
          "className": "auth",
          "filePath": "/source/system/controllers/auth/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionAuthIndex",
          "filePath": "/source/system/controllers/auth/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionLogin",
          "className": "actionAuthLogin",
          "filePath": "/source/system/controllers/auth/actions/login.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRegister",
          "className": "actionAuthRegister",
          "filePath": "/source/system/controllers/auth/actions/register.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionReset",
          "className": "actionAuthReset",
          "filePath": "/source/system/controllers/auth/actions/reset.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRestore",
          "className": "actionAuthRestore",
          "filePath": "/source/system/controllers/auth/actions/restore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionResubmit",
          "className": "actionAuthResubmit",
          "filePath": "/source/system/controllers/auth/actions/resubmit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionVerify",
          "className": "actionAuthVerify",
          "filePath": "/source/system/controllers/auth/actions/verify.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actiongaLogin2fa",
          "className": "actionAuthgaLogin2fa",
          "filePath": "/source/system/controllers/authga/actions/login_2fa.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "auth_backend": {
      "name": "auth",
      "className": "backendAuth",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/auth/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "authga_frontend": {
      "name": "authga",
      "className": "authga",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/authga/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "billing_frontend": {
      "name": "billing",
      "className": "billing",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/billing/frontend.php",
      "actions": [
        {
          "name": "actionAddBalance",
          "className": "actionBillingAddBalance",
          "filePath": "/source/system/controllers/billing/actions/add_balance.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionBuy",
          "className": "actionBillingBuy",
          "filePath": "/source/system/controllers/billing/actions/buy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCancel",
          "className": "actionBillingCancel",
          "filePath": "/source/system/controllers/billing/actions/cancel.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmOut",
          "className": "actionBillingConfirmOut",
          "filePath": "/source/system/controllers/billing/actions/confirm_out.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionConfirmTf",
          "className": "actionBillingConfirmTf",
          "filePath": "/source/system/controllers/billing/actions/confirm_tf.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeposit",
          "className": "actionBillingDeposit",
          "filePath": "/source/system/controllers/billing/actions/deposit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionExchange",
          "className": "actionBillingExchange",
          "filePath": "/source/system/controllers/billing/actions/exchange.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFail",
          "className": "actionBillingFail",
          "filePath": "/source/system/controllers/billing/actions/fail.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOrder",
          "className": "actionBillingOrder",
          "filePath": "/source/system/controllers/billing/actions/order.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOut",
          "className": "actionBillingOut",
          "filePath": "/source/system/controllers/billing/actions/out.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOutDelete",
          "className": "actionBillingOutDelete",
          "filePath": "/source/system/controllers/billing/actions/out_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOutDone",
          "className": "actionBillingOutDone",
          "filePath": "/source/system/controllers/billing/actions/out_done.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPaypal",
          "className": "actionBillingPaypal",
          "filePath": "/source/system/controllers/billing/actions/paypal.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPlan",
          "className": "actionBillingPlan",
          "filePath": "/source/system/controllers/billing/actions/plan.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionPrepare",
          "className": "actionBillingPrepare",
          "filePath": "/source/system/controllers/billing/actions/prepare.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProcess",
          "className": "actionBillingProcess",
          "filePath": "/source/system/controllers/billing/actions/process.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefs",
          "className": "actionBillingRefs",
          "filePath": "/source/system/controllers/billing/actions/refs.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionStatusPoll",
          "className": "actionBillingStatusPoll",
          "filePath": "/source/system/controllers/billing/actions/status_poll.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSuccess",
          "className": "actionBillingSuccess",
          "filePath": "/source/system/controllers/billing/actions/success.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTransfer",
          "className": "actionBillingTransfer",
          "filePath": "/source/system/controllers/billing/actions/transfer.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    "billing_backend": {
      "name": "billing",
      "className": "backendBilling",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/billing/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    "bootstrap4_frontend": {
      "name": "bootstrap4",
      "className": "bootstrap4",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/bootstrap4/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "comments_frontend": {
      "name": "comments",
      "className": "comments",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/comments/frontend.php",
      "actions": [
        {
          "name": "actionApprove",
          "className": "actionCommentsApprove",
          "filePath": "/source/system/controllers/comments/actions/approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionCommentsDelete",
          "filePath": "/source/system/controllers/comments/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGet",
          "className": "actionCommentsGet",
          "filePath": "/source/system/controllers/comments/actions/get.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionCommentsIndex",
          "filePath": "/source/system/controllers/comments/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRate",
          "className": "actionCommentsRate",
          "filePath": "/source/system/controllers/comments/actions/rate.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefresh",
          "className": "actionCommentsRefresh",
          "filePath": "/source/system/controllers/comments/actions/refresh.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubmit",
          "className": "actionCommentsSubmit",
          "filePath": "/source/system/controllers/comments/actions/submit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrack",
          "className": "actionCommentsTrack",
          "filePath": "/source/system/controllers/comments/actions/track.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrackStop",
          "className": "actionCommentsTrackStop",
          "filePath": "/source/system/controllers/comments/actions/track_stop.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "comments_backend": {
      "name": "comments",
      "className": "backendComments",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/comments/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "content_frontend": {
      "name": "content",
      "className": "content",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/content/frontend.php",
      "actions": [
        {
          "name": "actionCategoryAdd",
          "className": "actionContentCategoryAdd",
          "filePath": "/source/system/controllers/content/actions/category_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryDelete",
          "className": "actionContentCategoryDelete",
          "filePath": "/source/system/controllers/content/actions/category_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryEdit",
          "className": "actionContentCategoryEdit",
          "filePath": "/source/system/controllers/content/actions/category_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionCategoryView",
          "className": "actionContentCategoryView",
          "filePath": "/source/system/controllers/content/actions/category_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFolderDelete",
          "className": "actionContentFolderDelete",
          "filePath": "/source/system/controllers/content/actions/folder_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFolderEdit",
          "className": "actionContentFolderEdit",
          "filePath": "/source/system/controllers/content/actions/folder_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemAdd",
          "className": "actionContentItemAdd",
          "filePath": "/source/system/controllers/content/actions/item_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemApprove",
          "className": "actionContentItemApprove",
          "filePath": "/source/system/controllers/content/actions/item_approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBind",
          "className": "actionContentItemBind",
          "filePath": "/source/system/controllers/content/actions/item_bind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBindForm",
          "className": "actionContentItemBindForm",
          "filePath": "/source/system/controllers/content/actions/item_bind_form.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemBindList",
          "className": "actionContentItemBindList",
          "filePath": "/source/system/controllers/content/actions/item_bind_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionContentItemChildsView",
          "filePath": "/source/system/controllers/content/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemDelete",
          "className": "actionContentItemDelete",
          "filePath": "/source/system/controllers/content/actions/item_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemEdit",
          "className": "actionContentItemEdit",
          "filePath": "/source/system/controllers/content/actions/item_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemOwner",
          "className": "actionContentItemOwner",
          "filePath": "/source/system/controllers/content/actions/item_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemOwnerProcess",
          "className": "actionContentItemOwnerProcess",
          "filePath": "/source/system/controllers/content/actions/item_owner_process.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemPropsFields",
          "className": "actionContentItemPropsFields",
          "filePath": "/source/system/controllers/content/actions/item_props_fields.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemReturn",
          "className": "actionContentItemReturn",
          "filePath": "/source/system/controllers/content/actions/item_return.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemReturnForRevision",
          "className": "actionContentItemReturnForRevision",
          "filePath": "/source/system/controllers/content/actions/item_return_for_revision.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemTrashPut",
          "className": "actionContentItemTrashPut",
          "filePath": "/source/system/controllers/content/actions/item_trash_put.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemTrashRemove",
          "className": "actionContentItemTrashRemove",
          "filePath": "/source/system/controllers/content/actions/item_trash_remove.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemUnbind",
          "className": "actionContentItemUnbind",
          "filePath": "/source/system/controllers/content/actions/item_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemView",
          "className": "actionContentItemView",
          "filePath": "/source/system/controllers/content/actions/item_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionItemsFromFriends",
          "className": "actionContentItemsFromFriends",
          "filePath": "/source/system/controllers/content/actions/items_from_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionTrash",
          "className": "actionContentTrash",
          "filePath": "/source/system/controllers/content/actions/trash.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetCatsAjax",
          "className": "actionContentWidgetCatsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_cats_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetCatsPresetsAjax",
          "className": "actionContentWidgetCatsPresetsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_cats_presets_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetDatasetsAjax",
          "className": "actionContentWidgetDatasetsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_datasets_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFieldsAjax",
          "className": "actionContentWidgetFieldsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_fields_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFieldsOptionsAjax",
          "className": "actionContentWidgetFieldsOptionsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_fields_options_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetFiltersAjax",
          "className": "actionContentWidgetFiltersAjax",
          "filePath": "/source/system/controllers/content/actions/widget_filters_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidgetRelationsAjax",
          "className": "actionContentWidgetRelationsAjax",
          "filePath": "/source/system/controllers/content/actions/widget_relations_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    "csp_frontend": {
      "name": "csp",
      "className": "csp",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/csp/frontend.php",
      "actions": [
        {
          "name": "actionReport",
          "className": "actionCspReport",
          "filePath": "/source/system/controllers/csp/actions/report.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "csp_backend": {
      "name": "csp",
      "className": "backendCsp",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/csp/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "error404_frontend": {
      "name": "error404",
      "className": "error404",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/error404/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "error404",
          "filePath": "/source/system/controllers/error404/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "files_frontend": {
      "name": "files",
      "className": "files",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/files/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionFilesDelete",
          "filePath": "/source/system/controllers/files/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDownload",
          "className": "actionFilesDownload",
          "filePath": "/source/system/controllers/files/actions/download.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFilesList",
          "className": "actionFilesFilesList",
          "filePath": "/source/system/controllers/files/actions/files_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUploadWithWysiwyg",
          "className": "actionFilesUploadWithWysiwyg",
          "filePath": "/source/system/controllers/files/actions/upload_with_wysiwyg.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "forms_frontend": {
      "name": "forms",
      "className": "forms",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/forms/frontend.php",
      "actions": [
        {
          "name": "actionEmbed",
          "className": "actionFormsEmbed",
          "filePath": "/source/system/controllers/forms/actions/embed.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFramejs",
          "className": "actionFormsFramejs",
          "filePath": "/source/system/controllers/forms/actions/framejs.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionFormsIndex",
          "filePath": "/source/system/controllers/forms/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSendAjax",
          "className": "actionFormsSendAjax",
          "filePath": "/source/system/controllers/forms/actions/send_ajax.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionView",
          "className": "actionFormsView",
          "filePath": "/source/system/controllers/forms/actions/view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "forms_backend": {
      "name": "forms",
      "className": "backendForms",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/forms/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "frontpage_frontend": {
      "name": "frontpage",
      "className": "frontpage",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/frontpage/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "frontpage",
          "filePath": "/source/system/controllers/frontpage/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "geo_frontend": {
      "name": "geo",
      "className": "geo",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/geo/frontend.php",
      "actions": [
        {
          "name": "actionGetItems",
          "className": "actionGeoGetItems",
          "filePath": "/source/system/controllers/geo/actions/get_items.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWidget",
          "className": "actionGeoWidget",
          "filePath": "/source/system/controllers/geo/actions/widget.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "geo_backend": {
      "name": "geo",
      "className": "backendGeo",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/geo/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "groups_frontend": {
      "name": "groups",
      "className": "groups",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/groups/frontend.php",
      "actions": [
        {
          "name": "actionAcceptRequest",
          "className": "actionGroupsAcceptRequest",
          "filePath": "/source/system/controllers/groups/actions/accept_request.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionAdd",
          "className": "actionGroupsAdd",
          "filePath": "/source/system/controllers/groups/actions/add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeclineRequest",
          "className": "actionGroupsDeclineRequest",
          "filePath": "/source/system/controllers/groups/actions/decline_request.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionExpel",
          "className": "actionGroupsExpel",
          "filePath": "/source/system/controllers/groups/actions/expel.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroup",
          "className": "actionGroupsGroup",
          "filePath": "/source/system/controllers/groups/actions/group.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionGroupActivity",
          "className": "actionGroupsGroupActivity",
          "filePath": "/source/system/controllers/groups/actions/group_activity.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupApprove",
          "className": "actionGroupsGroupApprove",
          "filePath": "/source/system/controllers/groups/actions/group_approve.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupChangeOwner",
          "className": "actionGroupsGroupChangeOwner",
          "filePath": "/source/system/controllers/groups/actions/group_change_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupContent",
          "className": "actionGroupsGroupContent",
          "filePath": "/source/system/controllers/groups/actions/group_content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupDelete",
          "className": "actionGroupsGroupDelete",
          "filePath": "/source/system/controllers/groups/actions/group_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEdit",
          "className": "actionGroupsGroupEdit",
          "filePath": "/source/system/controllers/groups/actions/group_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRequests",
          "className": "actionGroupsGroupEditRequests",
          "filePath": "/source/system/controllers/groups/actions/group_edit_requests.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRoleDelete",
          "className": "actionGroupsGroupEditRoleDelete",
          "filePath": "/source/system/controllers/groups/actions/group_edit_role_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditRoles",
          "className": "actionGroupsGroupEditRoles",
          "filePath": "/source/system/controllers/groups/actions/group_edit_roles.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditStaff",
          "className": "actionGroupsGroupEditStaff",
          "filePath": "/source/system/controllers/groups/actions/group_edit_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEditStaffDelete",
          "className": "actionGroupsGroupEditStaffDelete",
          "filePath": "/source/system/controllers/groups/actions/group_edit_staff_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupEnter",
          "className": "actionGroupsGroupEnter",
          "filePath": "/source/system/controllers/groups/actions/group_enter.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupJoin",
          "className": "actionGroupsGroupJoin",
          "filePath": "/source/system/controllers/groups/actions/group_join.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupLeave",
          "className": "actionGroupsGroupLeave",
          "filePath": "/source/system/controllers/groups/actions/group_leave.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupMembers",
          "className": "actionGroupsGroupMembers",
          "filePath": "/source/system/controllers/groups/actions/group_members.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGroupUnbind",
          "className": "actionGroupsGroupUnbind",
          "filePath": "/source/system/controllers/groups/actions/group_unbind.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionGroupsIndex",
          "filePath": "/source/system/controllers/groups/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInvite",
          "className": "actionGroupsInvite",
          "filePath": "/source/system/controllers/groups/actions/invite.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteDelete",
          "className": "actionGroupsInviteDelete",
          "filePath": "/source/system/controllers/groups/actions/invite_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteFriends",
          "className": "actionGroupsInviteFriends",
          "filePath": "/source/system/controllers/groups/actions/invite_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionInviteUsers",
          "className": "actionGroupsInviteUsers",
          "filePath": "/source/system/controllers/groups/actions/invite_users.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionGroupsItemChildsView",
          "filePath": "/source/system/controllers/groups/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProcessChangeOwner",
          "className": "actionGroupsProcessChangeOwner",
          "filePath": "/source/system/controllers/groups/actions/process_change_owner.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRemoveStaff",
          "className": "actionGroupsRemoveStaff",
          "filePath": "/source/system/controllers/groups/actions/remove_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetRoles",
          "className": "actionGroupsSetRoles",
          "filePath": "/source/system/controllers/groups/actions/set_roles.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetStaff",
          "className": "actionGroupsSetStaff",
          "filePath": "/source/system/controllers/groups/actions/set_staff.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "groups_backend": {
      "name": "groups",
      "className": "backendGroups",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/groups/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "images_frontend": {
      "name": "images",
      "className": "images",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/images/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionImagesDelete",
          "filePath": "/source/system/controllers/images/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpload",
          "className": "actionImagesUpload",
          "filePath": "/source/system/controllers/images/actions/upload.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUploadWithPreset",
          "className": "actionImagesUploadWithPreset",
          "filePath": "/source/system/controllers/images/actions/upload_with_preset.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "images_backend": {
      "name": "images",
      "className": "backendImages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/images/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendImages",
          "filePath": "/source/system/controllers/images/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "languages_frontend": {
      "name": "languages",
      "className": "languages",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/languages/frontend.php",
      "actions": [
        {
          "name": "actionTr",
          "className": "actionLanguagesTr",
          "filePath": "/source/system/controllers/languages/actions/tr.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "languages_backend": {
      "name": "languages",
      "className": "backendLanguages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/languages/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "messages_frontend": {
      "name": "messages",
      "className": "messages",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/messages/frontend.php",
      "actions": [
        {
          "name": "actionContact",
          "className": "actionMessagesContact",
          "filePath": "/source/system/controllers/messages/actions/contact.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionMessagesDelete",
          "filePath": "/source/system/controllers/messages/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDeleteMesage",
          "className": "actionMessagesDeleteMesage",
          "filePath": "/source/system/controllers/messages/actions/delete_mesage.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionForgive",
          "className": "actionMessagesForgive",
          "filePath": "/source/system/controllers/messages/actions/forgive.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIgnore",
          "className": "actionMessagesIgnore",
          "filePath": "/source/system/controllers/messages/actions/ignore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionMessagesIndex",
          "filePath": "/source/system/controllers/messages/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionNoticeAction",
          "className": "actionMessagesNoticeAction",
          "filePath": "/source/system/controllers/messages/actions/notice_action.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionNotices",
          "className": "actionMessagesNotices",
          "filePath": "/source/system/controllers/messages/actions/notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRefresh",
          "className": "actionMessagesRefresh",
          "filePath": "/source/system/controllers/messages/actions/refresh.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRestoreMesage",
          "className": "actionMessagesRestoreMesage",
          "filePath": "/source/system/controllers/messages/actions/restore_mesage.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSend",
          "className": "actionMessagesSend",
          "filePath": "/source/system/controllers/messages/actions/send.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionShowOlder",
          "className": "actionMessagesShowOlder",
          "filePath": "/source/system/controllers/messages/actions/show_older.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWrite",
          "className": "actionMessagesWrite",
          "filePath": "/source/system/controllers/messages/actions/write.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "messages_backend": {
      "name": "messages",
      "className": "backendMessages",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/messages/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "moderation_frontend": {
      "name": "moderation",
      "className": "moderation",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/moderation/frontend.php",
      "actions": [
        {
          "name": "actionDraft",
          "className": "actionModerationDraft",
          "filePath": "/source/system/controllers/moderation/actions/draft.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionModerationIndex",
          "filePath": "/source/system/controllers/moderation/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionWaitingList",
          "className": "actionModerationWaitingList",
          "filePath": "/source/system/controllers/moderation/actions/waiting_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "moderation_backend": {
      "name": "moderation",
      "className": "backendModeration",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/moderation/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "photos_frontend": {
      "name": "photos",
      "className": "photos",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/photos/frontend.php",
      "actions": [
        {
          "name": "actionCamera",
          "className": "actionPhotosCamera",
          "filePath": "/source/system/controllers/photos/actions/camera.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDelete",
          "className": "actionPhotosDelete",
          "filePath": "/source/system/controllers/photos/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionDownload",
          "className": "actionPhotosDownload",
          "filePath": "/source/system/controllers/photos/actions/download.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionEdit",
          "className": "actionPhotosEdit",
          "filePath": "/source/system/controllers/photos/actions/edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionPhotosIndex",
          "filePath": "/source/system/controllers/photos/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionMore",
          "className": "actionPhotosMore",
          "filePath": "/source/system/controllers/photos/actions/more.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSetCover",
          "className": "actionPhotosSetCover",
          "filePath": "/source/system/controllers/photos/actions/set_cover.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUpload",
          "className": "actionPhotosUpload",
          "filePath": "/source/system/controllers/photos/actions/upload.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionView",
          "className": "actionPhotosView",
          "filePath": "/source/system/controllers/photos/actions/view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "photos_backend": {
      "name": "photos",
      "className": "backendPhotos",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/photos/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "queue_frontend": {
      "name": "queue",
      "className": "queue",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/queue/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "rating_frontend": {
      "name": "rating",
      "className": "rating",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/rating/frontend.php",
      "actions": [
        {
          "name": "actionInfo",
          "className": "actionRatingInfo",
          "filePath": "/source/system/controllers/rating/actions/info.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionVote",
          "className": "actionRatingVote",
          "filePath": "/source/system/controllers/rating/actions/vote.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "rating_backend": {
      "name": "rating",
      "className": "backendRating",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/rating/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "recaptcha_frontend": {
      "name": "recaptcha",
      "className": "recaptcha",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/recaptcha/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "recaptcha_backend": {
      "name": "recaptcha",
      "className": "backendRecaptcha",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/recaptcha/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "redirect_frontend": {
      "name": "redirect",
      "className": "redirect",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/redirect/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "redirect",
          "filePath": "/source/system/controllers/redirect/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "redirect_backend": {
      "name": "redirect",
      "className": "backendRedirect",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/redirect/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "renderer_frontend": {
      "name": "renderer",
      "className": "renderer",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/renderer/frontend.php",
      "actions": [],
      "hasBackendFolder": false,
      "hasModel": false
    },
    "rss_frontend": {
      "name": "rss",
      "className": "rss",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/rss/frontend.php",
      "actions": [
        {
          "name": "actionFeed",
          "className": "actionRssFeed",
          "filePath": "/source/system/controllers/rss/actions/feed.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "rss_backend": {
      "name": "rss",
      "className": "backendRss",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/rss/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "search_frontend": {
      "name": "search",
      "className": "search",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/search/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "actionSearchIndex",
          "filePath": "/source/system/controllers/search/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionOpensearch",
          "className": "actionSearchOpensearch",
          "filePath": "/source/system/controllers/search/actions/opensearch.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "search_backend": {
      "name": "search",
      "className": "backendSearch",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/search/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "sitemap_frontend": {
      "name": "sitemap",
      "className": "sitemap",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/sitemap/frontend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "actionSitemapIndex",
          "filePath": "/source/system/controllers/sitemap/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionRobots",
          "className": "actionSitemapRobots",
          "filePath": "/source/system/controllers/sitemap/actions/robots.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "sitemap_backend": {
      "name": "sitemap",
      "className": "backendSitemap",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/sitemap/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": false
    },
    "subscriptions_frontend": {
      "name": "subscriptions",
      "className": "subscriptions",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/subscriptions/frontend.php",
      "actions": [
        {
          "name": "actionEmailUnsubscribe",
          "className": "actionSubscriptionsEmailUnsubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/email_unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGuestConfirm",
          "className": "actionSubscriptionsGuestConfirm",
          "filePath": "/source/system/controllers/subscriptions/actions/guest_confirm.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionListSubscribers",
          "className": "actionSubscriptionsListSubscribers",
          "filePath": "/source/system/controllers/subscriptions/actions/list_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubscribe",
          "className": "actionSubscriptionsSubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/subscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUnsubscribe",
          "className": "actionSubscriptionsUnsubscribe",
          "filePath": "/source/system/controllers/subscriptions/actions/unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionViewList",
          "className": "actionSubscriptionsViewList",
          "filePath": "/source/system/controllers/subscriptions/actions/view_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "subscriptions_backend": {
      "name": "subscriptions",
      "className": "backendSubscriptions",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/subscriptions/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "tags_frontend": {
      "name": "tags",
      "className": "tags",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/tags/frontend.php",
      "actions": [
        {
          "name": "actionAutocomplete",
          "className": "actionTagsAutocomplete",
          "filePath": "/source/system/controllers/tags/actions/autocomplete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionTagsIndex",
          "filePath": "/source/system/controllers/tags/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "tags_backend": {
      "name": "tags",
      "className": "backendTags",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/tags/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "typograph_frontend": {
      "name": "typograph",
      "className": "typograph",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/typograph/frontend.php",
      "actions": [
        {
          "name": "actionGetSmiles",
          "className": "typograph",
          "filePath": "/source/system/controllers/typograph/frontend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\oneable"
          ]
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "typograph_backend": {
      "name": "typograph",
      "className": "backendTypograph",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/typograph/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "users_frontend": {
      "name": "users",
      "className": "users",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/users/frontend.php",
      "actions": [
        {
          "name": "actionFriendAdd",
          "className": "actionUsersFriendAdd",
          "filePath": "/source/system/controllers/users/actions/friend_add.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionFriendDelete",
          "className": "actionUsersFriendDelete",
          "filePath": "/source/system/controllers/users/actions/friend_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionIndex",
          "className": "actionUsersIndex",
          "filePath": "/source/system/controllers/users/actions/index.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionItemChildsView",
          "className": "actionUsersItemChildsView",
          "filePath": "/source/system/controllers/users/actions/item_childs_view.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionKarmaVote",
          "className": "actionUsersKarmaVote",
          "filePath": "/source/system/controllers/users/actions/karma_vote.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionKeepInSubscribers",
          "className": "actionUsersKeepInSubscribers",
          "filePath": "/source/system/controllers/users/actions/keep_in_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfile",
          "className": "actionUsersProfile",
          "filePath": "/source/system/controllers/users/actions/profile.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileContent",
          "className": "actionUsersProfileContent",
          "filePath": "/source/system/controllers/users/actions/profile_content.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileDelete",
          "className": "actionUsersProfileDelete",
          "filePath": "/source/system/controllers/users/actions/profile_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEdit",
          "className": "actionUsersProfileEdit",
          "filePath": "/source/system/controllers/users/actions/profile_edit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditNotices",
          "className": "actionUsersProfileEditNotices",
          "filePath": "/source/system/controllers/users/actions/profile_edit_notices.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditPassword",
          "className": "actionUsersProfileEditPassword",
          "filePath": "/source/system/controllers/users/actions/profile_edit_password.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditPrivacy",
          "className": "actionUsersProfileEditPrivacy",
          "filePath": "/source/system/controllers/users/actions/profile_edit_privacy.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditSessions",
          "className": "actionUsersProfileEditSessions",
          "filePath": "/source/system/controllers/users/actions/profile_edit_sessions.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditSessionsDelete",
          "className": "actionUsersProfileEditSessionsDelete",
          "filePath": "/source/system/controllers/users/actions/profile_edit_sessions_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileEditTheme",
          "className": "actionUsersProfileEditTheme",
          "filePath": "/source/system/controllers/users/actions/profile_edit_theme.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileFriends",
          "className": "actionUsersProfileFriends",
          "filePath": "/source/system/controllers/users/actions/profile_friends.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileInvites",
          "className": "actionUsersProfileInvites",
          "filePath": "/source/system/controllers/users/actions/profile_invites.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileKarma",
          "className": "actionUsersProfileKarma",
          "filePath": "/source/system/controllers/users/actions/profile_karma.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileLock",
          "className": "actionUsersProfileLock",
          "filePath": "/source/system/controllers/users/actions/profile_lock.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileRestore",
          "className": "actionUsersProfileRestore",
          "filePath": "/source/system/controllers/users/actions/profile_restore.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionProfileSubscribers",
          "className": "actionUsersProfileSubscribers",
          "filePath": "/source/system/controllers/users/actions/profile_subscribers.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionProfileTab",
          "className": "actionUsersProfileTab",
          "filePath": "/source/system/controllers/users/actions/profile_tab.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": [
            "traits\\services\\fieldsParseable"
          ]
        },
        {
          "name": "actionStatus",
          "className": "actionUsersStatus",
          "filePath": "/source/system/controllers/users/actions/status.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionStatusDelete",
          "className": "actionUsersStatusDelete",
          "filePath": "/source/system/controllers/users/actions/status_delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubscribe",
          "className": "actionUsersSubscribe",
          "filePath": "/source/system/controllers/users/actions/subscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionUnsubscribe",
          "className": "actionUsersUnsubscribe",
          "filePath": "/source/system/controllers/users/actions/unsubscribe.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "users_backend": {
      "name": "users",
      "className": "backendUsers",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/users/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendUsers",
          "filePath": "/source/system/controllers/users/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "wall_frontend": {
      "name": "wall",
      "className": "wall",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/wall/frontend.php",
      "actions": [
        {
          "name": "actionDelete",
          "className": "actionWallDelete",
          "filePath": "/source/system/controllers/wall/actions/delete.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGet",
          "className": "actionWallGet",
          "filePath": "/source/system/controllers/wall/actions/get.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionGetReplies",
          "className": "actionWallGetReplies",
          "filePath": "/source/system/controllers/wall/actions/get_replies.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        },
        {
          "name": "actionSubmit",
          "className": "actionWallSubmit",
          "filePath": "/source/system/controllers/wall/actions/submit.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "wall_backend": {
      "name": "wall",
      "className": "backendWall",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/wall/backend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "widgets_frontend": {
      "name": "widgets",
      "className": "widgets",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/widgets/frontend.php",
      "actions": [],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "backend/model.php"
    },
    "wysiwygs_frontend": {
      "name": "wysiwygs",
      "className": "wysiwygs",
      "type": "frontend",
      "extends": "cmsFrontend",
      "filePath": "/source/system/controllers/wysiwygs/frontend.php",
      "actions": [
        {
          "name": "actionLinksList",
          "className": "actionWysiwygsLinksList",
          "filePath": "/source/system/controllers/wysiwygs/actions/links_list.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    },
    "wysiwygs_backend": {
      "name": "wysiwygs",
      "className": "backendWysiwygs",
      "type": "backend",
      "extends": "cmsBackend",
      "filePath": "/source/system/controllers/wysiwygs/backend.php",
      "actions": [
        {
          "name": "actionIndex",
          "className": "backendWysiwygs",
          "filePath": "/source/system/controllers/wysiwygs/backend.php",
          "visibility": "public",
          "hasParams": false,
          "params": [],
          "traits": []
        }
      ],
      "hasBackendFolder": true,
      "hasModel": true,
      "modelFile": "model.php"
    }
  },
  "controllerCount": 61,
  "generatedAt": "2026-03-21T13:57:48.713Z"
};

export function getController(name: string, type?: 'frontend' | 'backend'): ControllerInfo | undefined {
  if (type) {
    return controllersMap.controllers.find(c => c.name === name && c.type === type);
  }
  return controllersMap.controllers.find(c => c.name === name);
}

export function getControllerActions(name: string, type?: 'frontend' | 'backend'): ControllerAction[] {
  const ctrl = getController(name, type);
  return ctrl?.actions || [];
}

export function getControllersWithBackend(): ControllerInfo[] {
  return controllersMap.controllers.filter(c => c.type === 'frontend' && c.hasBackendFolder);
}

export function getBackendControllers(): ControllerInfo[] {
  return controllersMap.controllers.filter(c => c.type === 'backend');
}
