/**
 * @fileoverview Template scaffolding tool for InstantCMS
 * Generates complete templates with layouts, styles, and dark mode support
 */

import { z } from 'zod';
import { normalizeAddonName, type ScaffoldResult } from '../types/scaffold';

/**
 * Single layout block definition
 */
interface LayoutBlock {
  /** Block name */
  name: string;
  /** Widget position */
  position: string;
  /** CSS class */
  class?: string;
}

/**
 * Options for template generation
 */
interface ScaffoldTemplateOptions {
  /** Template name */
  template_name: string;
  /** Additional configuration */
  options?: {
    /** Generate layout.yaml */
    with_layout?: boolean;
    /** Enable responsive design */
    with_responsive?: boolean;
    /** Enable dark mode support */
    with_dark_mode?: boolean;
    /** Enable RTL support */
    withRTL?: boolean;
  };
  /** Layout blocks */
  layout_blocks?: LayoutBlock[];
}

/**
 * Generates template manifest
 */
function generateManifest(name: string, Name: string, options: Record<string, boolean>): string {
  return `<?php
// InstantCMS 2. manifest.json

return [
    'type' => 'template',
    'name' => '${name}',
    'title' => '${Name}',
    'description' => '${Name} template for InstantCMS 2',
    'author' => '',
    'version' => '1.0.0',
    'created_at' => '${new Date().toISOString().split('T')[0]}',
    'min_version' => '2.15.0',
    'supports' => [
        'responsive' => ${options.with_responsive},
        'dark_mode' => ${options.with_dark_mode},
        'rtl' => ${options.withRTL},
    ],
    'options' => [
        'color_primary' => '#007bff',
        'color_secondary' => '#6c757d',
        'color_success' => '#28a745',
        'color_danger' => '#dc3545',
        'color_warning' => '#ffc107',
        'font_family' => 'system-ui, -apple-system, sans-serif',
    ],
    'layouts' => [
        'default',
        'boxed',
        'fullwidth',
    ],
    'regions' => [
        'top',
        'nav',
        'header',
        'content',
        'sidebar',
        'bottom',
        'footer',
    ],
];`;
}

/**
 * Generates main template file
 */
function generateMainTemplate(
  name: string,
  _Name: string,
  blocks: LayoutBlock[],
  options: Record<string, boolean>
): string {
  const headerClass = blocks.find(b => b.name === 'header')?.class || 'bg-white';
  const navbarClass =
    blocks.find(b => b.name === 'navbar')?.class || 'navbar navbar-expand-lg navbar-light bg-white';
  const contentClass = blocks.find(b => b.name === 'content')?.class || 'py-4';
  const footerClass = blocks.find(b => b.name === 'footer')?.class || 'bg-light py-4';

  return `<?php
// InstantCMS 2. ${name}/main.tpl.php

\\$template = cmsTemplate::getInstance();
\\$widgets = cmsWidgets::getInstance();
\\$config = cmsConfig::getInstance();

\\$body_class = [];
\\$body_class[] = 'template-${name}';
<?php if (\\$template->hasOption('dark_mode')): ?>
\\$body_class[] = \\$template->getOption('dark_mode') ? 'dark-mode' : '';
<?php endif; ?>
?>

<!DOCTYPE html>
<html lang="<?php echo \\$config->language; ?>"<?php echo ${options.withRTL} ? ' dir="rtl"' : ''; ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title><?php echo \\$page_title; ?></title>
    <meta name="description" content="<?php echo \\$page_description ?? ''; ?>">

    <?php echo \\$template->getHead(); ?>

    <link rel="stylesheet" href="<?php echo \\$template->getAssetUrl('main.css'); ?>">

    <?php if (${options.with_dark_mode}): ?>
    <link rel="stylesheet" href="<?php echo \\$template->getAssetUrl('dark.css'); ?>" media="(prefers-color-scheme: dark)">
    <?php endif; ?>
</head>
<body class="<?php echo implode(' ', \\$body_class); ?>">

    <div id="wrapper" class="<?php echo \\$template->getLayoutClass(); ?>">

        <?php echo \\$widgets->renderPosition('top'); ?>

        <header id="header" class="${headerClass}">
            <div class="container">
                <?php echo \\$widgets->renderPosition('header'); ?>
            </div>
        </header>

        <nav id="navbar" class="${navbarClass}">
            <div class="container">
                <?php echo \\$widgets->renderPosition('nav'); ?>
            </div>
        </nav>

        <main id="main-content" class="${contentClass}">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <?php echo \\$template->getBreadcrumbs(); ?>
                        <?php echo \\$page_content; ?>
                    </div>
                    <aside class="col-lg-4">
                        <?php echo \\$widgets->renderPosition('sidebar'); ?>
                    </aside>
                </div>
            </div>
        </main>

        <footer id="footer" class="${footerClass}">
            <div class="container">
                <?php echo \\$widgets->renderPosition('footer'); ?>
                <div class="text-center text-muted">
                    &copy; <?php echo date('Y'); ?> <?php echo \\$config->sitename; ?>
                </div>
            </div>
        </footer>

    </div>

    <script src="<?php echo \\$template->getAssetUrl('assets/js/app.js'); ?>"></script>

    <?php echo \\$template->getBodyEnd(); ?>
</body>
</html>
`;
}

/**
 * Generates main CSS file
 */
function generateMainCSS(name: string, options: Record<string, boolean>): string {
  return `/* InstantCMS 2. ${name} - Main Styles */

:root {
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-success: #28a745;
    --color-danger: #dc3545;
    --color-warning: #ffc107;
    --color-info: #17a2b8;
    --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-base: 1rem;
    --line-height-base: 1.5;
    --border-radius: 0.25rem;
    --border-color: #dee2e6;
    --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    --transition-base: all 0.2s ease-in-out;
}

*, *::before, *::after {
    box-sizing: border-box;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
}

body {
    margin: 0;
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: #212529;
    background-color: #fff;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5rem 0;
    font-weight: 500;
    line-height: 1.2;
}

p {
    margin: 0 0 1rem 0;
}

a {
    color: var(--color-primary);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

#main-content {
    flex: 1;
    padding: 2rem 0;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

#header {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

#navbar {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

#footer {
    margin-top: auto;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.col {
    flex: 1;
    padding: 0 15px;
}

.col-lg-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
}

.col-lg-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}

<?php if (${options.with_responsive}): ?>
@media (max-width: 991px) {
    .col-lg-8,
    .col-lg-4 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}
<?php endif; ?>

.text-center { text-align: center; }
.text-muted { color: #6c757d; }
.bg-light { background-color: #f8f9fa; }
.bg-white { background-color: #fff; }
.py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mb-3 { margin-bottom: 1rem; }
`;
}

/**
 * Generates variables JSON
 */
function generateVariables(name: string, Name: string): string {
  return JSON.stringify(
    {
      name: name,
      title: Name,
      version: '1.0.0',
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
      fonts: {
        base: 'system-ui, -apple-system, sans-serif',
        heading: 'inherit',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
      },
      breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    },
    null,
    2
  );
}

/**
 * Generates layout YAML
 */
function generateLayoutYAML(name: string, blocks: LayoutBlock[]): string {
  const rows = blocks
    .map((b, i) => {
      return `    - id: row_${i + 1}
      title: "${b.name}"
      class: "${b.class || ''}"
      cols:
        - position: ${b.position}
          width: col-12`;
    })
    .join('\n');

  return `# InstantCMS 2 Layout Scheme
name: ${name}
title: ${name} Layout
${rows}
`;
}

/**
 * Generates header template
 */
function generateHeaderTemplate(name: string, _Name: string): string {
  return `<?php
// InstantCMS 2. ${name}/header.tpl.php

\\$template = cmsTemplate::getInstance();
\\$config = cmsConfig::getInstance();
?>
<header class="site-header">
    <div class="header-content">
        <a href="<?php echo \\$config->root_url; ?>" class="logo">
            <?php echo \\$config->sitename; ?>
        </a>

        <nav class="header-nav">
            <?php echo \\$template->renderMenu('header'); ?>
        </nav>
    </div>
</header>
`;
}

/**
 * Generates footer template
 */
function generateFooterTemplate(name: string, _Name: string): string {
  return `<?php
// InstantCMS 2. ${name}/footer.tpl.php

\\$config = cmsConfig::getInstance();
?>
<footer class="site-footer">
    <div class="footer-content">
        <div class="footer-copyright">
            &copy; <?php echo date('Y'); ?> <?php echo \\$config->sitename; ?>
        </div>

        <nav class="footer-nav">
            <?php echo cmsTemplate::getInstance()->renderMenu('footer'); ?>
        </nav>
    </div>
</footer>
`;
}

/**
 * Generates sidebar template
 */
function generateSidebarTemplate(name: string, _Name: string): string {
  return `<?php
// InstantCMS 2. ${name}/sidebar.tpl.php

\\$widgets = cmsWidgets::getInstance();
?>
<aside class="sidebar">
    <?php echo \\$widgets->renderPosition('sidebar'); ?>
</aside>
`;
}

/**
 * Generates JavaScript file
 */
function generateJS(name: string): string {
  return `// InstantCMS 2. ${name} - Main JavaScript

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        console.log('${name} template loaded');

        initNavigation();
        initDarkMode();
    });

    function initNavigation() {
        const nav = document.querySelector('.navbar');
        if (nav) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }
    }

    function initDarkMode() {
        const toggle = document.querySelector('[data-theme-toggle]');
        if (toggle) {
            toggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
            });

            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

})();
`;
}

/**
 * Generates components CSS
 */
function generateComponentsCSS(name: string, _options: Record<string, boolean>): string {
  return `/* InstantCMS 2. ${name} - Component Styles */

.btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition-base);
}

.btn-primary {
    color: #fff;
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.card {
    position: relative;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: var(--border-radius);
    transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
    border-color: var(--color-primary);
    outline: 0;
}

.alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
}

.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}
`;
}

/**
 * Generates dark mode CSS
 */
function generateDarkModeCSS(name: string): string {
  return `/* InstantCMS 2. ${name} - Dark Mode Styles */

@media (prefers-color-scheme: dark) {
    :root {
        --color-primary: #4d9fff;
        --color-secondary: #868e96;
        --color-success: #51cf66;
        --color-danger: #ff6b6b;
        --color-warning: #fcc419;
        --color-info: #22b8cf;
    }

    body {
        color: #dee2e6;
        background-color: #1a1a1a;
    }

    #header,
    #navbar {
        background-color: #2d2d2d !important;
        border-color: #404040 !important;
    }

    #footer {
        background-color: #2d2d2d !important;
        border-color: #404040 !important;
    }

    .bg-light,
    .bg-white {
        background-color: #2d2d2d !important;
    }

    .text-muted {
        color: #868e96 !important;
    }

    .card {
        background-color: #2d2d2d;
        border-color: #404040;
    }

    .form-control {
        color: #dee2e6;
        background-color: #323232;
        border-color: #495057;
    }
}
`;
}

/**
 * Generates a complete template for InstantCMS
 *
 * @param opts - Configuration options for the template
 * @returns Object containing generated files and metadata
 *
 * @example
 * ```typescript
 * const result = scaffoldTemplate({
 *   template_name: 'mytheme',
 *   options: { with_layout: true, with_responsive: true, with_dark_mode: true }
 * });
 * ```
 */
export function scaffoldTemplate(opts: ScaffoldTemplateOptions): ScaffoldResult {
  const { lowercase, UpperCamelCase } = normalizeAddonName(opts.template_name);
  const files: Record<string, string> = {};

  const options = {
    with_layout: opts.options?.with_layout ?? true,
    with_responsive: opts.options?.with_responsive ?? true,
    with_dark_mode: opts.options?.with_dark_mode ?? false,
    withRTL: opts.options?.withRTL ?? false,
  };

  const layout_blocks = opts.layout_blocks || [
    { name: 'header', position: 'top', class: 'bg-white' },
    { name: 'navbar', position: 'nav', class: 'navbar-expand-lg' },
    { name: 'content', position: 'content', class: 'main-content' },
    { name: 'sidebar', position: 'right', class: 'sidebar' },
    { name: 'footer', position: 'bottom', class: 'bg-light' },
  ];

  files[`${lowercase}/manifest.json`] = generateManifest(lowercase, UpperCamelCase, options);
  files[`${lowercase}/main.tpl.php`] = generateMainTemplate(
    lowercase,
    UpperCamelCase,
    layout_blocks,
    options
  );
  files[`${lowercase}/main.css`] = generateMainCSS(lowercase, options);
  files[`${lowercase}/variables.json`] = generateVariables(lowercase, UpperCamelCase);

  if (options.with_layout) {
    files[`${lowercase}/layout.yaml`] = generateLayoutYAML(lowercase, layout_blocks);
  }

  files[`${lowercase}/header.tpl.php`] = generateHeaderTemplate(lowercase, UpperCamelCase);
  files[`${lowercase}/footer.tpl.php`] = generateFooterTemplate(lowercase, UpperCamelCase);
  files[`${lowercase}/sidebar.tpl.php`] = generateSidebarTemplate(lowercase, UpperCamelCase);

  files[`${lowercase}/assets/js/app.js`] = generateJS(lowercase);
  files[`${lowercase}/assets/css/components.css`] = generateComponentsCSS(lowercase, options);

  if (options.with_dark_mode) {
    files[`${lowercase}/dark.css`] = generateDarkModeCSS(lowercase);
  }

  return {
    addon_name: lowercase,
    files,
    template_name: lowercase,
    options,
    blocks_count: layout_blocks.length,
  };
}

export const templateToolSchema = {
  name: 'scaffold_template',
  description: 'Генерация темы шаблона InstantCMS с layout, стилями и поддержкой dark mode',
  inputSchema: {
    type: 'object' as const,
    properties: {
      template_name: { type: 'string', description: 'Имя шаблона' },
      options: z
        .object({
          with_layout: z.boolean().optional().describe('С layout.yaml'),
          with_responsive: z.boolean().optional().describe('Адаптивный дизайн'),
          with_dark_mode: z.boolean().optional().describe('Тёмная тема'),
          withRTL: z.boolean().optional().describe('RTL поддержка'),
        })
        .optional()
        .describe('Опции'),
      layout_blocks: z
        .array(
          z.object({
            name: z.string().describe('Название блока'),
            position: z.string().describe('Позиция виджетов'),
            class: z.string().optional().describe('CSS класс'),
          })
        )
        .optional()
        .describe('Блоки layout'),
    },
    required: ['template_name'],
  },
  inputExamples: [
    {
      template_name: 'mytheme',
      options: { with_layout: true, with_responsive: true, with_dark_mode: true },
    },
  ],
};
