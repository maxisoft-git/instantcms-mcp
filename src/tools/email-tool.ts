interface EmailVariable {
  name: string;
  description?: string;
  example?: string;
}

interface EmailTemplate {
  name: string;
  subject: string;
  body: string;
  variables?: EmailVariable[];
}

interface ScaffoldEmailOptions {
  addon_name: string;
  templates: EmailTemplate[];
  options?: {
    use_html?: boolean;
    base_template?: 'default' | 'minimal' | 'notifications';
  };
}

export function scaffoldEmail(opts: ScaffoldEmailOptions): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const NAME = name.toUpperCase();

  const files: Record<string, string> = {};
  const baseDir = `package/system/languages/ru/controllers/${name}`;

  for (const template of opts.templates) {
    const templateFileName = `${name}_${template.name}.email.php`;
    files[`${baseDir}/${templateFileName}`] = generateEmailTemplate(
      name,
      NAME,
      template,
      opts.options
    );
  }

  files[`${baseDir}/${name}_emails.php`] = generateEmailIndex(name, NAME, opts.templates);

  return {
    addon_name: name,
    templates_count: opts.templates.length,
    files,
    templates: opts.templates.map(t => ({
      name: t.name,
      file: `${name}_${t.name}.email.php`,
      subject: t.subject,
      variables_count: t.variables?.length || 0,
    })),
    structure_notes: [
      `Email шаблоны: ${baseDir}/`,
      `Использование в коде: $this->controller->emailTask('${name}', $template, $data)`,
      `Отправка: cmsEventsManager::hook('send_email', ['to' => $email, 'template' => '${name}:${opts.templates[0]?.name || 'default'}', 'vars' => $data])`,
    ],
  };
}

function generateEmailTemplate(
  name: string,
  NAME: string,
  template: EmailTemplate,
  options?: ScaffoldEmailOptions['options']
): string {
  const useHtml = options?.use_html ?? true;
  const baseTemplate = options?.base_template || 'default';

  const header = generateEmailHeader(template.subject, baseTemplate, useHtml);
  const body = generateEmailBody(template.body, name, NAME, template.variables);
  const footer = generateEmailFooter(baseTemplate, useHtml);

  let code = `<?php
/**
 * Email шаблон: ${template.name}
 * Для отправки используйте метод emailTask() контроллера
 */

`;

  if (useHtml) {
    code += `$${name}_template = <<<'HTML'
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>${escapeHtml(template.subject)}</title>
    ${header}
</head>
<body>
    ${body}
    ${footer}
</body>
</html>
HTML;

`;
  } else {
    code += `$${name}_template = <<<'TEXT'
${template.body}
TEXT;

`;
  }

  code += `
$${name}_subject = '${escapeHtml(template.subject)}';
`;

  if (template.variables && template.variables.length > 0) {
    code += `
// Доступные переменные:
`;
    for (const v of template.variables) {
      const example = v.example ? ` // Пример: ${v.example}` : '';
      code += `// \${${v.name}}${example}
`;
    }
  }

  return code;
}

function generateEmailHeader(subject: string, baseTemplate: string, useHtml: boolean): string {
  if (!useHtml) {
    return '';
  }

  const baseStyles = `
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
    }
    .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }
    .email-header {
        background: #4a90d9;
        color: white;
        padding: 20px;
        text-align: center;
    }
    .email-body {
        padding: 30px 20px;
        background: #ffffff;
    }
    .email-footer {
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #666;
        background: #f5f5f5;
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        background: #4a90d9;
        color: white;
        text-decoration: none;
        border-radius: 4px;
    }
`;

  switch (baseTemplate) {
    case 'minimal':
      return `
    <style type="text/css">
        body { background: #fafafa; }
        .email-container { background: #ffffff; padding: 30px; }
    </style>
`;
    case 'notifications':
      return `
    <style type="text/css">
        ${baseStyles}
        .email-header { background: #e74c3c; }
    </style>
`;
    default:
      return `
    <style type="text/css">
        ${baseStyles}
    </style>
`;
  }
}

function generateEmailBody(
  body: string,
  name: string,
  NAME: string,
  variables?: EmailVariable[]
): string {
  let processedBody = body;

  if (variables) {
    for (const v of variables) {
      processedBody = processedBody.replace(new RegExp(`{${v.name}}`, 'g'), `\${\${${v.name}}}`);
    }
  }

  processedBody = processedBody.replace(/\{site_name\}/g, '<?php echo \\$site_name; ?>');
  processedBody = processedBody.replace(/\{site_url\}/g, '<?php echo \\$site_url; ?>');
  processedBody = processedBody.replace(/\{user_name\}/g, '<?php echo \\$user_name; ?>');
  processedBody = processedBody.replace(/\{user_email\}/g, '<?php echo \\$user_email; ?>');

  const subjectPreview = escapeHtml(body.slice(0, 50));

  return `
    <div class="email-container">
        <div class="email-header">
            <h1><?php echo \\$subject ?: '${subjectPreview}'; ?></h1>
        </div>
        <div class="email-body">
${processedBody
  .split('\n')
  .map(line => `            <p>${line}</p>`)
  .join('\n')}
        </div>
        <div class="email-footer">
            <p>С уважением, команда <?php echo \\$site_name; ?></p>
            <p><a href="<?php echo \\$site_url; ?>"><?php echo \\$site_url; ?></a></p>
        </div>
    </div>
`;
}

function generateEmailFooter(baseTemplate: string, useHtml: boolean): string {
  if (!useHtml) {
    return '';
  }

  switch (baseTemplate) {
    case 'minimal':
      return '';
    default:
      return '';
  }
}

function generateEmailIndex(name: string, NAME: string, templates: EmailTemplate[]): string {
  let code = `<?php
/**
 * Email шаблоны для ${name}
 * Генерируется автоматически
 */

`;

  for (const template of templates) {
    code += `/**
 * ${template.name} - ${template.subject}
 */
define('LANG_${NAME}_EMAIL_${template.name.toUpperCase()}_SUBJECT', '${escapeHtml(template.subject)}');
define('LANG_${NAME}_EMAIL_${template.name.toUpperCase()}_BODY', '${escapeHtml(template.body.slice(0, 100))}...');

`;
  }

  code += `
// Отправка email
// $this->controller->emailTask('${name}', '${templates[0]?.name || 'default'}', $data);
`;

  return code;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
