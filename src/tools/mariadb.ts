import * as mysql from 'mysql2/promise';

export interface MariaDBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  affectedRows?: number;
  query: string;
  executionTime: number;
  error?: string;
}

export interface TableInfo {
  name: string;
  comment: string | null;
  columns: ColumnInfo[];
  indexes: IndexInfo[];
  rowCount?: number;
}

export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  key: string | null;
  default: string | null;
  extra: string | null;
  comment: string | null;
}

export interface IndexInfo {
  name: string;
  type: string | null;
  columns: string[];
  unique: boolean;
}

let pool: mysql.Pool | null = null;

function getConnection(): MariaDBConfig {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_DATABASE || 'instantcms';
  
  return { host, port, user, password, database };
}

export function getPool(): mysql.Pool {
  if (!pool) {
    const config = getConnection();
    pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
  }
  return pool;
}

export async function executeQuery(sql: string): Promise<QueryResult> {
  const startTime = Date.now();
  
  try {
    const [rows, fields] = await getPool().execute(sql);
    const executionTime = Date.now() - startTime;
    
    const columns = Array.isArray(fields) ? (fields as mysql.FieldPacket[]).map((f) => f.name) : [];
    const rowCount = Array.isArray(rows) ? rows.length : 0;
    
    return {
      columns,
      rows: Array.isArray(rows) ? rows as Record<string, unknown>[] : [],
      rowCount,
      query: sql,
      executionTime
    };
  } catch (error) {
    const executionTime = Date.now() - startTime;
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      query: sql,
      executionTime,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export async function getTableInfo(tableName: string): Promise<TableInfo | null> {
  const [columnsResult, indexesResult, countResult] = await Promise.all([
    executeQuery(`
      SELECT 
        COLUMN_NAME as name,
        COLUMN_TYPE as type,
        IS_NULLABLE as nullable,
        COLUMN_KEY as \`key\`,
        COLUMN_DEFAULT as \`default\`,
        EXTRA as extra,
        COLUMN_COMMENT as comment
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
    `),
    executeQuery(`
      SELECT 
        INDEX_NAME as name,
        INDEX_TYPE as type,
        GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) as columns,
        NON_UNIQUE as non_unique
      FROM information_schema.STATISTICS 
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
      GROUP BY INDEX_NAME, INDEX_TYPE, NON_UNIQUE
    `),
    executeQuery(`SELECT COUNT(*) as cnt FROM \`${tableName}\``)
  ]);
  
  if (columnsResult.error || columnsResult.rows.length === 0) {
    return null;
  }
  
  return {
    name: tableName,
    comment: null,
    columns: columnsResult.rows.map(row => ({
      name: String(row.name),
      type: String(row.type),
      nullable: row.nullable === 'YES',
      key: row.key ? String(row.key) : null,
      default: row.default as string | null,
      extra: row.extra as string | null,
      comment: row.comment as string | null
    })),
    indexes: indexesResult.rows.map(row => ({
      name: String(row.name),
      type: row.type ? String(row.type) : null,
      columns: String(row.columns).split(','),
      unique: row.non_unique === 0
    })),
    rowCount: countResult.rows[0]?.cnt as number | undefined
  };
}

export async function listTables(): Promise<string[]> {
  const result = await executeQuery(`
    SELECT TABLE_NAME 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_TYPE = 'BASE TABLE'
    ORDER BY TABLE_NAME
  `);
  
  return result.rows.map(row => String(row.TABLE_NAME));
}

export async function getDatabaseInfo(): Promise<{
  name: string;
  tablesCount: number;
  totalRows: number;
  size: { data: number; index: number; total: number };
}> {
  const result = await executeQuery(`
    SELECT 
      TABLE_NAME,
      TABLE_ROWS,
      ROUND(DATA_LENGTH / 1024 / 1024, 2) as data_mb,
      ROUND(INDEX_LENGTH / 1024 / 1024, 2) as index_mb
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_TYPE = 'BASE TABLE'
  `);
  
  const tablesCount = result.rows.length;
  let totalRows = 0;
  let totalData = 0;
  let totalIndex = 0;
  
  for (const row of result.rows) {
    totalRows += Number(row.TABLE_ROWS) || 0;
    totalData += Number(row.data_mb) || 0;
    totalIndex += Number(row.index_mb) || 0;
  }
  
  const dbResult = await executeQuery('SELECT DATABASE() as db_name');
  const dbName = String(dbResult.rows[0]?.db_name || 'unknown');
  
  return {
    name: dbName,
    tablesCount,
    totalRows,
    size: {
      data: totalData,
      index: totalIndex,
      total: totalData + totalIndex
    }
  };
}

export async function describeTable(tableName: string): Promise<QueryResult> {
  return executeQuery(`DESCRIBE \`${tableName}\``);
}

export async function showIndexes(tableName: string): Promise<QueryResult> {
  return executeQuery(`SHOW INDEX FROM \`${tableName}\``);
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
