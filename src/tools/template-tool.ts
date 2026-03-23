import { z } from 'zod';

interface LayoutBlock {
  name: string;
  position: string;
  class?: string;
}

interface ScaffoldTemplateOptions {
  template_name: string;
  options?: {
    with_layout?: boolean;
    with_responsive?: boolean;
    with_dark_mode?: boolean;
    withRTL?: boolean;
  };
  layout_blocks?: LayoutBlock[];
}

export function scaffoldTemplate(opts: ScaffoldTemplateOptions): object {
  const name = opts.template_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
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

  files[`${name}/manifest.json`] = generateManifest(name, Name, options);
  files[`${name}/main.tpl.php`] = generateMainTemplate(name, Name, layout_blocks, options);
  files[`${name}/main.css`] = generateMainCSS(name, options);
  files[`${name}/variables.json`] = generateVariables(name, Name);

  if (options.with_layout) {
    files[`${name}/layout.yaml`] = generateLayoutYAML(name, layout_blocks);
  }

  files[`${name}/header.tpl.php`] = generateHeaderTemplate(name, Name);
  files[`${name}/footer.tpl.php`] = generateFooterTemplate(name, Name);
  files[`${name}/sidebar.tpl.php`] = generateSidebarTemplate(name, Name);

  files[`${name}/assets/js/app.js`] = generateJS(name);
  files[`${name}/assets/css/components.css`] = generateComponentsCSS(name, options);

  if (options.with_dark_mode) {
    files[`${name}/dark.css`] = generateDarkModeCSS(name);
  }

  return {
    template_name: name,
    options,
    blocks_count: layout_blocks.length,
    files,
  };
}

function generateManifest(name: string, Name: string, options: any): string {
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

function generateMainTemplate(
  name: string,
  Name: string,
  blocks: LayoutBlock[],
  options: any
): string {
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
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="<?php echo \\$template->getAssetUrl('main.css'); ?>">
    
    <?php if (${options.with_dark_mode}): ?>
    <!-- Dark Mode CSS -->
    <link rel="stylesheet" href="<?php echo \\$template->getAssetUrl('dark.css'); ?>" media="(prefers-color-scheme: dark)">
    <?php endif; ?>
</head>
<body class="<?php echo implode(' ', \\$body_class); ?>">
    
    <div id="wrapper" class="<?php echo \\$template->getLayoutClass(); ?>">
        
        <?php echo \\$widgets->renderPosition('top'); ?>
        
        <header id="header" class="<?php echo '${blocks.find(b => b.name === 'header')?.class || 'bg-white'}'; ?>">
            <div class="container">
                <?php echo \\$widgets->renderPosition('header'); ?>
            </div>
        </header>
        
        <nav id="navbar" class="<?php echo '${blocks.find(b => b.name === 'navbar')?.class || 'navbar navbar-expand-lg navbar-light bg-white'}'; ?>">
            <div class="container">
                <?php echo \\$widgets->renderPosition('nav'); ?>
            </div>
        </nav>
        
        <main id="main-content" class="<?php echo '${blocks.find(b => b.name === 'content')?.class || 'py-4'}'; ?>">
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
        
        <footer id="footer" class="<?php echo '${blocks.find(b => b.name === 'footer')?.class || 'bg-light py-4'}'; ?>">
            <div class="container">
                <?php echo \\$widgets->renderPosition('footer'); ?>
                <div class="text-center text-muted">
                    &copy; <?php echo date('Y'); ?> <?php echo \\$config->sitename; ?>
                </div>
            </div>
        </footer>
        
    </div>
    
    <!-- JS -->
    <script src="<?php echo \\$template->getAssetUrl('assets/js/app.js'); ?>"></script>
    
    <?php echo \\$template->getBodyEnd(); ?>
</body>
</html>
`;
}

function generateMainCSS(name: string, options: any): string {
  return `/* InstantCMS 2. ${name} - Main Styles */

/* Variables */
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

/* Reset */
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

/* Typography */
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

/* Layout */
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

/* Header */
#header {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

/* Navbar */
#navbar {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

/* Footer */
#footer {
    margin-top: auto;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
}

/* Grid */
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

/* Responsive */
<?php if (${options.with_responsive}): ?>
@media (max-width: 991px) {
    .col-lg-8,
    .col-lg-4 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}
<?php endif; ?>

/* Utilities */
.text-center { text-align: center; }
.text-muted { color: #6c757d; }
.bg-light { background-color: #f8f9fa; }
.bg-white { background-color: #fff; }
.py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mb-3 { margin-bottom: 1rem; }
`;
}

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

function generateJS(name: string): string {
  return `// InstantCMS 2. ${name} - Main JavaScript

(function() {
    'use strict';
    
    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('${name} template loaded');
        
        // Initialize components
        initNavigation();
        initDarkMode();
    });
    
    // Navigation
    function initNavigation() {
        const nav = document.querySelector('.navbar');
        if (nav) {
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }
    }
    
    // Dark Mode Toggle
    function initDarkMode() {
        const toggle = document.querySelector('[data-theme-toggle]');
        if (toggle) {
            toggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
            });
            
            // Check saved preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }
    
})();
`;
}

function generateComponentsCSS(name: string, _options: any): string {
  return `/* InstantCMS 2. ${name} - Component Styles */

/* Buttons */
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

/* Cards */
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

/* Forms */
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

/* Alerts */
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
