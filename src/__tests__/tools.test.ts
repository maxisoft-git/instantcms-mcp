import { listHooks, getHookDetails, searchHooks } from '../tools/hooks-tool';
import { getAddonStructure, getComponentApi, listComponents, validateAddon, getFieldTypes, getCodeExample } from '../tools/addon-tool';
import { scaffoldAddon, scaffoldTemplate } from '../tools/scaffold-tool';
import { scaffoldLayoutScheme, listLayoutPresets } from '../tools/layout-tool';
import { introspectDatabase, listContentTypes, listDatabaseEvents, describeTable } from '../tools/db-tool';
import { analyzeController, listControllers, getControllerActionsList, listSystemTraits } from '../tools/controllers-tool';
import { listWidgets, getWidgetInfo, listTraits, getTraitInfo, listFields, getFieldInfo } from '../tools/source-tool';
import { generateMigration, generateFieldSuggestions } from '../tools/migration-tool';
import { analyzeRequirement, suggestAddonStructure } from '../tools/requirement-tool';

describe('Hooks Tool', () => {
  test('listHooks returns array', () => {
    const result = listHooks() as any;
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('hooks');
    expect(Array.isArray(result.hooks)).toBe(true);
  });

  test('listHooks with category filter', () => {
    const result = listHooks('content') as any;
    expect(result.total).toBeGreaterThan(0);
    result.hooks.forEach((hook: any) => {
      expect(hook.category).toBe('content');
    });
  });

  test('getHookDetails returns hook details', () => {
    const result = getHookDetails('content_after_add_approve') as any;
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('example');
  });

  test('getHookDetails returns error for unknown hook', () => {
    const result = getHookDetails('unknown_hook_xyz') as any;
    expect(result).toHaveProperty('error');
  });

  test('searchHooks returns matching hooks', () => {
    const result = searchHooks('user registered') as any;
    expect(result).toHaveProperty('results');
  });
});

describe('Addon Tool', () => {
  test('getAddonStructure returns structure', () => {
    const result = getAddonStructure('basic') as any;
    expect(result).toHaveProperty('type', 'basic');
    expect(result).toHaveProperty('files');
    expect(Array.isArray(result.files)).toBe(true);
  });

  test('getAddonStructure returns error for unknown type', () => {
    const result = getAddonStructure('unknown' as any) as any;
    expect(result).toHaveProperty('error');
  });

  test('getComponentApi returns component info', () => {
    const result = getComponentApi('cmsModel') as any;
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('methods');
    expect(Array.isArray(result.methods)).toBe(true);
  });

  test('getComponentApi returns error for unknown component', () => {
    const result = getComponentApi('unknownComponent') as any;
    expect(result).toHaveProperty('error');
  });

  test('listComponents returns array', () => {
    const result = listComponents() as any;
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
    expect(result).toHaveProperty('components');
  });

  test('validateAddon detects missing manifest.xml', () => {
    const result = validateAddon({'frontend.php': 'test'}) as any;
    expect(result.is_valid).toBe(false);
    expect(result.errors).toContain('Отсутствует обязательный файл: manifest.xml');
  });

  test('validateAddon passes valid addon', () => {
    const result = validateAddon({
      'manifest.xml': '<addon><name>test</name><title>Test</title><version>1.0</version></addon>',
      'install.php': 'class installerTest extends cmsInstaller { public function install() {} }',
      'uninstall.php': 'class uninstallerTest extends cmsInstaller { public function uninstall() {} }',
      'frontend.php': 'class test extends cmsFrontend { public function actionIndex() {} }'
    }) as any;
    expect(result.is_valid).toBe(true);
  });

  test('getFieldTypes returns all types', () => {
    const result = getFieldTypes() as any;
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
    expect(result).toHaveProperty('field_types');
  });

  test('getFieldTypes returns specific type', () => {
    const result = getFieldTypes('fieldString') as any;
    expect(result).toHaveProperty('name', 'fieldString');
  });

  test('getCodeExample returns examples', () => {
    const result = getCodeExample('список') as any;
    expect(result).toHaveProperty('found');
    expect(result.found).toBeGreaterThan(0);
    expect(result).toHaveProperty('examples');
  });

  test('getCodeExample returns tip for unknown task', () => {
    const result = getCodeExample('xyz_unknown_task_123') as any;
    expect(result).toHaveProperty('available_topics');
  });
});

describe('Scaffold Tool', () => {
  test('scaffoldAddon generates files', () => {
    const result = scaffoldAddon({ name: 'test_addon', title: 'Test Addon', type: 'basic' }) as any;
    expect(result).toHaveProperty('files');
    expect(Object.keys(result.files).length).toBeGreaterThan(0);
  });

  test('scaffoldAddon with_hooks generates hooks', () => {
    const result = scaffoldAddon({ name: 'test_addon', title: 'Test', type: 'with_hooks', hooks: ['content_after_add_approve'] }) as any;
    const hookContent = JSON.stringify(result.files);
    expect(hookContent).toContain('content_after_add_approve');
  });

  test('scaffoldTemplate generates template files', () => {
    const result = scaffoldTemplate({ name: 'test_theme', title: 'Test Theme' }) as any;
    expect(result).toHaveProperty('files');
    expect(Object.keys(result.files).length).toBeGreaterThan(0);
  });
});

describe('Layout Tool', () => {
  test('listLayoutPresets returns presets', () => {
    const result = listLayoutPresets() as any;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
  });

  test('scaffoldLayoutScheme with custom rows', () => {
    const result = scaffoldLayoutScheme({
      template: 'modern',
      rows: [{
        title: 'Test Row',
        cols: [{ title: 'Test Col', class: 'col-md-12' }]
      }]
    }) as any;
    expect(result).toHaveProperty('yaml');
    expect(typeof result.yaml).toBe('string');
  });
});

describe('DB Tool', () => {
  test('introspectDatabase returns tables', () => {
    const result = introspectDatabase() as any;
    expect(result).toHaveProperty('totalTables');
    expect(result.totalTables).toBeGreaterThan(0);
    expect(result).toHaveProperty('tables');
  });

  test('introspectDatabase returns specific table', () => {
    const result = introspectDatabase('users') as any;
    expect(result).toHaveProperty('table');
    expect(result.table).toContain('cms_');
  });

  test('listContentTypes returns types', () => {
    const result = listContentTypes() as any;
    expect(result).toHaveProperty('table');
    expect(result).toHaveProperty('fields');
  });

  test('listDatabaseEvents returns events', () => {
    const result = listDatabaseEvents() as any;
    expect(result).toHaveProperty('totalEvents');
    expect(result.totalEvents).toBeGreaterThan(0);
  });

  test('describeTable returns table details', () => {
    const result = describeTable('users') as any;
    expect(result).toHaveProperty('table');
    expect(result).toHaveProperty('fields');
    expect(result).toHaveProperty('indexes');
  });
});

describe('Controllers Tool', () => {
  test('analyzeController returns controller info', () => {
    const result = analyzeController('content') as any;
    expect(result).toHaveProperty('name', 'content');
    expect(result).toHaveProperty('className');
    expect(result).toHaveProperty('actions');
  });

  test('analyzeController returns backend', () => {
    const result = analyzeController('admin', 'backend') as any;
    expect(result).toHaveProperty('type', 'backend');
  });

  test('listControllers returns list', () => {
    const result = listControllers() as any;
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
    expect(result).toHaveProperty('allControllers');
  });

  test('listControllers with filter', () => {
    const result = listControllers('frontend') as any;
    expect(result).toHaveProperty('byType');
    expect(result.byType).toHaveProperty('frontend');
  });

  test('getControllerActionsList returns actions', () => {
    const result = getControllerActionsList('content') as any;
    expect(result).toHaveProperty('controller', 'content');
    expect(result).toHaveProperty('actions');
  });

  test('listSystemTraits returns traits', () => {
    const result = listSystemTraits() as any;
    expect(result).toHaveProperty('traits');
    expect(result.traits).toBeTruthy();
  });
});

describe('Source Tool', () => {
  test('listWidgets returns widgets', () => {
    const result = listWidgets() as any;
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
    expect(result).toHaveProperty('widgets');
  });

  test('getWidgetInfo returns widget details', () => {
    const result = getWidgetInfo('text') as any;
    expect(result).toHaveProperty('name', 'text');
    expect(result).toHaveProperty('className');
    expect(result).toHaveProperty('optionsFormPath');
  });

  test('getWidgetInfo returns error for unknown widget', () => {
    const result = getWidgetInfo('unknown_widget_xyz') as any;
    expect(result).toHaveProperty('error');
  });

  test('listTraits returns traits', () => {
    const result = listTraits() as any;
    expect(result).toHaveProperty('traits');
  });

  test('getTraitInfo returns trait details', () => {
    const result = getTraitInfo('fieldsParseable') as any;
    expect(result).toHaveProperty('name', 'fieldsParseable');
    expect(result).toHaveProperty('methods');
  });

  test('listFields returns field types', () => {
    const result = listFields() as any;
    expect(result).toHaveProperty('total');
    expect(result.total).toBeGreaterThan(0);
  });

  test('getFieldInfo returns field details', () => {
    const result = getFieldInfo('string') as any;
    expect(result).toHaveProperty('name', 'string');
    expect(result).toHaveProperty('options');
  });

  test('getFieldInfo returns error for unknown field', () => {
    const result = getFieldInfo('unknown_field_xyz') as any;
    expect(result).toHaveProperty('error');
  });
});

describe('Migration Tool', () => {
  test('generateMigration generates install.php and SQL', () => {
    const result = generateMigration('test_items', [
      { name: 'title', type: 'varchar(255)' },
      { name: 'content', type: 'text' }
    ]) as any;
    expect(result).toHaveProperty('install_php');
    expect(result).toHaveProperty('sql');
    expect(result).toHaveProperty('table_name');
  });

  test('generateMigration with all options', () => {
    const result = generateMigration('products', [
      { name: 'title', type: 'varchar(255)', nullable: false, default: 'New', comment: 'Product title' },
      { name: 'price', type: 'decimal(10,2)', nullable: true },
      { name: 'created_at', type: 'datetime' }
    ]) as any;
    expect(result.sql).toContain('NOT NULL');
    expect(result.install_php).toContain('createTable');
  });

  test('generateFieldSuggestions returns suggestions', () => {
    const result = generateFieldSuggestions('string') as any;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('generateFieldSuggestions for all types', () => {
    const types = ['string', 'text', 'number', 'datetime', 'user', 'bool'] as const;
    types.forEach(type => {
      const result = generateFieldSuggestions(type) as any;
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

describe('Requirement Tool', () => {
  test('analyzeRequirement returns analysis', () => {
    const result = analyzeRequirement('каталог товаров') as any;
    expect(result).toHaveProperty('addon_type');
    expect(result).toHaveProperty('features');
    expect(result).toHaveProperty('suggested_title');
  });

  test('suggestAddonStructure returns structure', () => {
    const result = suggestAddonStructure('with_admin') as any;
    expect(result).toHaveProperty('type', 'with_admin');
    expect(result).toHaveProperty('files');
    expect(result).toHaveProperty('description');
  });
});

describe('Core Parser', () => {
  test('parseCoreFile parses user.php correctly', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/user.php');
    expect(result).not.toBeNull();
    expect(result.name).toBe('cmsUser');
    expect(result.file).toBe('user');
    expect(result.methods.length).toBeGreaterThan(0);
  });

  test('parseCoreFile parses database.php correctly', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/database.php');
    expect(result).not.toBeNull();
    expect(result.name).toBe('cmsDatabase');
    expect(result.methods.length).toBeGreaterThan(40);
  });

  test('parseCoreFile parses config.php correctly', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/config.php');
    expect(result).not.toBeNull();
    expect(result.name).toBe('cmsConfig');
    expect(result.extends).toBe('cmsConfigs');
  });

  test('parseCoreFile parses autoloader.php correctly', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/autoloader.php');
    expect(result).not.toBeNull();
    expect(result.methods.length).toBeGreaterThan(0);
  });

  test('parseAllCoreFiles finds 38 classes', () => {
    const { parseAllCoreFiles } = require('../tools/parser/core-parser');
    const result = parseAllCoreFiles('./source');
    expect(result.length).toBe(38);
  });

  test('cmsUser has some public methods', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/user.php');
    const publicMethods = result.methods.filter((m: any) => m.visibility === 'public');
    expect(publicMethods.length).toBeGreaterThan(0);
  });

  test('cmsDatabase has expected public methods', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/database.php');
    const publicMethods = result.methods.filter((m: any) => m.visibility === 'public');
    expect(publicMethods.some((m: any) => m.name === 'query')).toBe(true);
    expect(publicMethods.some((m: any) => m.name === 'insert')).toBe(true);
    expect(publicMethods.some((m: any) => m.name === 'update')).toBe(true);
    expect(publicMethods.some((m: any) => m.name === 'delete')).toBe(true);
  });

  test('cmsPermissions has expected methods', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/permissions.php');
    const publicMethods = result.methods.filter((m: any) => m.visibility === 'public');
    expect(publicMethods.some((m: any) => m.name === 'isAllowed')).toBe(true);
    expect(publicMethods.some((m: any) => m.name === 'isDenied')).toBe(true);
  });

  test('cmsPaginator has some methods', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/paginator.php');
    expect(result.methods.length).toBeGreaterThan(0);
  });

  test('cmsResponse has some public methods', () => {
    const { parseCoreFile } = require('../tools/parser/core-parser');
    const result = parseCoreFile('./source/system/core/response.php');
    const publicMethods = result.methods.filter((m: any) => m.visibility === 'public');
    expect(publicMethods.length).toBeGreaterThan(0);
    expect(publicMethods.some((m: any) => m.name === 'send')).toBe(true);
  });

  test('all core classes have required properties', () => {
    const { parseAllCoreFiles } = require('../tools/parser/core-parser');
    const classes = parseAllCoreFiles('./source');
    classes.forEach((cls: any) => {
      expect(cls).toHaveProperty('name');
      expect(cls).toHaveProperty('file');
      expect(cls).toHaveProperty('methods');
      expect(cls).toHaveProperty('properties');
      expect(cls).toHaveProperty('constants');
    });
  });

  test('coreClasses array has 38 entries', () => {
    const { coreClasses } = require('../data/core-api');
    expect(coreClasses.length).toBe(38);
  });

  test('coreAPIMap has all 38 classes', () => {
    const { coreAPIMap } = require('../data/core-api');
    expect(Object.keys(coreAPIMap).length).toBe(38);
  });

  test('cmsTemplate has many methods', () => {
    const { coreAPIMap } = require('../data/core-api');
    expect(coreAPIMap.cmsTemplate.methods.length).toBeGreaterThan(100);
  });

  test('cmsModel has many methods', () => {
    const { coreAPIMap } = require('../data/core-api');
    expect(coreAPIMap.cmsModel.methods.length).toBeGreaterThan(50);
  });

  test('cmsDatabase has many methods', () => {
    const { coreAPIMap } = require('../data/core-api');
    expect(coreAPIMap.cmsDatabase.methods.length).toBeGreaterThan(40);
  });

  test('coreAPIMap method signatures are valid strings', () => {
    const { coreAPIMap } = require('../data/core-api') as any;
    for (const cls of Object.values(coreAPIMap) as any[]) {
      for (const method of cls.methods) {
        expect(typeof method.signature).toBe('string');
        expect(method.signature.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('Libs API', () => {
  test('libsData has helpers, classes and thirdParty', () => {
    const { libsData } = require('../data/libs-api');
    expect(libsData).toHaveProperty('helpers');
    expect(libsData).toHaveProperty('classes');
    expect(libsData).toHaveProperty('thirdParty');
  });

  test('helpers has 4 modules', () => {
    const { libsData } = require('../data/libs-api');
    expect(Object.keys(libsData.helpers).length).toBe(4);
    expect(libsData.helpers).toHaveProperty('template');
    expect(libsData.helpers).toHaveProperty('html');
    expect(libsData.helpers).toHaveProperty('files');
    expect(libsData.helpers).toHaveProperty('strings');
  });

  test('template helper has many functions', () => {
    const { libsData } = require('../data/libs-api');
    expect(libsData.helpers.template.functions.length).toBeGreaterThan(20);
  });

  test('html helper has many functions', () => {
    const { libsData } = require('../data/libs-api');
    expect(libsData.helpers.html.functions.length).toBeGreaterThan(25);
  });

  test('files helper has many functions', () => {
    const { libsData } = require('../data/libs-api');
    expect(libsData.helpers.files.functions.length).toBeGreaterThan(10);
  });

  test('strings helper has many functions', () => {
    const { libsData } = require('../data/libs-api');
    expect(libsData.helpers.strings.functions.length).toBeGreaterThan(30);
  });

  test('classes has 6 class libraries', () => {
    const { libsData } = require('../data/libs-api');
    expect(Object.keys(libsData.classes).length).toBe(6);
    expect(libsData.classes).toHaveProperty('jevix');
    expect(libsData.classes).toHaveProperty('googleAuthenticator');
    expect(libsData.classes).toHaveProperty('mobileDetect');
    expect(libsData.classes).toHaveProperty('lastRSS');
    expect(libsData.classes).toHaveProperty('idnaConvert');
    expect(libsData.classes).toHaveProperty('spyc');
  });

  test('thirdParty has 3 libraries', () => {
    const { libsData } = require('../data/libs-api');
    expect(Object.keys(libsData.thirdParty).length).toBe(3);
    expect(libsData.thirdParty).toHaveProperty('scssphp');
    expect(libsData.thirdParty).toHaveProperty('geshi');
    expect(libsData.thirdParty).toHaveProperty('phpmailer');
  });
});

describe('Database Schema', () => {
  test('databaseSchema has all required tables', () => {
    const { databaseSchema } = require('../data/database-schema');
    expect(databaseSchema.tableCount).toBe(50);
  });

  test('databaseSchema has cms_users table', () => {
    const { databaseSchema } = require('../data/database-schema');
    const usersTable = databaseSchema.tables.find((t: any) => t.name === 'cms_users');
    expect(usersTable).toBeDefined();
    expect(usersTable.fields.length).toBeGreaterThan(10);
  });

  test('databaseSchema has cms_content_types table', () => {
    const { databaseSchema } = require('../data/database-schema');
    const ctTable = databaseSchema.tables.find((t: any) => t.name === 'cms_content_types');
    expect(ctTable).toBeDefined();
  });

  test('all tables have name and fields', () => {
    const { databaseSchema } = require('../data/database-schema');
    databaseSchema.tables.forEach((table: any) => {
      expect(table).toHaveProperty('name');
      expect(table).toHaveProperty('fields');
      expect(Array.isArray(table.fields)).toBe(true);
    });
  });

  test('all tables have indexes', () => {
    const { databaseSchema } = require('../data/database-schema');
    databaseSchema.tables.forEach((table: any) => {
      expect(table).toHaveProperty('indexes');
      expect(Array.isArray(table.indexes)).toBe(true);
    });
  });
});

describe('Events Map', () => {
  test('eventsMap has 95 events', () => {
    const { eventsMap } = require('../data/events-map');
    expect(eventsMap.eventCount).toBe(95);
  });

  test('eventsMap has byEvent lookup', () => {
    const { eventsMap } = require('../data/events-map');
    expect(eventsMap.byEvent).toBeDefined();
    expect(typeof eventsMap.byEvent).toBe('object');
  });

  test('eventsMap has byController lookup', () => {
    const { eventsMap } = require('../data/events-map');
    expect(eventsMap.byController).toBeDefined();
  });

  test('events have required properties', () => {
    const { eventsMap } = require('../data/events-map');
    eventsMap.events.slice(0, 10).forEach((event: any) => {
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('event');
      expect(event).toHaveProperty('listener');
    });
  });
});

describe('Widgets Map', () => {
  test('widgetsMap has 4 system widgets', () => {
    const { widgetsMap } = require('../data/widgets-map');
    expect(widgetsMap.widgetCount).toBe(4);
  });

  test('widgetsMap has text, menu, html, template', () => {
    const { widgetsMap } = require('../data/widgets-map');
    expect(widgetsMap.byName).toHaveProperty('text');
    expect(widgetsMap.byName).toHaveProperty('menu');
    expect(widgetsMap.byName).toHaveProperty('html');
    expect(widgetsMap.byName).toHaveProperty('template');
  });

  test('getWidget function works', () => {
    const { getWidget } = require('../data/widgets-map');
    const textWidget = getWidget('text');
    expect(textWidget).toBeDefined();
    expect(textWidget.name).toBe('text');
  });

  test('all widgets have className', () => {
    const { widgetsMap } = require('../data/widgets-map');
    widgetsMap.widgets.forEach((widget: any) => {
      expect(widget).toHaveProperty('className');
      expect(widget.className).toMatch(/^widget/);
    });
  });
});

describe('Traits Map', () => {
  test('traitsMap has traits', () => {
    const { traitsMap } = require('../data/traits-map');
    expect(traitsMap.traits.length).toBeGreaterThan(5);
  });

  test('traitsMap has byNamespace', () => {
    const { traitsMap } = require('../data/traits-map');
    expect(traitsMap.byNamespace).toBeDefined();
    expect(Object.keys(traitsMap.byNamespace).length).toBeGreaterThan(0);
  });

  test('listgrid trait exists', () => {
    const { traitsMap } = require('../data/traits-map');
    const listgrid = traitsMap.traits.find((t: any) => t.name === 'listgrid');
    expect(listgrid).toBeDefined();
  });

  test('all traits have methods', () => {
    const { traitsMap } = require('../data/traits-map');
    traitsMap.traits.forEach((trait: any) => {
      expect(trait).toHaveProperty('methods');
      expect(Array.isArray(trait.methods)).toBe(true);
    });
  });
});

describe('Fields Map', () => {
  test('fieldsMap has 31+ field types', () => {
    const { fieldsMap } = require('../data/fields-map');
    expect(fieldsMap.fieldCount).toBeGreaterThan(30);
  });

  test('fieldsMap has string, number, list fields', () => {
    const { fieldsMap } = require('../data/fields-map');
    expect(fieldsMap.byName).toHaveProperty('string');
    expect(fieldsMap.byName).toHaveProperty('number');
    expect(fieldsMap.byName).toHaveProperty('list');
  });

  test('fields have options array', () => {
    const { fieldsMap } = require('../data/fields-map');
    const stringField = fieldsMap.byName['string'];
    expect(stringField.options).toBeDefined();
    expect(Array.isArray(stringField.options)).toBe(true);
  });

  test('fields have validationRules', () => {
    const { fieldsMap } = require('../data/fields-map');
    const numberField = fieldsMap.byName['number'];
    expect(numberField.validationRules).toBeDefined();
  });
});

describe('Controllers Map', () => {
  test('controllersMap has 61+ controllers', () => {
    const { controllersMap } = require('../data/controllers-map');
    expect(controllersMap.controllerCount).toBeGreaterThan(60);
  });

  test('controllersMap has activity_frontend, admin_frontend, content_frontend', () => {
    const { controllersMap } = require('../data/controllers-map');
    expect(controllersMap.byName).toHaveProperty('activity_frontend');
    expect(controllersMap.byName).toHaveProperty('admin_frontend');
    expect(controllersMap.byName).toHaveProperty('content_frontend');
  });

  test('content_frontend controller has many actions', () => {
    const { controllersMap } = require('../data/controllers-map');
    const content = controllersMap.byName['content_frontend'];
    expect(content).toBeDefined();
    expect(content.actions.length).toBeGreaterThan(5);
  });

  test('controllers have frontend and backend', () => {
    const { controllersMap } = require('../data/controllers-map');
    const activity = controllersMap.controllers.filter((c: any) => c.name === 'activity');
    expect(activity.length).toBeGreaterThanOrEqual(2);
  });
});

describe('Components API', () => {
  test('components array has cmsModel', () => {
    const { components } = require('../data/components');
    const cmsModel = components.find((c: any) => c.name === 'cmsModel');
    expect(cmsModel).toBeDefined();
    expect(cmsModel.methods.length).toBeGreaterThan(30);
  });

  test('components have required properties', () => {
    const { components } = require('../data/components');
    components.forEach((comp: any) => {
      expect(comp).toHaveProperty('name');
      expect(comp).toHaveProperty('class');
      expect(comp).toHaveProperty('methods');
    });
  });

  test('cmsModel has filterEqual method', () => {
    const { components } = require('../data/components');
    const cmsModel = components.find((c: any) => c.name === 'cmsModel');
    const filterEqual = cmsModel.methods.find((m: any) => m.name === 'filterEqual');
    expect(filterEqual).toBeDefined();
  });
});

describe('Hooks Data', () => {
  test('hooks array has 102 hooks', () => {
    const { hooks } = require('../data/hooks');
    expect(hooks.length).toBe(102);
  });

  test('hooks have required properties', () => {
    const { hooks } = require('../data/hooks');
    hooks.forEach((hook: any) => {
      expect(hook).toHaveProperty('name');
      expect(hook).toHaveProperty('type');
      expect(hook).toHaveProperty('category');
      expect(hook).toHaveProperty('parameters');
    });
  });

  test('content_after_add_approve hook exists', () => {
    const { hooks } = require('../data/hooks');
    const hook = hooks.find((h: any) => h.name === 'content_after_add_approve');
    expect(hook).toBeDefined();
    expect(hook.type).toBe('action');
  });
});

describe('Routes Map', () => {
  test('routesMap has content and photos controllers', () => {
    const { routesMap } = require('../data/routes-map');
    expect(routesMap.controllers.length).toBe(2);
    expect(routesMap.routeCount).toBeGreaterThan(30);
  });

  test('content controller has many routes', () => {
    const { getRoutesByController } = require('../data/routes-map');
    const content = getRoutesByController('content');
    expect(content).toBeDefined();
    expect(content.routes.length).toBeGreaterThan(20);
  });

  test('all routes have pattern and action', () => {
    const { routesMap } = require('../data/routes-map');
    routesMap.controllers.forEach((ctrl: any) => {
      ctrl.routes.forEach((route: any) => {
        expect(route).toHaveProperty('pattern');
        expect(route).toHaveProperty('action');
      });
    });
  });
});

describe('Zod Validation', () => {
  const {
    validateHook,
    validateComponent,
    validateField,
    validateWidget,
    validateTrait,
    validateTable,
    validateEvent,
    validateController,
    validateRoute,
    validateDatabaseSchema,
    validateEventsMap,
    validateControllersMap,
    validateRoutesMap,
    validateCoreClass
  } = require('../data/schemas-validation');

  test('validateHook accepts valid hook', () => {
    const { hooks } = require('../data/hooks');
    const result = validateHook(hooks[0]);
    expect(result.success).toBe(true);
  });

  test('validateHook rejects invalid data', () => {
    const result = validateHook({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateComponent accepts valid component', () => {
    const { components } = require('../data/components');
    const result = validateComponent(components[0]);
    expect(result.success).toBe(true);
  });

  test('validateComponent rejects invalid data', () => {
    const result = validateComponent({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateField accepts valid field', () => {
    const { fieldsMap } = require('../data/fields-map');
    const result = validateField(fieldsMap.fields[0]);
    expect(result.success).toBe(true);
  });

  test('validateField rejects invalid data', () => {
    const result = validateField({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateWidget accepts valid widget', () => {
    const { widgetsMap } = require('../data/widgets-map');
    const result = validateWidget(widgetsMap.widgets[0]);
    expect(result.success).toBe(true);
  });

  test('validateWidget rejects invalid data', () => {
    const result = validateWidget({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateTrait accepts valid trait', () => {
    const { traitsMap } = require('../data/traits-map');
    const result = validateTrait(traitsMap.traits[0]);
    expect(result.success).toBe(true);
  });

  test('validateTrait rejects invalid data', () => {
    const result = validateTrait({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateTable accepts valid table', () => {
    const { databaseSchema } = require('../data/database-schema');
    const result = validateTable(databaseSchema.tables[0]);
    expect(result.success).toBe(true);
  });

  test('validateTable rejects invalid data', () => {
    const result = validateTable({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateEvent accepts valid event', () => {
    const { eventsMap } = require('../data/events-map');
    const result = validateEvent(eventsMap.events[0]);
    expect(result.success).toBe(true);
  });

  test('validateEvent rejects invalid data', () => {
    const result = validateEvent({ id: 'not-a-number' });
    expect(result.success).toBe(false);
  });

  test('validateController accepts valid controller', () => {
    const { controllersMap } = require('../data/controllers-map');
    const result = validateController(controllersMap.controllers[0]);
    expect(result.success).toBe(true);
  });

  test('validateController rejects invalid data', () => {
    const result = validateController({ name: 123 });
    expect(result.success).toBe(false);
  });

  test('validateRoute accepts valid route', () => {
    const { routesMap } = require('../data/routes-map');
    const result = validateRoute(routesMap.controllers[0].routes[0]);
    expect(result.success).toBe(true);
  });

  test('validateRoute rejects invalid data', () => {
    const result = validateRoute({ pattern: 123 });
    expect(result.success).toBe(false);
  });

  test('validateDatabaseSchema accepts valid schema', () => {
    const { databaseSchema } = require('../data/database-schema');
    const result = validateDatabaseSchema(databaseSchema);
    expect(result.success).toBe(true);
  });

  test('validateDatabaseSchema rejects invalid data', () => {
    const result = validateDatabaseSchema({ tables: 'not-array' });
    expect(result.success).toBe(false);
  });

  test('validateEventsMap accepts valid map', () => {
    const { eventsMap } = require('../data/events-map');
    const result = validateEventsMap(eventsMap);
    expect(result.success).toBe(true);
  });

  test('validateEventsMap rejects invalid data', () => {
    const result = validateEventsMap({ events: 'not-array' });
    expect(result.success).toBe(false);
  });

  test('validateControllersMap accepts valid map', () => {
    const { controllersMap } = require('../data/controllers-map');
    const result = validateControllersMap(controllersMap);
    expect(result.success).toBe(true);
  });

  test('validateControllersMap rejects invalid data', () => {
    const result = validateControllersMap({ controllers: 'not-array' });
    expect(result.success).toBe(false);
  });

  test('validateRoutesMap accepts valid map', () => {
    const { routesMap } = require('../data/routes-map');
    const result = validateRoutesMap(routesMap);
    expect(result.success).toBe(true);
  });

  test('validateRoutesMap rejects invalid data', () => {
    const result = validateRoutesMap({ controllers: 'not-array' });
    expect(result.success).toBe(false);
  });

  test('validateCoreClass accepts valid class', () => {
    const { coreClasses } = require('../data/core-api');
    const result = validateCoreClass(coreClasses[0]);
    expect(result.success).toBe(true);
  });

  test('validateCoreClass rejects invalid data', () => {
    const result = validateCoreClass({ name: 123 });
    expect(result.success).toBe(false);
  });
});

describe('List Routes Tool', () => {
  const { listRoutes } = require('../tools/source-tool');

  test('listRoutes returns all routes without filter', () => {
    const result = listRoutes();
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('controllersCount');
    expect(result.total).toBeGreaterThan(30);
  });

  test('listRoutes returns routes for content controller', () => {
    const result = listRoutes('content');
    expect(result).toHaveProperty('controller', 'content');
    expect(result).toHaveProperty('routes');
    expect(result.routes.length).toBeGreaterThan(20);
  });

  test('listRoutes returns routes for photos controller', () => {
    const result = listRoutes('photos');
    expect(result).toHaveProperty('controller', 'photos');
    expect(result).toHaveProperty('routes');
    expect(result.routes.length).toBe(2);
  });

  test('listRoutes returns error for unknown controller', () => {
    const result = listRoutes('unknown_controller');
    expect(result).toHaveProperty('error');
  });
});

describe('Hooks Tool Extended', () => {
  const { listHooks, getHookDetails, searchHooks } = require('../tools/hooks-tool');

  test('listHooks returns all hooks by default', () => {
    const result = listHooks();
    expect(result.total).toBe(102);
  });

  test('listHooks filters by category engine', () => {
    const result = listHooks('engine');
    expect(result.total).toBe(9);
    result.hooks.forEach((h: any) => {
      expect(h.category).toBe('engine');
    });
  });

  test('listHooks filters by type action', () => {
    const result = listHooks(undefined, 'action');
    expect(result.total).toBeGreaterThan(40);
    result.hooks.forEach((h: any) => {
      expect(h.type).toMatch(/action/);
    });
  });

  test('getHookDetails returns content_after_add_approve', () => {
    const result = getHookDetails('content_after_add_approve');
    expect(result.name).toBe('content_after_add_approve');
    expect(result.type).toBe('action');
  });

  test('getHookDetails returns html_filter', () => {
    const result = getHookDetails('html_filter');
    expect(result.name).toBe('html_filter');
    expect(result.type).toBe('filter');
  });

  test('searchHooks finds hooks by keyword', () => {
    const result = searchHooks('user');
    expect(result.results.length).toBeGreaterThan(0);
  });
});

describe('Components Tool Extended', () => {
  const { getAddonStructure, getComponentApi, listComponents, getFieldTypes } = require('../tools/addon-tool');

  test('getAddonStructure basic type', () => {
    const result = getAddonStructure('basic');
    expect(result.type).toBe('basic');
    expect(result.files.length).toBeGreaterThan(0);
  });

  test('getAddonStructure with_admin type', () => {
    const result = getAddonStructure('with_admin');
    expect(result.type).toBe('with_admin');
  });

  test('listComponents returns components object', () => {
    const result = listComponents();
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('components');
    expect(result.total).toBeGreaterThan(0);
  });

  test('getComponentApi returns cmsModel', () => {
    const result = getComponentApi('cmsModel');
    expect(result).toHaveProperty('name', 'cmsModel');
    expect(result.methods.length).toBeGreaterThan(30);
  });

  test('getComponentApi returns cmsTemplate', () => {
    const result = getComponentApi('cmsTemplate');
    expect(result).toHaveProperty('name', 'cmsTemplate');
  });

  test('getComponentApi returns error for unknown', () => {
    const result = getComponentApi('unknownClass');
    expect(result).toHaveProperty('error');
  });

  test('getFieldTypes returns field types object', () => {
    const result = getFieldTypes();
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('field_types');
    expect(result.total).toBeGreaterThan(0);
  });
});

describe('Scaffold Tool', () => {
  const { scaffoldAddon, scaffoldTemplate } = require('../tools/scaffold-tool');

  test('scaffoldAddon returns files object', () => {
    const result = scaffoldAddon({
      name: 'test_addon',
      title: 'Test Addon'
    });
    expect(result).toHaveProperty('addon_name');
    expect(result).toHaveProperty('files');
    expect(result.addon_name).toBe('test_addon');
    expect(result.files_count).toBeGreaterThan(0);
  });

  test('scaffoldAddon includes backend for with_admin type', () => {
    const result = scaffoldAddon({
      name: 'test_addon',
      title: 'Test Addon',
      type: 'with_admin'
    });
    expect(result.type).toBe('with_admin');
    const backendKey = Object.keys(result.files).find(k => k.endsWith('backend.php'));
    expect(backendKey).toBeTruthy();
  });

  test('scaffoldAddon includes hooks if specified', () => {
    const result = scaffoldAddon({
      name: 'test_addon',
      title: 'Test Addon',
      hooks: ['content_after_add_approve']
    });
    expect(JSON.stringify(result.files)).toContain('content_after_add_approve');
  });

  test('scaffoldTemplate returns template structure', () => {
    const result = scaffoldTemplate({
      name: 'test_template',
      title: 'Test Template'
    });
    expect(result).toHaveProperty('template_name');
    expect(result).toHaveProperty('files');
    expect(result.template_name).toBe('test_template');
  });
});
