interface CronSchedule {
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  day_of_week?: string;
}

interface CronTask {
  name: string;
  schedule: CronSchedule;
  description?: string;
  action: string;
}

interface ScaffoldCronOptions {
  addon_name: string;
  tasks: CronTask[];
  options?: {
    use_lock_file?: boolean;
    log_execution?: boolean;
  };
}

export function scaffoldCron(opts: ScaffoldCronOptions): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name.split('_').map(capitalize).join('');
  const NAME = name.toUpperCase();

  const files: Record<string, string> = {};

  const ctrl = `package/system/controllers/${name}`;

  files[`${ctrl}/cron.php`] = generateCronMain(name, Name, opts.tasks, opts.options);
  files[`${ctrl}/manifest.xml`] = generateManifest(name, Name, opts.tasks);

  files[`package/system/languages/ru/controllers/${name}/${name}.php`] = generateLang(
    name,
    NAME,
    opts.tasks
  );

  return {
    addon_name: name,
    tasks_count: opts.tasks.length,
    files,
    tasks: opts.tasks.map(t => ({
      name: t.name,
      schedule: formatSchedule(t.schedule),
      action: t.action,
    })),
    structure_notes: [
      `Cron контроллер: ${ctrl}/cron.php`,
      `Настройка в crontab: * * * * * php /path/to/cron.php ${name}`,
      `Или через админку: Настройки → Планировщик`,
    ],
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSchedule(schedule: CronSchedule): string {
  const parts = [
    schedule.minute ?? '*',
    schedule.hour ?? '*',
    schedule.day ?? '*',
    schedule.month ?? '*',
    schedule.day_of_week ?? '*',
  ];
  return parts.join(' ');
}

function generateCronMain(
  name: string,
  Name: string,
  tasks: CronTask[],
  options?: ScaffoldCronOptions['options']
): string {
  const useLock = options?.use_lock_file ?? true;
  const logExecution = options?.log_execution ?? true;

  let code = `<?php
/**
 * Cron задачи для дополнения ${name}
 * Запуск: php ${name}/cron.php [task_name]
 *
 * Настройка crontab:
 * ${tasks.map(t => `${formatSchedule(t.schedule)} php /path/to/${name}/cron.php ${t.name}`).join('\n * ')}
 */

// Режим CLI
if (php_sapi_name() !== 'cli') {
    die('Cron can be run only from command line');
}

// Директория дополнения
define('PATH', dirname(__DIR__));
define('DS', DIRECTORY_SEPARATOR);

// Загрузка ядра
require_once PATH . '/core/bootstrap.php';

`;

  if (logExecution) {
    const logFileVar = `\$` + name + `_log_file`;
    const logFuncName = name + `_log`;
    const logFilePath = `/cache/logs/${name}.log`;
    code += `
// Логирование
${logFileVar} = cmsConfig::get('root_path') . '${logFilePath}';
function ${logFuncName}(message) {
    global ${logFileVar};
    $dir = dirname(${logFileVar});
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    file_put_contents(${logFileVar}, date('Y-m-d H:i:s') . ' - ' . $message . PHP_EOL, FILE_APPEND);
}
`;
  }

  if (useLock) {
    const lockFileVar = `\$` + name + `_lock_file`;
    const lockFuncName = name + `_is_locked`;
    const lockFuncLock = name + `_lock`;
    const lockFuncUnlock = name + `_unlock`;
    const lockFilePath = `/cache/${name}_cron.lock`;
    code += `
// Блокировка от повторного запуска
${lockFileVar} = cmsConfig::get('cache_path') . '${lockFilePath}';
function ${lockFuncName}() {
    global ${lockFileVar};
    if (!file_exists(${lockFileVar})) {
        return false;
    }
    $stat = stat(${lockFileVar});
    // Файл старше 1 часа - разблокируем
    if (time() - $stat['mtime'] > 3600) {
        unlink(${lockFileVar});
        return false;
    }
    return true;
}

function ${lockFuncLock}() {
    global ${lockFileVar};
    touch(${lockFileVar});
}

function ${lockFuncUnlock}() {
    global ${lockFileVar};
    if (file_exists(${lockFileVar})) {
        unlink(${lockFileVar});
    }
}
`;
  }

  const logFuncName = name + `_log`;
  const isLockedFuncName = name + `_is_locked`;
  const lockFuncName = name + `_lock`;

  code += `
// Получение задачи из аргументов
$task_name = $argv[1] ?? null;

`;

  if (logExecution) {
    code += `${logFuncName}('Started' . ($task_name ? ' task: ' . $task_name : ''));
`;
  }

  code += `
if (${isLockedFuncName}()) {
    ${logExecution ? `${logFuncName}('SKIPPED: Another instance is running');` : `die('Another instance is running');`}
    exit(1);
}

${lockFuncName}();

try {

    if ($task_name) {
        // Выполнить конкретную задачу
        ${tasks.map(t => `if ($task_name === '${t.name}') { ${t.action}($db); }`).join(' else ')}
        else {
            ${logExecution ? `${logFuncName}('ERROR: Unknown task: ' . $task_name);` : `die('Unknown task: ' . $task_name);`}
            exit(1);
        }
    } else {
        // Выполнить все задачи по расписанию
        $now = getdate();
`;

  for (const task of tasks) {
    const conditions: string[] = [];

    if (task.schedule.minute && task.schedule.minute !== '*') {
      conditions.push(`$now['minutes'] === ${task.schedule.minute.replace(/\D/g, '')}`);
    }
    if (task.schedule.hour && task.schedule.hour !== '*') {
      conditions.push(`$now['hours'] === ${task.schedule.hour.replace(/\D/g, '')}`);
    }
    if (task.schedule.day && task.schedule.day !== '*') {
      conditions.push(`$now['mday'] === ${task.schedule.day.replace(/\D/g, '')}`);
    }
    if (task.schedule.month && task.schedule.month !== '*') {
      conditions.push(`$now['mon'] === ${task.schedule.month.replace(/\D/g, '')}`);
    }
    if (task.schedule.day_of_week && task.schedule.day_of_week !== '*') {
      conditions.push(`$now['wday'] === ${task.schedule.day_of_week.replace(/\D/g, '')}`);
    }

    const condition = conditions.length > 0 ? conditions.join(' && ') : 'true';

    code += `
        if (${condition}) {
            ${logExecution ? `${logFuncName}('Running task: ${task.name}');` : ''}
            ${task.action}($db);
        }
`;
  }

  const unlockFuncName = name + `_unlock`;

  code += `    }

} catch (Exception $$e) {
    ${logExecution ? `${logFuncName}('ERROR: ' . $$e->getMessage());` : `fwrite(STDERR, $$e->getMessage() . PHP_EOL);`}
    exit(1);
} finally {
    ${unlockFuncName}();
}

${logExecution ? `${logFuncName}('Finished');` : ''}
exit(0);
`;
  return code;
}

function generateManifest(name: string, Name: string, tasks: CronTask[]): string {
  const taskEntries = tasks
    .map(t => `        <task name="${t.name}" schedule="${formatSchedule(t.schedule)}" />`)
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<addon>
    <name>${name}</name>
    <title>${Name}</title>
    <version>1.0.0</version>
    <files>
        <file>controllers/${name}/cron.php</file>
    </files>
    <cron>
${taskEntries}
    </cron>
</addon>`;
}

function generateLang(name: string, NAME: string, tasks: CronTask[]): string {
  let code = `<?php
/**
 * Языковые константы для cron задач ${name}
 */

define('LANG_${NAME}_TITLE', '${capitalize(name.replace(/_/g, ' '))}');
`;

  for (const task of tasks) {
    const taskKey = task.name.toUpperCase().replace(/[^A-Z]/g, '_');
    code += `
define('LANG_${NAME}_TASK_${taskKey}', '${task.description || task.name}');
define('LANG_${NAME}_TASK_${taskKey}_DESC', 'Расписание: ${formatSchedule(task.schedule)}');
`;
  }

  code += `
define('LANG_${NAME}_COMPLETE', 'Задача выполнена');
define('LANG_${NAME}_ERROR', 'Ошибка выполнения');
`;

  return code;
}
