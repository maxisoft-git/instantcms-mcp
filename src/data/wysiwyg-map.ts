// WYSIWYG Editors data for InstantCMS 2

export interface WysiwygEditorOption {
  type: string;
  description: string;
  default?: unknown;
}

export interface WysiwygPlugin {
  name: string;
  description: string;
}

export interface WysiwygMarkitupButton {
  name: string;
  key?: string;
  className: string;
  openWith?: string;
  closeWith?: string;
  replaceWith?: string;
  multiline?: boolean;
  openBlockWith?: string;
  closeBlockWith?: string;
  beforeInsert?: boolean;
  placeHolder?: string;
}

export interface WysiwygEditor {
  name: string;
  className: string;
  filePath: string;
  optionsFormPath: string;
  description: string;
  isocode: string;
  options: Record<string, unknown>;
  optionsDescriptions: Record<string, WysiwygEditorOption>;
  plugins?: WysiwygPlugin[];
  buttons?: (string | WysiwygMarkitupButton)[];
  features: string[];
}

export interface WysiwygMap {
  editors: WysiwygEditor[];
  byName: Record<string, WysiwygEditor>;
  editorCount: number;
}

export const wysiwygMap: WysiwygMap = {
  editors: [
    {
      name: 'ace',
      className: 'cmsWysiwygAce',
      filePath: '/source/wysiwyg/ace/wysiwyg.class.php',
      optionsFormPath: '/source/wysiwyg/ace/options.php',
      description:
        'Редактор кода на основе Ace. Поддерживает подсветку синтаксиса, автодополнение, сниппеты и Emmet.',
      isocode: 'ace',
      options: {
        theme: 'ace/theme/github_light_default',
        mode: 'ace/mode/html',
        wrap: true,
        fontSize: 14,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableEmmet: false,
        showLineNumbers: true,
        enableLiveAutocompletion: true,
        newLineMode: 'unix',
        autoScrollEditorIntoView: true,
        minLines: 20,
        maxLines: 40,
      },
      optionsDescriptions: {
        theme: {
          type: 'string',
          description: 'Тема оформления редактора',
          default: 'ace/theme/github_light_default',
        },
        mode: {
          type: 'string',
          description:
            'Режим подсветки синтаксиса (ace/mode/html, ace/mode/php, ace/mode/javascript)',
          default: 'ace/mode/html',
        },
        wrap: { type: 'boolean', description: 'Перенос строк', default: true },
        fontSize: { type: 'number', description: 'Размер шрифта в пикселях', default: 14 },
        enableBasicAutocompletion: {
          type: 'boolean',
          description: 'Базовая автоподстановка',
          default: true,
        },
        enableSnippets: { type: 'boolean', description: 'Поддержка сниппетов', default: true },
        enableEmmet: {
          type: 'boolean',
          description: 'Поддержка Emmet (быстрый ввод HTML)',
          default: false,
        },
        showLineNumbers: { type: 'boolean', description: 'Показывать номера строк', default: true },
        enableLiveAutocompletion: {
          type: 'boolean',
          description: 'Живая автоподстановка',
          default: true,
        },
        showInvisibles: {
          type: 'boolean',
          description: 'Показывать невидимые символы',
          default: false,
        },
        showGutter: {
          type: 'boolean',
          description: 'Показывать gutter (зону номеров строк)',
          default: true,
        },
        displayIndentGuides: {
          type: 'boolean',
          description: 'Показывать направляющие отступов',
          default: true,
        },
      },
      features: [
        'Подсветка синтаксиса',
        'Автодополнение кода',
        ' сниппеты',
        'Emmet',
        'Темы оформления',
        'Минимум/максимум строк',
      ],
    },
    {
      name: 'markitup',
      className: 'cmsWysiwygMarkitup',
      filePath: '/source/wysiwyg/markitup/wysiwyg.class.php',
      optionsFormPath: '/source/wysiwyg/markitup/options.php',
      description:
        'Легковесный редактор разметки. Генерирует HTML код без визуального редактирования. Подходит для технических пользователей.',
      isocode: 'markitup',
      options: {
        skin: 'simple',
      },
      optionsDescriptions: {
        buttons: {
          type: 'array',
          description:
            'IDs кнопок для отображения в тулбаре (0=Bold, 1=Italic, 2=Underline, 3=Strikethrough, 4=Unordered list, 5=Ordered list, 6=Quote, 7=Link, 8=Image URL, 9=Image Upload, 10=YouTube, 11=Facebook video, 12=Code, 13=Spoiler, 14=Smiles)',
          default: [0, 1, 2, 3, 9, 14],
        },
        skin: { type: 'string', description: 'Скин оформления', default: 'simple' },
      },
      buttons: [
        { name: 'Bold', key: 'B', className: 'btnBold', openWith: '<b>', closeWith: '</b>' },
        { name: 'Italic', key: 'I', className: 'btnItalic', openWith: '<i>', closeWith: '</i>' },
        {
          name: 'Underline',
          key: 'U',
          className: 'btnUnderline',
          openWith: '<u>',
          closeWith: '</u>',
        },
        {
          name: 'Strikethrough',
          key: 'S',
          className: 'btnStroke',
          openWith: '<s>',
          closeWith: '</s>',
        },
        {
          name: 'Unordered list',
          className: 'btnOl',
          multiline: true,
          openBlockWith: '<ul>\n',
          closeBlockWith: '\n</ul>',
          openWith: '<li>',
          closeWith: '</li>',
        },
        {
          name: 'Ordered list',
          className: 'btnUl',
          multiline: true,
          openBlockWith: '<ol>\n',
          closeBlockWith: '\n</ol>',
          openWith: '<li>',
          closeWith: '</li>',
        },
        {
          name: 'Quote',
          className: 'btnQuote',
          openWith: '<blockquote>',
          closeWith: '</blockquote>',
        },
        {
          name: 'Link',
          key: 'L',
          className: 'btnLink',
          openWith: '<a target="_blank" href="[![:https://]!]">',
          closeWith: '</a>',
        },
        {
          name: 'Image URL',
          className: 'btnImg',
          replaceWith: '<img src="[![:https://]!]" alt="[!]!">',
        },
        { name: 'Image Upload', className: 'btnImgUpload', beforeInsert: true },
        {
          name: 'YouTube',
          className: 'btnVideoYoutube',
          openWith: '<youtube>[!]!',
          closeWith: '</youtube>',
        },
        {
          name: 'Facebook video',
          className: 'btnVideoFacebook',
          openWith: '<facebook>[!]!',
          closeWith: '</facebook>',
        },
        {
          name: 'Code',
          className: 'btnCode',
          openWith: '<code type="[![:php]!]">',
          closeWith: '</code>',
        },
        {
          name: 'Spoiler',
          className: 'btnSpoiler',
          openWith: '<spoiler title="[![:!]!">',
          closeWith: '</spoiler>',
        },
        { name: 'Smiles', key: 'Z', className: 'btnSmiles', beforeInsert: true },
      ],
      features: [
        'BB-code стиль ввода',
        'Быстрые клавиши',
        'Загрузка изображений',
        'Вставка видео (YouTube, Facebook)',
        'Сниппеты кода',
        'Смайлы',
      ],
    },
    {
      name: 'redactor',
      className: 'cmsWysiwygRedactor',
      filePath: '/source/wysiwyg/redactor/wysiwyg.class.php',
      optionsFormPath: '/source/wysiwyg/redactor/options.php',
      description:
        'Imperavi Redactor - визуальный WYSIWYG редактор. Популярный выбор для большинства сайтов.',
      isocode: 'redactor',
      options: {
        minHeight: 200,
        toolbarFixedBox: false,
        plugins: ['smiles', 'spoiler'],
      },
      optionsDescriptions: {
        plugins: {
          type: 'array',
          description:
            'Плагины: clips, fontcolor, fontfamily, fontsize, fullscreen, smiles, spoiler, textdirection',
          default: ['smiles', 'spoiler'],
        },
        buttons: {
          type: 'array',
          description: 'Кнопки тулбара',
          default: [
            'html',
            'undo',
            'redo',
            'bold',
            'italic',
            'deleted',
            'unorderedlist',
            'orderedlist',
            'outdent',
            'indent',
            'image',
            'video',
            'table',
            'link',
            'alignment',
          ],
        },
        convertVideoLinks: {
          type: 'boolean',
          description: 'Конвертировать ссылки YouTube/Vimeo в видео',
          default: true,
        },
        convertDivs: {
          type: 'boolean',
          description: 'Конвертировать div в paragraph',
          default: false,
        },
        toolbarFixedBox: {
          type: 'boolean',
          description: 'Фиксированная панель инструментов',
          default: true,
        },
        autoresize: { type: 'boolean', description: 'Автоматическая высота', default: true },
        pastePlainText: {
          type: 'boolean',
          description: 'Вставлять как простой текст',
          default: false,
        },
        removeEmptyTags: {
          type: 'boolean',
          description: 'Удалять пустые теги при сохранении',
          default: true,
        },
        linkNofollow: {
          type: 'boolean',
          description: 'Добавлять rel=nofollow к ссылкам',
          default: false,
        },
        minHeight: { type: 'number', description: 'Минимальная высота в пикселях', default: 200 },
        placeholder: { type: 'string', description: 'Текст-подсказка в пустом поле' },
      },
      plugins: [
        { name: 'clips', description: 'Заготовки текста (clips)' },
        { name: 'fontcolor', description: 'Цвет текста' },
        { name: 'fontfamily', description: 'Шрифт текста' },
        { name: 'fontsize', description: 'Размер шрифта' },
        { name: 'fullscreen', description: 'Полноэкранный режим' },
        { name: 'smiles', description: 'Смайлы и эмотиконы' },
        { name: 'spoiler', description: 'Сворачиваемый текст (спойлер)' },
        { name: 'textdirection', description: 'Направление текста RTL/LTR' },
      ],
      buttons: [
        'html',
        'undo',
        'redo',
        'formatting',
        'bold',
        'italic',
        'deleted',
        'unorderedlist',
        'orderedlist',
        'outdent',
        'indent',
        'image',
        'video',
        'table',
        'link',
        'alignment',
        'horizontalrule',
        'underline',
        'alignleft',
        'aligncenter',
        'alignright',
        'justify',
      ],
      features: [
        'Визуальное редактирование',
        'Drag & drop изображений',
        'Вставка видео',
        'Таблицы',
        'Смайлы',
        'Спойлеры',
        'Клипы (заготовки)',
      ],
    },
    {
      name: 'tinymce',
      className: 'cmsWysiwygTinymce',
      filePath: '/source/wysiwyg/tinymce/wysiwyg.class.php',
      optionsFormPath: '/source/wysiwyg/tinymce/options.php',
      description:
        'TinyMCE - мощный WYSIWYG редактор с гибкой настройкой тулбара и большим количеством плагинов.',
      isocode: 'tinymce',
      options: {
        plugins: ['autoresize'],
        toolbar:
          'blocks | bold italic strikethrough forecolor backcolor | link image media table | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
        min_height: 200,
        max_height: 700,
        browser_spellcheck: true,
        contextmenu: false,
        menubar: false,
        statusbar: false,
        relative_urls: false,
        convert_urls: false,
        paste_data_images: true,
        highlight_on_focus: true,
        link_quicklink: true,
        link_context_toolbar: true,
        image_caption: false,
        toolbar_mode: 'floating',
        toolbar_sticky: false,
        skin: 'oxide',
        images_preset: 'big',
        placeholder: '',
        license_key: 'gpl',
        referrer_policy: 'origin',
        sandbox_iframes: false,
      },
      optionsDescriptions: {
        toolbar: { type: 'string', description: 'Кнопки тулбара через | (pipe)' },
        quickbars_selection_toolbar: {
          type: 'string',
          description: 'Быстрый тулбар при выделении текста',
        },
        quickbars_insert_toolbar: { type: 'string', description: 'Быстрый тулбар при вставке' },
        plugins: {
          type: 'array',
          description:
            'Плагины: advlist, anchor, autolink, autoresize, charmap, code, codesample, emoticons, fullscreen, icmsinsertfile, icmsspoiler, image, insertdatetime, link, lists, media, nonbreaking, quickbars, searchreplace, smiles, table, wordcount',
          default: ['autoresize'],
        },
        skin: { type: 'string', description: 'Скин: oxide, oxide-dark', default: 'oxide' },
        forced_root_block: { type: 'string', description: 'Тег обёртки: p или div', default: 'p' },
        newline_behavior: {
          type: 'string',
          description: 'Поведение Enter: default, block, linebreak, invert',
          default: 'default',
        },
        block_formats: {
          type: 'array',
          description: 'Форматы абзацев: p, h2, h3, h4, h5, h6',
          default: ['p', 'h2', 'h3'],
        },
        toolbar_mode: {
          type: 'string',
          description: 'Режим тулбара: wrap, floating, sliding, scrolling',
          default: 'floating',
        },
        toolbar_sticky: { type: 'boolean', description: 'Прилипающий тулбар', default: false },
        image_caption: { type: 'boolean', description: 'Подпись к изображению', default: false },
        image_title: {
          type: 'boolean',
          description: 'Атрибут title у изображения',
          default: false,
        },
        image_description: {
          type: 'boolean',
          description: 'Атрибут alt у изображения',
          default: false,
        },
        image_dimensions: { type: 'boolean', description: 'Размеры изображения', default: false },
        image_advtab: {
          type: 'boolean',
          description: 'Расширенные настройки изображения',
          default: false,
        },
        statusbar: { type: 'boolean', description: 'Показывать статусную строку', default: false },
        min_height: { type: 'number', description: 'Минимальная высота в пикселях', default: 350 },
        max_height: { type: 'number', description: 'Максимальная высота в пикселях', default: 700 },
        placeholder: { type: 'string', description: 'Текст-подсказка в пустом поле' },
        images_preset: {
          type: 'string',
          description: 'Прессет обработки изображений',
          default: 'big',
        },
      },
      plugins: [
        { name: 'advlist', description: 'Расширенные списки' },
        { name: 'anchor', description: 'Якоря' },
        { name: 'autolink', description: 'Автоматическое создание ссылок' },
        { name: 'autoresize', description: 'Автоматическая высота' },
        { name: 'charmap', description: 'Специальные символы' },
        { name: 'code', description: 'Исходный код' },
        { name: 'codesample', description: 'Подсветка кода с примерами языков' },
        { name: 'emoticons', description: 'Эмотиконы/смайлы' },
        { name: 'fullscreen', description: 'Полноэкранный режим' },
        { name: 'icmsinsertfile', description: 'Вставка файлов (InstantCMS)' },
        { name: 'icmsspoiler', description: 'Спойлер (InstantCMS)' },
        { name: 'image', description: 'Вставка изображений' },
        { name: 'insertdatetime', description: 'Дата и время' },
        { name: 'link', description: 'Ссылки' },
        { name: 'lists', description: 'Списки (bullist, numlist)' },
        { name: 'media', description: 'Вставка видео/аудио' },
        { name: 'nonbreaking', description: 'Неразрывный пробел' },
        { name: 'quickbars', description: 'Быстрый тулбар' },
        { name: 'searchreplace', description: 'Поиск и замена' },
        { name: 'smiles', description: 'Смайлы (InstantCMS)' },
        { name: 'table', description: 'Таблицы' },
        { name: 'wordcount', description: 'Счётчик слов' },
      ],
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'alignleft',
        'aligncenter',
        'alignright',
        'alignjustify',
        'alignnone',
        'styles',
        'blocks',
        'fontfamily',
        'fontsize',
        'cut',
        'copy',
        'paste',
        'outdent',
        'indent',
        'blockquote',
        'undo',
        'redo',
        'removeformat',
        'subscript',
        'superscript',
        'visualaid',
        'insert',
        'forecolor',
        'backcolor',
        '|',
        'wordcount',
        'nonbreaking',
        'media',
        'insertdatetime',
        'image',
        'fullscreen',
        'code',
        'charmap',
        'anchor',
        'smiles',
        'emoticons',
        'codesample',
        'icmsspoiler',
        'lists',
        'link',
        'table',
      ],
      features: [
        'Гибкий тулбар',
        'Поддержка плагинов',
        'Темы оформления (skin)',
        'Автозагрузка изображений',
        'Группы пользователей',
        'Сниппеты кода',
        'Спойлер',
        'Эмодзи',
      ],
    },
  ],
  byName: {} as Record<string, WysiwygEditor>,
  editorCount: 4,
};

// Build byName index
wysiwygMap.editors.forEach(editor => {
  wysiwygMap.byName[editor.name] = editor;
});
