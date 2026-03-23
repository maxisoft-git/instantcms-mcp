import { z } from 'zod';

const FilterTypeEnum = z.enum([
  'text',
  'select',
  'multiselect',
  'checkbox',
  'range',
  'date',
  'daterange',
]);
type FilterType = z.infer<typeof FilterTypeEnum>;

interface FilterField {
  field: string;
  type: FilterType;
  label?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ScaffoldFilterOptions {
  addon_name: string;
  fields: FilterField[];
  options?: {
    use_ajax?: boolean;
    use_url_params?: boolean;
    save_filters?: boolean;
  };
}

export function scaffoldFilter(opts: ScaffoldFilterOptions): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const files: Record<string, string> = {};

  const filterFields = opts.fields.map(f => ({
    field: f.field,
    type: f.type,
    label: f.label || f.field,
    options: f.options || [],
    placeholder: f.placeholder || '',
  }));

  files[`${name}/filters.php`] = generateFilterClass(name, Name, filterFields);

  files[`${name}/filter.form.php`] = generateFilterForm(name, Name, filterFields);

  files[`system/hooks/${name}/filter.hooks.php`] = generateFilterHooks(name, Name, filterFields);

  if (opts.options?.save_filters) {
    files[`${name}/saved_filters.php`] = generateSavedFilters(name, Name, filterFields);
  }

  return {
    addon_name: name,
    filters_count: filterFields.length,
    options: opts.options || {},
    files,
    filters: filterFields.map(f => ({
      field: f.field,
      type: f.type,
      label: f.label,
    })),
  };
}

function generateFilterClass(name: string, Name: string, fields: any[]): string {
  const filterInit = fields
    .map(f => {
      return `        '${f.field}' => [
            'type' => '${f.type}',
            'label' => '${f.label}',
            'options' => [${f.options.map((o: { value: string; label: string }) => `'${o.value}' => '${o.label}'`).join(', ')}],
        ]`;
    })
    .join(',\n');

  const applyConditions = fields
    .map(f => {
      switch (f.type) {
        case 'text':
          return `        if (!empty($filters['${f.field}'])) {
            $where[] = "${f.field} LIKE '%" . db::escapeLike($filters['${f.field}']) . "%'";
        }`;
        case 'select':
          return `        if (!empty($filters['${f.field}'])) {
            $where[] = "${f.field} = '" . db::escape($filters['${f.field}']) . "'";
        }`;
        case 'multiselect':
          return `        if (!empty($filters['${f.field}']) && is_array($filters['${f.field}'])) {
            $ids = array_map('intval', $filters['${f.field}']);
            $where[] = "${f.field} IN (" . implode(',', $ids) . ")";
        }`;
        case 'checkbox':
          return `        if (isset($filters['${f.field}'])) {
            $where[] = "${f.field} = " . (int)$filters['${f.field}'];
        }`;
        case 'range':
          return `        if (!empty($filters['${f.field}_from'])) {
            $where[] = "${f.field} >= " . (float)$filters['${f.field}_from'];
        }
        if (!empty($filters['${f.field}_to'])) {
            $where[] = "${f.field} <= " . (float)$filters['${f.field}_to'];
        }`;
        case 'date':
          return `        if (!empty($filters['${f.field}'])) {
            $where[] = "DATE(${f.field}) = '" . db::escape($filters['${f.field}']) . "'";
        }`;
        case 'daterange':
          return `        if (!empty($filters['${f.field}_from'])) {
            $where[] = "${f.field} >= '" . db::escape($filters['${f.field}_from']) . "'";
        }
        if (!empty($filters['${f.field}_to'])) {
            $where[] = "${f.field} <= '" . db::escape($filters['${f.field}_to']) . "'";
        }`;
        default:
          return '';
      }
    })
    .join('\n');

  return `<?php
// InstantCMS 2. ${name}/filters.php

class ${Name}Filter {
    private static $instance = null;
    private $filters = [];
    
    private function __construct() {
        $this->filters = $this->getDefaultFilters();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getDefaultFilters() {
        return [
${filterInit}
        ];
    }
    
    public function apply($model, $filters = []) {
        if (empty($filters)) {
            return $model;
        }
        
        $where = [];
${applyConditions}
        
        if (!empty($where)) {
            $model->where(implode(' AND ', $where));
        }
        
        return $model;
    }
    
    public function getFromRequest($request) {
        $filters = [];
        foreach ($this->filters as $field => $config) {
            $value = $request->get($field);
            if ($value !== null && $value !== '') {
                $filters[$field] = $value;
            }
        }
        return $filters;
    }
    
    public function validate($filters) {
        $errors = [];
        
        foreach ($filters as $field => $value) {
            if (!isset($this->filters[$field])) {
                continue;
            }
            
            $config = $this->filters[$field];
            
            switch ($config['type']) {
                case 'text':
                    if (strlen($value) > 255) {
                        $errors[$field] = 'Слишком длинное значение';
                    }
                    break;
                case 'select':
                    if (!isset($config['options'][$value])) {
                        $errors[$field] = 'Недопустимое значение';
                    }
                    break;
                case 'multiselect':
                    if (!is_array($value)) {
                        $errors[$field] = 'Ожидался массив';
                    }
                    break;
                case 'range':
                case 'daterange':
                    if (!is_numeric($value) && !strtotime($value)) {
                        $errors[$field] = 'Недопустимое значение';
                    }
                    break;
            }
        }
        
        return $errors;
    }
}`;
}

function generateFilterForm(name: string, Name: string, fields: any[]): string {
  const formFields = fields
    .map(f => {
      const placeholder = f.placeholder ? `, 'placeholder' => '${f.placeholder}'` : '';

      switch (f.type) {
        case 'text':
          return `        $form->addField('${f.field}', new fieldString('${f.label}', [${placeholder}]));`;
        case 'select': {
          const opts =
            f.options.length > 0
              ? `['options' => [${f.options.map((o: { value: string; label: string }) => `'${o.value}' => '${o.label}'`).join(', ')}]]`
              : '';
          return `        $form->addField('${f.field}', new fieldList('${f.label}', ${opts}));`;
        }
        case 'multiselect': {
          const multiOpts =
            f.options.length > 0
              ? `['options' => [${f.options.map((o: { value: string; label: string }) => `'${o.value}' => '${o.label}'`).join(', ')}]]`
              : '';
          return `        $form->addField('${f.field}', new fieldList('${f.label}', ['is_multiple' => true${multiOpts ? ', ' + multiOpts : ''}]));`;
        }
        case 'checkbox':
          return `        $form->addField('${f.field}', new fieldCheckbox('${f.label}'));`;
        case 'range':
          return `        $form->addField('${f.field}_from', new fieldNumber('${f.label} (от)'));
        $form->addField('${f.field}_to', new fieldNumber('${f.label} (до)'));`;
        case 'date':
          return `        $form->addField('${f.field}', new fieldDate('${f.label}'));`;
        case 'daterange':
          return `        $form->addField('${f.field}_from', new fieldDate('${f.label} (от)'));
        $form->addField('${f.field}_to', new fieldDate('${f.label} (до)'));`;
        default:
          return '';
      }
    })
    .join('\n');

  return `<?php
// InstantCMS 2. ${name}/filter.form.php

class ${Name}FilterForm {
    public function __construct($form) {
${formFields}
    }
    
    public static function create($form) {
        return new self($form);
    }
}`;
}

function generateFilterHooks(name: string, Name: string, _fields: any[]): string {
  return `<?php
// InstantCMS 2. system/hooks/${name}/filter.hooks.php

class on${Name}FilterHook {
    public function onBeforeLoadModel($model) {
        $request = cmsCore::getInstance()->request;
        $filters = ${Name}Filter::getInstance()->getFromRequest($request);
        
        if (!empty($filters)) {
            ${Name}Filter::getInstance()->apply($model, $filters);
            
            // Сохраняем в сессию
            cmsUser::sessionPut('${name}_filters', $filters);
        }
    }
    
    public function onBeforeRender($controller) {
        $filters = cmsUser::sessionGet('${name}_filters', []);
        $controller->renderTemplate('filter', [
            'filters' => ${Name}Filter::getInstance()->getDefaultFilters(),
            'values' => $filters,
        ]);
    }
}`;
}

function generateSavedFilters(name: string, Name: string, _fields: any[]): string {
  return `<?php
// InstantCMS 2. ${name}/saved_filters.php

class ${Name}SavedFilters {
    public static function save($user_id, $name, $filters) {
        $model = cmsModel::getInstance();
        
        $model->insert('saved_filters', [
            'user_id' => $user_id,
            'name' => $name,
            'filters' => json_encode($filters),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
    
    public static function load($user_id, $filter_id) {
        $model = cmsModel::getInstance();
        return $model->getItemById('saved_filters', $filter_id, false, function ($item) {
            $item['filters'] = json_decode($item['filters'], true);
            return $item;
        });
    }
    
    public static function getAll($user_id) {
        $model = cmsModel::getInstance();
        return $model->get('saved_filters', function ($item) {
            $item['filters'] = json_decode($item['filters'], true);
            return $item;
        }, [
            'user_id' => $user_id,
        ]);
    }
    
    public static function delete($user_id, $filter_id) {
        $model = cmsModel::getInstance();
        return $model->delete('saved_filters', $filter_id, ['user_id' => $user_id]);
    }
}`;
}

export const filterToolSchema = {
  name: 'scaffold_filter',
  description: 'Генерация системы фильтрации контента для InstantCMS',
  inputSchema: {
    type: 'object' as const,
    properties: {
      addon_name: { type: 'string', description: 'Имя дополнения' },
      fields: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string', description: 'Имя поля в БД' },
            type: {
              type: 'string',
              enum: ['text', 'select', 'multiselect', 'checkbox', 'range', 'date', 'daterange'],
              description: 'Тип фильтра',
            },
            label: { type: 'string', description: 'Название поля' },
            options: {
              type: 'array',
              items: {
                type: 'object',
                properties: { value: { type: 'string' }, label: { type: 'string' } },
              },
              description: 'Опции для select/multiselect',
            },
            placeholder: { type: 'string', description: 'Placeholder' },
          },
          required: ['field', 'type'],
        },
        description: 'Поля фильтра',
      },
      options: {
        type: 'object',
        properties: {
          use_ajax: { type: 'boolean', description: 'AJAX фильтрация' },
          use_url_params: { type: 'boolean', description: 'Параметры в URL' },
          save_filters: { type: 'boolean', description: 'Сохранение фильтров' },
        },
      },
    },
    required: ['addon_name', 'fields'],
  },
  inputExamples: [
    {
      addon_name: 'catalog',
      fields: [
        { field: 'price', type: 'range', label: 'Цена' },
        {
          field: 'category_id',
          type: 'select',
          label: 'Категория',
          options: [
            { value: '1', label: 'Электроника' },
            { value: '2', label: 'Одежда' },
          ],
        },
        { field: 'in_stock', type: 'checkbox', label: 'В наличии' },
      ],
      options: { use_ajax: true, save_filters: true },
    },
  ],
};
