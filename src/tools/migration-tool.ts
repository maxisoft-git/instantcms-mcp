export interface MigrationField {
  name: string;
  type: string;
  nullable?: boolean;
  default?: string | number;
  extra?: string;
  comment?: string;
  key?: 'PRI' | 'UNI' | 'MUL';
}

export interface MigrationIndex {
  name: string;
  fields: string[];
  type?: 'INDEX' | 'UNIQUE' | 'FULLTEXT';
}

export interface MigrationTable {
  name: string;
  fields: MigrationField[];
  indexes?: MigrationIndex[];
  comment?: string;
  ifNotExists?: boolean;
}

export function generateMigration(
  name: string,
  fields: MigrationField[],
  options?: {
    indexes?: MigrationIndex[];
    comment?: string;
    ifNotExists?: boolean;
  }
): object {
  const tableName = `cms_${name}`;
  const className = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

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
${fields
  .map(f => {
    const opts = [];
    if (f.nullable) opts.push("'null' => true");
    if (f.default !== undefined) opts.push(`'default' => '${f.default}'"`);
    if (f.extra === 'AUTO_INCREMENT') opts.push("'auto_increment' => true");
    if (f.comment) opts.push(`'comment' => '${f.comment}'"`);

    return `            '${f.name}' => ['${f.type}'${opts.length > 0 ? ', ' + opts.join(', ') : ''}]`;
  })
  .join(',\n')}
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
</hooks>`,
    },
  };
}

export function scaffoldMigration(params: {
  addon_name: string;
  table_name: string;
  fields: MigrationField[];
  options?: {
    indexes?: MigrationIndex[];
    comment?: string;
    permissions?: string[];
    content_type?: boolean;
    has_seo?: boolean;
  };
}): object {
  const { addon_name, table_name, fields, options = {} } = params;

  const tableName = `cms_${table_name}`;
  const className = addon_name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const installerClass = `installer${className}`;

  // install.php
  const installContent = `<?php
/**
 * Установка дополнения ${addon_name}
 */

class ${installerClass} extends cmsInstaller {

    public function install() {

        $this->addModule('${addon_name}', [
            'title'       => '${addon_name.toUpperCase()}',
            'description' => '',
            'version'     => '1.0.0',
            'author'      => '',
            'url'         => ''
        ]);

        // Создание таблицы
        $this->createTable('${table_name}', [
${fields
  .map(f => {
    const opts = [];
    if (f.nullable) opts.push("'null' => true");
    if (f.default !== undefined && f.default !== 'NULL') {
      const isNumber = typeof f.default === 'number' || /^\d+$/.test(String(f.default));
      opts.push(`'default' => ${isNumber ? f.default : `'${f.default}'`}`);
    } else if (f.default === 'NULL') {
      opts.push("'null' => true");
    }
    if (f.extra === 'AUTO_INCREMENT') opts.push("'auto_increment' => true");
    if (f.comment) opts.push(`'comment' => '${f.comment}'"`);

    return `            '${f.name}' => ['${f.type}'${opts.length > 0 ? ', ' + opts.join(', ') : ''}]`;
  })
  .join(',\n')}
        ]${options.comment ? `, '${options.comment}'` : ''});${
          options.indexes?.length
            ? `
        // Индексы
${options.indexes
  .map(idx => {
    let sqlType = 'INDEX';
    if (idx.type === 'UNIQUE') {
      sqlType = 'UNIQUE INDEX';
    } else if (idx.type === 'FULLTEXT') {
      sqlType = 'FULLTEXT INDEX';
    }
    const sql = `CREATE ${sqlType} ${idx.name} ON {${table_name}} (${idx.fields.join(', ')})`;
    return `        \\$this->db->query("${sql}");`;
  })
  .join('\n')}`
            : ''
        }${
          options.content_type
            ? `

        // Регистрация типа контента
        $this->registerContentType('${addon_name}', [
            'title'          => '${className}',
            'description'    => '',
            'options'       => ['flags' => ['is_fixed_url']],
            'item_url_mask' => '/${addon_name}/view/{id}',
            'templates'      => [
                'list'   => '${addon_name}_list',
                'item'   => '${addon_name}_item',
                'profile'=> ''
            ]
        ]);`
            : ''
        }${
          options.has_seo
            ? `

        // SEO настройки
        $this->addSeoOptions('${addon_name}', [
            'slug_default' => '${addon_name}',
            'meta'         => [
                'title'       => '{title}',
                'description' => '{description}',
                'keywords'    => ''
            ]
        ]);`
            : ''
        }

        return true;
    }

    public function uninstall($hard = false) {

        if ($hard) {
            $this->dropTable('${table_name}');${
              options.content_type
                ? `
            $this->deleteContentType('${addon_name}');`
                : ''
            }
        }

        $this->removeModule('${addon_name}');

        return true;
    }
}`;

  // uninstall.php
  const uninstallContent = `<?php
/**
 * Удаление дополнения ${addon_name}
 */

class ${installerClass.replace('installer', 'uninstall_') + installerClass.includes('installer') ? '' : 'uninstall_'} extends ${installerClass} {

    public function uninstall() {
        parent::uninstall(false);
    }
}`;

  // manifest.xml entries для install
  const manifestEntry = `<files>
    <file>system/controllers/${addon_name}/install.php</file>
</files>`;

  return {
    addon_name,
    table_name: tableName,
    files: {
      'install.php': installContent,
      'uninstall.php': uninstallContent,
    },
    manifest_xml: manifestEntry,
    notes: {
      'install.php': `Файл должен быть в: system/controllers/${addon_name}/install.php`,
      'uninstall.php': `Файл должен быть в: system/controllers/${addon_name}/uninstall.php`,
      hard_uninstall:
        'parent::uninstall(true) удалит таблицы, parent::uninstall(false) только отключит модуль',
    },
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
      {
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
        default: 'CURRENT_TIMESTAMP',
        comment: 'Создано',
      },
    ],
    user: [
      {
        name: 'user_id',
        type: 'int(11) UNSIGNED',
        nullable: true,
        key: 'MUL',
        comment: 'ID пользователя',
      },
    ],
    bool: [
      {
        name: 'is_pub',
        type: 'tinyint(1) UNSIGNED',
        nullable: false,
        default: '1',
        comment: 'Опубликовано',
      },
      {
        name: 'is_deleted',
        type: 'tinyint(1) UNSIGNED',
        nullable: false,
        default: '0',
        comment: 'Удалено',
      },
      {
        name: 'is_featured',
        type: 'tinyint(1) UNSIGNED',
        nullable: false,
        default: '0',
        comment: 'Избранное',
      },
    ],
  };

  return (
    suggestions[fieldType] || [
      {
        name: 'id',
        type: 'int(11) UNSIGNED',
        nullable: false,
        extra: 'AUTO_INCREMENT',
        key: 'PRI',
      },
    ]
  );
}
