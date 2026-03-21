export interface MigrationField {
  name: string;
  type: string;
  nullable?: boolean;
  default?: string;
  extra?: string;
  comment?: string;
  key?: 'PRI' | 'UNI' | 'MUL';
}

export interface MigrationIndex {
  name: string;
  fields: string[];
  type?: 'UNIQUE' | 'FULLTEXT';
}

export interface MigrationTable {
  name: string;
  fields: MigrationField[];
  indexes?: MigrationIndex[];
  comment?: string;
  ifNotExists?: boolean;
}

export function generateMigration(name: string, fields: MigrationField[], options?: {
  indexes?: MigrationIndex[];
  comment?: string;
  ifNotExists?: boolean;
}): object {
  
  const tableName = `cms_${name}`;
  const className = name.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  
  const fieldLines = fields.map(f => {
    let line = `  \`${f.name}\` ${f.type}`;
    
    if (f.nullable !== true) {
      line += ' NOT NULL';
    }
    
    if (f.default !== undefined) {
      if (f.default === 'NULL') {
        line += ' DEFAULT NULL';
      } else if (typeof f.default === 'number') {
        line += ` DEFAULT ${f.default}`;
      } else {
        line += ` DEFAULT '${f.default}'`;
      }
    }
    
    if (f.extra) {
      line += ` ${f.extra}`;
    }
    
    if (f.comment) {
      line += ` COMMENT '${f.comment}'`;
    }
    
    return line;
  });
  
  if (!fields.find(f => f.key === 'PRI')) {
    fieldLines.push('  PRIMARY KEY (`id`)');
  }
  
  const indexes: string[] = [];
  const seenKeys = new Set<string>();
  
  for (const f of fields) {
    if (f.key && f.key !== 'PRI' && !seenKeys.has(f.key + '_' + f.name)) {
      seenKeys.add(f.key + '_' + f.name);
      if (f.key === 'UNI') {
        indexes.push(`  UNIQUE KEY \`${f.name}\` (\`${f.name}\`)`);
      } else if (f.key === 'MUL') {
        indexes.push(`  KEY \`${f.name}\` (\`${f.name}\`)`);
      }
    }
  }
  
  if (options?.indexes) {
    for (const idx of options.indexes) {
      if (idx.type === 'UNIQUE') {
        indexes.push(`  UNIQUE KEY \`${idx.name}\` (\`${idx.fields.join('`, `')}\`)`);
      } else if (idx.type === 'FULLTEXT') {
        indexes.push(`  FULLTEXT KEY \`${idx.name}\` (\`${idx.fields.join('`, `')}\`)`);
      } else {
        indexes.push(`  KEY \`${idx.name}\` (\`${idx.fields.join('`, `')}\`)`);
      }
    }
  }
  
  const allLines = [...fieldLines, ...indexes];
  
  const createTable = `CREATE TABLE \`${tableName}\` (
${allLines.join(',\n')}
) ENGINE=InnoDB DEFAULT CHARSET=utf8${options?.comment ? ` COMMENT='${options.comment}'` : ''};`;
  
  const installCode = `class installer${className} extends cmsInstaller {

    public function install() {

        $this->createTable('${name}', [
${fields.map(f => {
  let opts = [];
  if (f.nullable) opts.push("'null' => true");
  if (f.default !== undefined) opts.push(`'default' => '${f.default}'"`);
  if (f.extra === 'AUTO_INCREMENT') opts.push("'auto_increment' => true");
  if (f.comment) opts.push(`'comment' => '${f.comment}'"`);
  
  return `            '${f.name}' => ['${f.type}'${opts.length > 0 ? ', ' + opts.join(', ') : ''}]`;
}).join(',\n')}
        ]${options?.comment ? `, '${options.comment}'` : ''});

        return true;
    }

    public function uninstall() {
        $this->dropTable('${name}');
        return true;
    }
}`;
  
  return {
    table_name: tableName,
    class_name: `installer${className}`,
    sql: createTable,
    install_php: installCode,
    field_count: fields.length,
    index_count: indexes.length,
    conventions: {
      table_name: `cms_${name}`,
      model_class: `model${className}`,
      controller_class: name,
      manifest_example: `<files>
    <file>system/controllers/${name}/</file>
</files>
<hooks>
    <hook event="content_after_add_approve" />
</hooks>`
    }
  };
}

export function generateFieldSuggestions(fieldType: string): MigrationField[] {
  const suggestions: Record<string, MigrationField[]> = {
    string: [
      { name: 'title', type: 'varchar(255)', nullable: false, comment: 'Заголовок' },
      { name: 'slug', type: 'varchar(100)', nullable: true, comment: 'URL-псевдоним' },
      { name: 'email', type: 'varchar(100)', nullable: true, comment: 'Email' },
      { name: 'phone', type: 'varchar(20)', nullable: true, comment: 'Телефон' },
    ],
    text: [
      { name: 'description', type: 'text', nullable: true, comment: 'Описание' },
      { name: 'content', type: 'text', nullable: true, comment: 'Контент' },
      { name: 'content_short', type: 'text', nullable: true, comment: 'Краткое описание' },
    ],
    number: [
      { name: 'price', type: 'decimal(10,2)', nullable: true, comment: 'Цена' },
      { name: 'quantity', type: 'int(11)', nullable: true, default: '0', comment: 'Количество' },
      { name: 'sorting', type: 'int(11)', nullable: true, default: '0', comment: 'Сортировка' },
    ],
    datetime: [
      { name: 'date_pub', type: 'datetime', nullable: true, comment: 'Дата публикации' },
      { name: 'date_end', type: 'datetime', nullable: true, comment: 'Дата окончания' },
      { name: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', comment: 'Создано' },
    ],
    user: [
      { name: 'user_id', type: 'int(11) UNSIGNED', nullable: true, key: 'MUL', comment: 'ID пользователя' },
    ],
    bool: [
      { name: 'is_pub', type: 'tinyint(1) UNSIGNED', nullable: false, default: '1', comment: 'Опубликовано' },
      { name: 'is_deleted', type: 'tinyint(1) UNSIGNED', nullable: false, default: '0', comment: 'Удалено' },
      { name: 'is_featured', type: 'tinyint(1) UNSIGNED', nullable: false, default: '0', comment: 'Избранное' },
    ]
  };
  
  return suggestions[fieldType] || [
    { name: 'id', type: 'int(11) UNSIGNED', nullable: false, extra: 'AUTO_INCREMENT', key: 'PRI' },
  ];
}
