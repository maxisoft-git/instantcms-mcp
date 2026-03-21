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
