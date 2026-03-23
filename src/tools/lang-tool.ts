export interface LangKey {
  key: string;
  value: string;
  category?: string;
}

export interface LangKeysResult {
  addon_name: string;
  keys_count: number;
  keys: LangKey[];
  template?: string;
}

export function listLangKeys(params: { addon_name: string; category?: string }): LangKeysResult {
  const { addon_name, category } = params;
  const prefix = `LANG_${addon_name.toUpperCase()}_`;

  // Генерируем типовые ключи
  const commonTemplates = [
    { key: prefix + 'CONTROLLER', value: addon_name, category: 'system' },
    { key: prefix + '_ADD', value: `Добавить ${addon_name}`, category: 'actions' },
    { key: prefix + '_EDIT', value: `Редактировать ${addon_name}`, category: 'actions' },
    { key: prefix + '_DELETE', value: `Удалить ${addon_name}`, category: 'actions' },
    { key: prefix + '_LIST', value: `Список ${addon_name}`, category: 'pages' },
    { key: prefix + '_VIEW', value: `Просмотр ${addon_name}`, category: 'pages' },
    { key: prefix + '_SAVE', value: 'Сохранить', category: 'buttons' },
    { key: prefix + '_CANCEL', value: 'Отмена', category: 'buttons' },
    { key: prefix + '_APPLY', value: 'Применить', category: 'buttons' },
    { key: prefix + '_BACK', value: 'Назад', category: 'buttons' },
    { key: prefix + '_PUBLISHED', value: 'Опубликовано', category: 'status' },
    { key: prefix + '_DRAFT', value: 'Черновик', category: 'status' },
    {
      key: prefix + '_DELETE_CONFIRM',
      value: 'Вы уверены, что хотите удалить это?',
      category: 'confirm',
    },
    { key: prefix + '_TITLE', value: 'Заголовок', category: 'fields' },
    { key: prefix + '_DESCRIPTION', value: 'Описание', category: 'fields' },
    { key: prefix + '_CONTENT', value: 'Контент', category: 'fields' },
    { key: prefix + '_DATE', value: 'Дата', category: 'fields' },
    { key: prefix + '_AUTHOR', value: 'Автор', category: 'fields' },
    { key: prefix + '_ERROR_NOT_FOUND', value: `${addon_name} не найдено`, category: 'errors' },
    { key: prefix + '_ERROR_SAVE', value: 'Ошибка сохранения', category: 'errors' },
    { key: prefix + '_ERROR_DELETE', value: 'Ошибка удаления', category: 'errors' },
    { key: prefix + '_PERM_VIEW', value: 'Просмотр', category: 'permissions' },
    { key: prefix + '_PERM_ADD', value: 'Добавление', category: 'permissions' },
    { key: prefix + '_PERM_EDIT', value: 'Редактирование', category: 'permissions' },
    { key: prefix + '_PERM_DELETE', value: 'Удаление', category: 'permissions' },
    { key: prefix + '_CREATED', value: 'Создано', category: 'dates' },
    { key: prefix + '_UPDATED', value: 'Обновлено', category: 'dates' },
    { key: prefix + '_EMPTY', value: `Нет ${addon_name}`, category: 'messages' },
    {
      key: prefix + '_SUCCESS_ADD',
      value: `${addon_name} успешно добавлено`,
      category: 'messages',
    },
    {
      key: prefix + '_SUCCESS_UPDATE',
      value: `${addon_name} успешно обновлено`,
      category: 'messages',
    },
    {
      key: prefix + '_SUCCESS_DELETE',
      value: `${addon_name} успешно удалено`,
      category: 'messages',
    },
  ];

  // Добавляем варианты для множественного числа
  commonTemplates.push(
    { key: prefix + '_COUNT', value: `Количество ${addon_name}`, category: 'fields' },
    { key: prefix + '_TOTAL', value: `Всего ${addon_name}`, category: 'fields' },
    { key: prefix + '_PER_PAGE', value: 'На странице', category: 'pagination' },
    { key: prefix + '_ORDER', value: 'Сортировка', category: 'fields' },
    { key: prefix + '_ASC', value: 'По возрастанию', category: 'sort' },
    { key: prefix + '_DESC', value: 'По убыванию', category: 'sort' }
  );

  // Фильтрация по категории
  let filtered = commonTemplates;
  if (category) {
    filtered = commonTemplates.filter(k => k.category === category);
  }

  return {
    addon_name,
    keys_count: filtered.length,
    keys: filtered,
    template: generateLangFile(addon_name, filtered),
  };
}

export function scaffoldLang(params: {
  addon_name: string;
  keys?: string[];
  custom_keys?: Array<{ key: string; value: string; category?: string }>;
}): object {
  const { addon_name, keys = [], custom_keys = [] } = params;

  const prefix = `LANG_${addon_name.toUpperCase()}_`;

  // Базовые ключи если не указаны
  const selectedKeys =
    keys.length > 0
      ? keys
      : [
          'CONTROLLER',
          'ADD',
          'EDIT',
          'DELETE',
          'LIST',
          'VIEW',
          'SAVE',
          'CANCEL',
          'APPLY',
          'BACK',
          'PUBLISHED',
          'DRAFT',
          'DELETE_CONFIRM',
          'TITLE',
          'DESCRIPTION',
          'CONTENT',
          'DATE',
          'AUTHOR',
          'ERROR_NOT_FOUND',
          'ERROR_SAVE',
          'ERROR_DELETE',
          'PERM_VIEW',
          'PERM_ADD',
          'PERM_EDIT',
          'PERM_DELETE',
          'CREATED',
          'UPDATED',
          'EMPTY',
          'SUCCESS_ADD',
          'SUCCESS_UPDATE',
          'SUCCESS_DELETE',
        ];

  const allKeys: Array<{ key: string; value: string; category?: string }> = [];

  // Добавляем выбранные базовые
  for (const k of selectedKeys) {
    const keyName = k.startsWith(prefix) ? k : prefix + k;
    allKeys.push({
      key: keyName,
      value: generateDefaultValue(addon_name, k),
      category: getCategoryForKey(k),
    });
  }

  // Добавляем кастомные
  allKeys.push(...custom_keys);

  // Сортируем по категориям
  const categories = groupByCategory(allKeys);

  return {
    addon_name,
    file_path: `system/languages/ru/controllers/${addon_name}/${addon_name}.php`,
    categories,
    file_content: generateLangFile(addon_name, allKeys),
    usage: {
      location: `/${addon_name}/system/languages/ru/controllers/${addon_name}/${addon_name}.php`,
      include_note: 'Файл подключается автоматически через cmsCore::loadControllerLanguage()',
      constants_format: "define('LANG_KEY', 'value');",
    },
  };
}

function generateDefaultValue(addonName: string, key: string): string {
  const cleanKey = key
    .replace(/^LANG_/, '')
    .replace(/^LANG_/, '')
    .replace(/_/g, ' ');

  const defaults: Record<string, string> = {
    CONTROLLER: addonName,
    ADD: `Добавить ${addonName}`,
    EDIT: `Редактировать ${addonName}`,
    DELETE: `Удалить ${addonName}`,
    LIST: `Список ${addonName}`,
    VIEW: `Просмотр ${addonName}`,
    SAVE: 'Сохранить',
    CANCEL: 'Отмена',
    APPLY: 'Применить',
    BACK: 'Назад',
    PUBLISHED: 'Опубликовано',
    DRAFT: 'Черновик',
    DELETE_CONFIRM: 'Вы уверены, что хотите удалить?',
    TITLE: 'Заголовок',
    DESCRIPTION: 'Описание',
    CONTENT: 'Контент',
    DATE: 'Дата',
    AUTHOR: 'Автор',
    ERROR_NOT_FOUND: `${addonName} не найдено`,
    ERROR_SAVE: 'Ошибка сохранения',
    ERROR_DELETE: 'Ошибка удаления',
    PERM_VIEW: 'Просмотр',
    PERM_ADD: 'Добавление',
    PERM_EDIT: 'Редактирование',
    PERM_DELETE: 'Удаление',
    CREATED: 'Создано',
    UPDATED: 'Обновлено',
    EMPTY: `Нет ${addonName}`,
    SUCCESS_ADD: `${addonName} успешно добавлено`,
    SUCCESS_UPDATE: `${addonName} успешно обновлено`,
    SUCCESS_DELETE: `${addonName} успешно удалено`,
  };

  return defaults[cleanKey] || cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1).toLowerCase();
}

function getCategoryForKey(key: string): string {
  const cleanKey = key
    .replace(/^LANG_/, '')
    .replace(/^_/, '')
    .toLowerCase();

  if (['controller'].includes(cleanKey)) return 'system';
  if (['add', 'edit', 'delete', 'save', 'cancel', 'apply', 'back'].includes(cleanKey))
    return 'actions';
  if (['list', 'view'].includes(cleanKey)) return 'pages';
  if (['published', 'draft'].includes(cleanKey)) return 'status';
  if (['title', 'description', 'content', 'date', 'author', 'ordering'].includes(cleanKey))
    return 'fields';
  if (['error', 'not_found', 'save', 'delete'].some(s => cleanKey.includes(s))) return 'errors';
  if (['perm'].includes(cleanKey.slice(0, 4))) return 'permissions';
  if (['created', 'updated'].includes(cleanKey)) return 'dates';
  if (['empty', 'success'].includes(cleanKey)) return 'messages';
  if (['count', 'total', 'per_page'].includes(cleanKey)) return 'pagination';
  if (['asc', 'desc', 'order'].includes(cleanKey)) return 'sort';

  return 'other';
}

function groupByCategory(
  keys: Array<{ key: string; value: string; category?: string }>
): Record<string, Array<{ key: string; value: string }>> {
  const groups: Record<string, Array<{ key: string; value: string }>> = {};

  for (const k of keys) {
    const cat = k.category || 'other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({ key: k.key, value: k.value });
  }

  return groups;
}

function generateLangFile(
  addonName: string,
  keys: Array<{ key: string; value: string; category?: string }>
): string {
  const grouped = groupByCategory(keys);

  const lines: string[] = [
    '<?php',
    '',
    `// ${addonName} - Language file`,
    `// Generated: ${new Date().toISOString().split('T')[0]}`,
    '',
  ];

  const categoryOrder = [
    'system',
    'actions',
    'pages',
    'buttons',
    'status',
    'fields',
    'errors',
    'permissions',
    'dates',
    'pagination',
    'sort',
    'messages',
    'other',
  ];

  for (const cat of categoryOrder) {
    if (!grouped[cat]) continue;

    lines.push(`// ── ${cat.toUpperCase()} ───────────────────────────────────────`);
    for (const k of grouped[cat]) {
      const escapedValue = k.value.replace(/'/g, "\\'");
      lines.push(`define('${k.key}', '${escapedValue}');`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
