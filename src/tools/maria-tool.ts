import { executeQuery, getTableInfo, listTables, getDatabaseInfo, describeTable, showIndexes } from "./mariadb.js";

export async function mariaExecuteQuery(sql: string): Promise<object> {
  const result = await executeQuery(sql);
  
  if (result.error) {
    return {
      success: false,
      error: result.error,
      query: result.query,
      executionTime: result.executionTime
    };
  }
  
  return {
    success: true,
    columns: result.columns,
    rows: result.rows,
    rowCount: result.rowCount,
    query: result.query,
    executionTime: result.executionTime
  };
}

export async function mariaListTables(): Promise<object> {
  const tables = await listTables();
  return {
    tables,
    count: tables.length
  };
}

export async function mariaDescribeTable(tableName: string): Promise<object> {
  const info = await getTableInfo(tableName);
  
  if (!info) {
    return {
      error: `Table "${tableName}" not found`
    };
  }
  
  return {
    name: info.name,
    comment: info.comment,
    rowCount: info.rowCount,
    columns: info.columns.map(c => ({
      name: c.name,
      type: c.type,
      nullable: c.nullable,
      key: c.key,
      default: c.default,
      extra: c.extra,
      comment: c.comment
    })),
    indexes: info.indexes.map(i => ({
      name: i.name,
      type: i.type,
      columns: i.columns,
      unique: i.unique
    }))
  };
}

export async function mariaGetDatabaseInfo(): Promise<object> {
  return await getDatabaseInfo();
}

export async function mariaShowIndexes(tableName: string): Promise<object> {
  const result = await showIndexes(tableName);
  return {
    table: tableName,
    indexes: result.rows,
    columnCount: result.columns.length,
    executionTime: result.executionTime,
    error: result.error
  };
}

export async function mariaSearchTables(pattern: string): Promise<object> {
  const tables = await listTables();
  const matching = tables.filter(t => 
    t.toLowerCase().includes(pattern.toLowerCase())
  );
  
  return {
    pattern,
    matched: matching,
    count: matching.length
  };
}

export async function mariaGetTableData(
  tableName: string, 
  options?: { 
    limit?: number; 
    offset?: number; 
    orderBy?: string; 
    orderDir?: 'ASC' | 'DESC';
    filter?: Record<string, unknown>;
  }
): Promise<object> {
  const limit = options?.limit || 20;
  const offset = options?.offset || 0;
  const orderBy = options?.orderBy || 'id';
  const orderDir = options?.orderDir || 'DESC';
  
  let sql = `SELECT * FROM \`${tableName}\``;
  const params: unknown[] = [];
  
  if (options?.filter) {
    const filterConditions: string[] = [];
    for (const [key, value] of Object.entries(options.filter)) {
      filterConditions.push(`\`${key}\` = ?`);
      params.push(value);
    }
    if (filterConditions.length > 0) {
      sql += ` WHERE ${filterConditions.join(' AND ')}`;
    }
  }
  
  sql += ` ORDER BY \`${orderBy}\` ${orderDir} LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  const result = await executeQuery(sql);
  
  if (result.error) {
    return {
      error: result.error,
      query: result.query
    };
  }
  
  return {
    table: tableName,
    columns: result.columns,
    rows: result.rows,
    rowCount: result.rowCount,
    pagination: {
      limit,
      offset,
      orderBy,
      orderDir
    },
    query: result.query,
    executionTime: result.executionTime
  };
}
