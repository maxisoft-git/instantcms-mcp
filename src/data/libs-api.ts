// Library API для InstantCMS
// Источник: source/system/libs/

export interface LibsAPI {
  helpers: HelperLibraries;
  classes: ClassLibraries;
  thirdParty: ThirdPartyLibraries;
}

export interface HelperLibraries {
  template: {
    name: string;
    file: string;
    description: string;
    functions: TemplateHelperFunction[];
  };
  html: {
    name: string;
    file: string;
    description: string;
    functions: HtmlHelperFunction[];
  };
  files: {
    name: string;
    file: string;
    description: string;
    functions: FilesHelperFunction[];
  };
  strings: {
    name: string;
    file: string;
    description: string;
    functions: StringsHelperFunction[];
  };
}

export interface TemplateHelperFunction {
  name: string;
  description: string;
  params: string[];
  return: string;
}

export interface HtmlHelperFunction {
  name: string;
  description: string;
  params: string[];
  return: string;
}

export interface FilesHelperFunction {
  name: string;
  description: string;
  params: string[];
  return: string;
}

export interface StringsHelperFunction {
  name: string;
  description: string;
  params: string[];
  return: string;
}

export interface ClassLibraries {
  jevix: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    methods: string[];
  };
  googleAuthenticator: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    methods: string[];
  };
  mobileDetect: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    methods: string[];
  };
  lastRSS: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    methods: string[];
  };
  idnaConvert: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    methods: string[];
  };
  spyc: {
    name: string;
    file: string;
    className: string;
    description: string;
    version: string;
    purpose: string;
    functions: string[];
  };
}

export interface ThirdPartyLibraries {
  scssphp: {
    name: string;
    path: string;
    description: string;
    version: string;
    purpose: string;
    classes: string[];
  };
  geshi: {
    name: string;
    path: string;
    description: string;
    purpose: string;
    languages: string[];
  };
  phpmailer: {
    name: string;
    path: string;
    description: string;
    purpose: string;
    classes: string[];
  };
}

export const libsData: LibsAPI = {
  helpers: {
    template: {
      name: 'template.helper',
      file: 'source/system/libs/template.helper.php',
      description: 'HTML-шаблонизация: ссылки, изображения, формы, дата, кнопки, пагинация',
      functions: [
        { name: 'html_svg_icon', description: 'Выводит инлайновую SVG иконку', params: ['file', 'name', 'size?', 'print?'], return: 'string' },
        { name: 'html_link', description: 'Возвращает тег <a>', params: ['title', 'href', 'attributes?'], return: 'void' },
        { name: 'html_pagebar', description: 'Возвращает панель со страницами', params: ['page', 'perpage', 'total', 'base_uri?', 'query?', 'page_param_name?'], return: 'string' },
        { name: 'html_input', description: 'Возвращает тег <input>', params: ['type?', 'name?', 'value?', 'attributes?'], return: 'string' },
        { name: 'html_file_input', description: 'Возвращает тег <input type="file">', params: ['name', 'attributes?'], return: 'string' },
        { name: 'html_textarea', description: 'Возвращает тег <textarea>', params: ['name?', 'value?', 'attributes?'], return: 'string' },
        { name: 'html_checkbox', description: 'Возвращает тег <input type="checkbox">', params: ['name', 'checked?', 'value?', 'attributes?'], return: 'string' },
        { name: 'html_radio', description: 'Возвращает тег <input type="radio">', params: ['name', 'checked?', 'value?', 'attributes?'], return: 'string' },
        { name: 'html_date', description: 'Печатает отформатированную дату', params: ['date?', 'is_time?'], return: 'string' },
        { name: 'html_time', description: 'Печатает время от даты', params: ['date?'], return: 'string' },
        { name: 'html_date_time', description: 'Печатает отформатированную дату и время', params: ['date?'], return: 'string' },
        { name: 'html_datepicker', description: 'Возвращает поле выбора даты', params: ['name?', 'value?', 'attributes?', 'datepicker?'], return: 'string' },
        { name: 'html_submit', description: 'Возвращает кнопку "Отправить"', params: ['caption?', 'name?', 'attributes?'], return: 'string' },
        { name: 'html_button', description: 'Возвращает HTML-код кнопки', params: ['caption', 'name', 'onclick?', 'attributes?'], return: 'string' },
        { name: 'html_avatar_image', description: 'Возвращает тег <img> аватара пользователя', params: ['avatars', 'size_preset?', 'alt?', 'is_html_empty_avatar?'], return: 'string' },
        { name: 'html_avatar_image_empty', description: 'Возвращает пустой аватар с буквой', params: ['title', 'class?'], return: 'string' },
        { name: 'get_image_block_param_by_title', description: 'Возвращает CSS стиль по переданной строке', params: ['title'], return: 'array' },
        { name: 'html_image', description: 'Возвращает тег <img>', params: ['image', 'size_preset?', 'alt?', 'attributes?'], return: 'string' },
        { name: 'html_gif_image', description: 'Возвращает HTML блок GIF изображения', params: ['image', 'size_preset?', 'alt?', 'attributes?'], return: 'string' },
        { name: 'html_select', description: 'Генерирует список опций <select>', params: ['name', 'items', 'selected?', 'attributes?'], return: 'string' },
        { name: 'html_select_multiple', description: 'Генерирует список опций с множественным выбором', params: ['name', 'items', 'selected?', 'attributes?', 'is_tree?'], return: 'string' },
        { name: 'html_category_list', description: 'Генерирует дерево категорий в виде комбо-бокса', params: ['tree', 'selected_id?'], return: 'string' },
        { name: 'html_switch', description: 'Генерирует две радио-кнопки ВКЛ и ВЫКЛ', params: ['name', 'active'], return: 'string' },
        { name: 'html_back_button', description: 'DEPRECATED. Кнопка "Назад"', params: [], return: 'string' },
        { name: 'html_bool_span', description: 'Возвращает span с цветом для булевых значений', params: ['value', 'condition', 'classes?'], return: 'string' },
        { name: 'html_array_to_list', description: 'Строит рекурсивно список UL из массива', params: ['array'], return: 'string' },
        { name: 'html_search_bar', description: 'Возвращает строку поисковых букв/тегов', params: ['list', 'href', 'link_class?', 'glue?'], return: 'string' },
        { name: 'html_tags_bar', description: 'Возвращает строку тегов', params: ['tags', 'prefix?', 'class?', 'glue?'], return: 'string' },
      ]
    },
    html: {
      name: 'html.helper',
      file: 'source/system/libs/html.helper.php',
      description: 'HTML утилиты: экранирование, ссылки, изображения, типографика, форматирование',
      functions: [
        { name: 'html', description: 'Экранирует значение для безопасного вывода в HTML', params: ['string', 'print?'], return: 'string|null' },
        { name: 'html_clean', description: 'Очищает строку от тегов и обрезает до нужной длины', params: ['string', 'max_length?'], return: 'string' },
        { name: 'html_strip', description: 'Обрезает строку до заданного количества символов', params: ['string', 'max_length'], return: 'string' },
        { name: 'rel_to_href', description: 'Формирует ссылку по относительной', params: ['rel_link', 'is_abs?'], return: 'string' },
        { name: 'href_to_profile', description: 'Возвращает ссылку на профиль пользователя', params: ['user', 'params?', 'is_abs?'], return: 'string' },
        { name: 'href_to', description: 'Возвращает ссылку на действие контроллера от корня', params: ['controller', 'action?', 'params?', 'query?'], return: 'string' },
        { name: 'href_to_abs', description: 'Возвращает ссылку с хостом сайта', params: ['controller', 'action?', 'params?', 'query?'], return: 'string' },
        { name: 'href_to_rel', description: 'Возвращает ссылку без добавления корня URL', params: ['controller', 'action?', 'params?', 'query?'], return: 'string' },
        { name: 'href_to_current', description: 'Возвращает ссылку на текущую страницу', params: ['add_host?'], return: 'string' },
        { name: 'href_to_home', description: 'Возвращает ссылку на главную страницу', params: ['add_host?'], return: 'string' },
        { name: 'html_attr_str', description: 'Возвращает отформатированную строку атрибутов', params: ['attributes', 'unset_class_key?'], return: 'string' },
        { name: 'html_tag_short', description: 'Печатает короткий HTML тег', params: ['tag_name', 'attributes', 'class?'], return: 'string' },
        { name: 'default_images', description: 'Возвращает путь к изображению по умолчанию', params: ['type', 'preset'], return: 'array' },
        { name: 'html_avatar_image_src', description: 'Возвращает ссылку на аватар пользователя', params: ['avatars', 'size_preset?', 'is_relative?'], return: 'string' },
        { name: 'html_image_src', description: 'Возвращает путь к файлу изображения', params: ['image', 'size_preset?', 'is_add_host?', 'is_relative?'], return: 'string|false' },
        { name: 'html_wysiwyg', description: 'Возвращает код WYSIWYG редактора', params: ['field_name', 'content?', 'wysiwyg?', 'config?'], return: 'string' },
        { name: 'html_editor', description: 'Редактор markitup (совместимость)', params: ['field_name', 'content?', 'options?'], return: 'string' },
        { name: 'html_select_range', description: 'Генерирует список опций с диапазоном чисел', params: ['name', 'start', 'end', 'step', 'add_lead_zero?', 'selected?', 'attributes?'], return: 'string' },
        { name: 'html_signed_num', description: 'Возвращает число со знаком плюс/минус', params: ['number'], return: 'string' },
        { name: 'html_signed_class', description: 'Возвращает CSS класс для положительных/отрицательных чисел', params: ['number'], return: 'string' },
        { name: 'html_csrf_token', description: 'Возвращает скрытое поле с CSRF-токеном', params: [], return: 'string' },
        { name: 'html_spellcount', description: 'Возвращает число с числительным в нужном склонении', params: ['num', 'one', 'two?', 'many?', 'zero_text?'], return: 'string' },
        { name: 'html_spellcount_only', description: 'Возвращает числительное в нужном склонении', params: ['num', 'one', 'two?', 'many?'], return: 'string' },
        { name: 'html_file_size', description: 'Возвращает отформатированный размер файла', params: ['bytes', 'round?'], return: 'string' },
        { name: 'html_views_format', description: 'Форматирует число просмотров с суффиксами K, M', params: ['num'], return: 'string' },
        { name: 'html_minutes_format', description: 'Форматирует минуты в часы и минуты', params: ['minutes'], return: 'string' },
        { name: 'html_each', description: 'Склеивает массив строк в одну', params: ['array'], return: 'string' },
        { name: 'html_minify', description: 'Вырезает из HTML пробелы, табуляции и переносы', params: ['html'], return: 'string' },
        { name: 'nf', description: 'Форматирует число с группировкой классов', params: ['number', 'decimals?', 'thousands_sep?', 'trim_zero?'], return: 'string' },
      ]
    },
    files: {
      name: 'files.helper',
      file: 'source/system/libs/files.helper.php',
      description: 'Файловые операции: копирование, удаление, директории, загрузка, изображения',
      functions: [
        { name: 'files_get_dirs_list', description: 'Возвращает список директорий внутри указанной', params: ['dir', 'asc_sort?'], return: 'array' },
        { name: 'files_copy_directory', description: 'Копирует директорию', params: ['directory_from', 'directory_to'], return: 'bool' },
        { name: 'files_remove_directory', description: 'Рекурсивно удаляет директорию', params: ['directory', 'is_clear?'], return: 'bool' },
        { name: 'files_clear_directory', description: 'Очищает директорию', params: ['directory'], return: 'bool' },
        { name: 'files_delete_file', description: 'Удаляет файл и родительские директории', params: ['file_path', 'delete_parent_dir?'], return: 'boolean' },
        { name: 'files_tree_to_array', description: 'Возвращает дерево каталогов в виде массива', params: ['path'], return: 'array' },
        { name: 'files_normalize_path', description: 'Нормализует путь к файлу', params: ['path'], return: 'string' },
        { name: 'files_convert_bytes', description: 'Переводит строку "8M" в байты', params: ['value'], return: 'int' },
        { name: 'files_format_bytes', description: 'Переводит байты в Гб, Мб, Кб', params: ['bytes'], return: 'string' },
        { name: 'files_user_file_hash', description: 'Возвращает 32-х символьный хэш, привязанный к IP', params: ['file_path?'], return: 'string' },
        { name: 'files_sanitize_name', description: 'Очищает имя файла от специальных символов', params: ['filename', 'convert_slug?'], return: 'string' },
        { name: 'files_get_upload_dir', description: 'Возвращает/создаёт путь к директории хранения', params: ['user_id?'], return: 'string' },
        { name: 'file_get_contents_from_url', description: 'Получает данные по URL', params: ['url', 'timeout?', 'json_decode?', 'params?'], return: 'string|null' },
        { name: 'file_save_from_url', description: 'Сохраняет удалённый файл', params: ['url', 'destination'], return: 'boolean' },
        { name: 'img_add_watermark', description: 'DEPRECATED. Накладывает ваттермарк', params: ['src_file', 'wm_file', 'wm_origin', 'wm_margin', 'quality?'], return: 'boolean' },
        { name: 'img_resize', description: 'DEPRECATED. Изменяет размер изображения', params: ['src', 'dest', 'maxwidth', 'maxheight?', 'is_square?', 'quality?'], return: 'boolean' },
        { name: 'img_get_params', description: 'Возвращает параметры изображения', params: ['path'], return: 'array|false' },
        { name: 'eval_fraction', description: 'Вычисляет дробные значения EXIF', params: ['fraction'], return: 'float' },
        { name: 'console_exec_command', description: 'Выполняет команду в shell', params: ['command', 'postfix?'], return: 'array|null' },
      ]
    },
    strings: {
      name: 'strings.helper',
      file: 'source/system/libs/strings.helper.php',
      description: 'Строковые операции: форматирование, маски, даты, URL, SEO',
      functions: [
        { name: 'string_to_camel', description: 'Разбивает строку по разделителю и собирает в CamelCase', params: ['delimiter', 'string'], return: 'string' },
        { name: 'string_strip_br', description: 'Вырезает теги <br> из строки', params: ['string'], return: 'string' },
        { name: 'string_lang', description: 'Возвращает значение языковой константы', params: ['constant', 'default?'], return: 'string' },
        { name: 'string_mask_to_regular', description: 'Преобразует маску URL в регулярное выражение', params: ['mask'], return: 'string' },
        { name: 'string_parse_list', description: 'Разбивает текст на строки ID|VALUE', params: ['string_list'], return: 'array' },
        { name: 'string_explode_list', description: 'Разбивает текст на строки, создавая ассоциативный массив', params: ['string_list', 'index_as_value?'], return: 'array' },
        { name: 'array_keys_to_string_type', description: 'Приводит ключи массива к строковому типу', params: ['array'], return: 'array' },
        { name: 'string_in_mask_list', description: 'Проверяет вхождение строки в список масок', params: ['string', 'mask_list'], return: 'boolean' },
        { name: 'string_matches_mask_list', description: 'Проверяет совпадение маски', params: ['masks', 'string'], return: 'boolean' },
        { name: 'string_random', description: 'Генерирует случайную последовательность символов', params: ['length?', 'seed?'], return: 'string' },
        { name: 'string_date_age', description: 'Выводит разницу между датой и текущим временем', params: ['date', 'options', 'is_add_back?'], return: 'string' },
        { name: 'string_date_age_max', description: 'Выводит максимальную разницу между датами', params: ['date', 'is_add_back?'], return: 'string' },
        { name: 'real_date_diff', description: 'Возвращает разницу между датами в виде массива', params: ['date1', 'date2?'], return: 'array' },
        { name: 'string_date_format', description: 'Форматирует дату "сегодня", "вчера", "1 января"', params: ['date', 'is_time?'], return: 'string' },
        { name: 'string_replace_svg_icons', description: 'Заменяет {file%icon} на SVG иконку', params: ['string'], return: 'string' },
        { name: 'string_replace_user_properties', description: 'Заменяет {user.property} на свойство cmsUser', params: ['string', 'user?'], return: 'string' },
        { name: 'string_replace_keys_values', description: 'Заменяет {key} на значения из массива', params: ['string', 'data'], return: 'string' },
        { name: 'string_replace_keys_values_extended', description: 'Расширенная замена {key} с функциями и условиями', params: ['string', 'data', 'keep_not_found_key?'], return: 'string' },
        { name: 'string_make_links', description: 'Делает гиперссылки внутри строки активными', params: ['string'], return: 'string' },
        { name: 'string_get_meta_keywords', description: 'Возвращает ключевые слова из текста', params: ['text', 'min_length?', 'limit?'], return: 'string' },
        { name: 'string_get_meta_description', description: 'Подготавливает текст для meta description', params: ['text', 'limit?'], return: 'string' },
        { name: 'string_get_stopwords', description: 'Возвращает массив стоп-слов', params: ['lang?'], return: 'array' },
        { name: 'string_short', description: 'Обрезает текст до указанной длины', params: ['string', 'length?', 'postfix?', 'type?', 'clean_tags?'], return: 'string' },
        { name: 'string_compress', description: 'Удаляет CSS/JS комментарии и лишние пробелы', params: ['string'], return: 'string' },
        { name: 'string_ucfirst', description: 'Первый символ строки в верхний регистр (mb)', params: ['string'], return: 'string' },
        { name: 'array_collection_to_list', description: 'Извлекает значения поля коллекции', params: ['collection', 'key', 'value?'], return: 'array' },
        { name: 'array_filter_recursive', description: 'Рекурсивный array_filter', params: ['input'], return: 'array' },
        { name: 'array_value_recursive', description: 'Получает значение ячейки массива по пути', params: ['needle', 'haystack', 'delimiter?'], return: 'mixed' },
        { name: 'set_array_value_recursive', description: 'Устанавливает значение ключа массива по пути', params: ['path', 'array', 'value', 'delimiter?'], return: 'array' },
        { name: 'array_order_by', description: 'Сортирует двумерный массив по полю', params: ['array', 'fields', 'direction?'], return: 'boolean' },
        { name: 'multi_array_unique', description: 'Уникальные элементы многомерного массива', params: ['array'], return: 'array' },
        { name: 'get_localized_value', description: 'Возвращает значение поля с учётом языка', params: ['field_name', 'data', 'lang?'], return: 'mixed' },
        { name: 'nf_amount', description: 'Форматирует число с плавающей точкой', params: ['value', 'decimals?', 'thousands_sep?'], return: 'string' },
        { name: 'bc_format', description: 'Приводит число с плавающей точкой к нормальному виду', params: ['value'], return: 'string' },
        { name: 'string_iptobin', description: 'IPv4/IPv6 адрес в упакованный формат', params: ['ip'], return: 'string|null' },
        { name: 'string_bintoip', description: 'Упакованный адрес в читаемый формат', params: ['str'], return: 'string|null' },
        { name: 'string_ip_to_location', description: 'Определяет локацию по IP адресу', params: ['ip', 'return_array?'], return: 'string|array' },
        { name: 'string_html_get_images_path', description: 'Получает относительные пути из HTML', params: ['text'], return: 'array' },
        { name: 'string_replace_first', description: 'Заменяет первое вхождение (аналог str_replace)', params: ['search', 'replace', 'subject'], return: 'string' },
        { name: 'string_urlencode', description: 'Кодирует символы для URL', params: ['str'], return: 'string' },
        { name: 'is_empty_value', description: 'Проверяет, что значение пустое', params: ['value'], return: 'boolean' },
        { name: 'dump', description: 'Выводит переменную рекурсивно (для отладки)', params: ['var', 'halt?'], return: 'void' },
        { name: 'dump_if_admin', description: 'Выводит переменную если авторизация под админом', params: ['var', 'halt?'], return: 'void' },
      ]
    }
  },
  classes: {
    jevix: {
      name: 'Jevix',
      file: 'source/system/libs/jevix.class.php',
      className: 'Jevix',
      description: 'Средство автоматического применения правил набора текстов, XSS-фильтрация и HTML/XML парсер',
      version: '1.13',
      purpose: 'Унификация разметки HTML/XML документов, контроль допустимых тегов и атрибутов, предотвращение XSS-атак',
      methods: [
        'parse()', 'tagsRules', 'cfgAllowTags()', 'cfgAllowTag()', 'cfgDenyTags()',
        'cfgAllowTagsParams()', 'cfgSetTagParamsAutoAdd()', 'cfgSetTagParamDefault()',
        'cfgAllowTagsNested()', 'cfgSetTagIsEmpty()', 'cfgSetTagChild()', 'cfgSetAutoBrMode()',
        'cfgSetXHTMLMode()', 'cfgSetAutoLinkMode()', 'cfgSetAutoReplace()', 'cfgSetTagNoTypography()',
        'cfgSetTagPreformatted()', 'cfgSetLinkProtocol()', 'cfgSetTagNoAutoBr()',
        'cfgSetTagCallback()', 'cfgSetTagCallbackFull()', 'cfgSetParamCombination()',
        'parse()', 'getErrors()'
      ]
    },
    googleAuthenticator: {
      name: 'Google Authenticator',
      file: 'source/system/libs/google_authenticator.class.php',
      className: 'googleAuthenticator',
      description: 'PHP класс для Google Authenticator 2-factor authentication (2FA)',
      version: '1.0',
      purpose: 'Двухфакторная аутентификация через мобильное приложение Google Authenticator',
      methods: [
        'createSecret()', 'getCode()', 'getQRCodeGoogleUrl()', 'verifyCode()', 'setCodeLength()'
      ]
    },
    mobileDetect: {
      name: 'Mobile Detect',
      file: 'source/system/libs/mobile_detect.class.php',
      className: 'Mobile_Detect',
      description: 'Легковесный PHP класс для определения мобильных устройств и планшетов',
      version: '3.74.4',
      purpose: 'Детекция мобильных устройств по User-Agent и HTTP заголовкам',
      methods: [
        'isMobile()', 'isTablet()', 'isPhone()', 'isDevice()', 'is()',
        'isEngine()', 'isBot()', 'getScriptVersion()', 'getUserAgent()',
        'setUserAgent()', 'setHttpHeaders()', 'getHttpHeaders()', 'getMatches()'
      ]
    },
    lastRSS: {
      name: 'lastRSS',
      file: 'source/system/libs/lastrss.class.php',
      className: 'lastRSS',
      description: 'Простой и мощный PHP класс для парсинга RSS файлов',
      version: '0.9.2',
      purpose: 'Парсинг RSS/Atom лент с поддержкой кэширования',
      methods: [
        'get()', 'parse()', 'cacheResult()', 'getCached()', 'set_cache_dir()',
        'set_cache_time()', 'set_items_limit()', 'set_strip_html()', 'set_date_format()'
      ]
    },
    idnaConvert: {
      name: 'IDNA Convert',
      file: 'source/system/libs/idna_convert.class.php',
      className: 'idna_convert',
      description: 'Кодирование/декодирование Internationalized Domain Names (IDN)',
      version: '0.10.0',
      purpose: 'Конвертация международных доменных имен между Unicode и ASCII форматом (Punycode)',
      methods: [
        'encode()', 'decode()', 'get_version()', 'set_parameter()', 'encode_domain()', 'decode_domain()'
      ]
    },
    spyc: {
      name: 'SPYC',
      file: 'source/system/libs/spyc.class.php',
      className: 'spyc',
      description: 'YAML парсер для PHP',
      version: '0.6.3',
      purpose: 'Парсинг и генерация YAML',
      functions: [
        'yaml_load_file()', 'yaml_load()', 'yaml_emit()', 'yaml_emit_file()'
      ]
    }
  },
  thirdParty: {
    scssphp: {
      name: 'scssphp',
      path: 'source/system/libs/scssphp/',
      description: 'Компилятор SCSS/SASS для PHP',
      version: '1.x',
      purpose: 'Компиляция SCSS стилей в CSS на лету',
      classes: [
        'scss_compiler', 'Block', 'Compiler', 'Parser', 'Formatter', 'Cache', 'Logger'
      ]
    },
    geshi: {
      name: 'GeSHi',
      path: 'source/system/libs/geshi/',
      description: 'Подсветка синтаксиса кода для множества языков',
      purpose: 'Подсветка синтаксиса исходного кода в HTML',
      languages: [
        'php', 'css', 'html', 'javascript', 'mysql', 'sql'
      ]
    },
    phpmailer: {
      name: 'PHPMailer',
      path: 'source/system/libs/phpmailer/',
      description: 'Отправка email через SMTP, POP3',
      purpose: 'Отправка email писем с вложениями, HTML и авторизацией',
      classes: [
        'PHPMailer', 'SMTP', 'POP3'
      ]
    }
  }
};

export default libsData;
