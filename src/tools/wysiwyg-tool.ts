import { wysiwygMap, type WysiwygEditor } from '../data/wysiwyg-map.js';

export function listWysiwygEditors(): object {
  return {
    total: wysiwygMap.editorCount,
    editors: wysiwygMap.editors.map(e => ({
      name: e.name,
      className: e.className,
      description: e.description,
      features: e.features,
      plugins_count: e.plugins?.length ?? 0,
    })),
  };
}

export function getWysiwygEditor(editorName: string): object {
  const editor = wysiwygMap.byName[editorName.toLowerCase()];

  if (!editor) {
    const similar = Object.keys(wysiwygMap.byName).filter(name =>
      name.includes(editorName.toLowerCase())
    );
    return {
      error: `Редактор "${editorName}" не найден`,
      available: Object.keys(wysiwygMap.byName),
      similar: similar.length > 0 ? similar : undefined,
    };
  }

  return {
    name: editor.name,
    className: editor.className,
    filePath: editor.filePath,
    optionsFormPath: editor.optionsFormPath,
    description: editor.description,
    features: editor.features,
    options: editor.options,
    options_descriptions: editor.optionsDescriptions,
    plugins: editor.plugins,
    buttons: editor.buttons,
    usage: {
      instantiation: `cmsWysiwyg::getEditor('${editor.name}', $config);`,
      display: `$editor = cmsWysiwyg::getEditor('${editor.name}');\n$editor->displayEditor('content', $content);`,
      options_form: editor.optionsFormPath,
    },
    example_config: buildExampleConfig(editor),
  };
}

export function getWysiwygOptions(editorName: string): object {
  const editor = wysiwygMap.byName[editorName.toLowerCase()];

  if (!editor) {
    return { error: `Редактор "${editorName}" не найден` };
  }

  return {
    editor: editor.name,
    options: Object.entries(editor.optionsDescriptions).map(([key, opt]) => ({
      name: key,
      type: opt.type,
      description: opt.description,
      default: opt.default,
      current: editor.options[key],
    })),
  };
}

export function getWysiwygPlugins(editorName: string): object {
  const editor = wysiwygMap.byName[editorName.toLowerCase()];

  if (!editor) {
    return { error: `Редактор "${editorName}" не найден` };
  }

  if (!editor.plugins) {
    return {
      editor: editor.name,
      plugins: [],
      note: `${editor.name} не поддерживает плагины`,
    };
  }

  return {
    editor: editor.name,
    plugins: editor.plugins,
  };
}

export function searchWysiwygEditors(query: string): object {
  const lower = query.toLowerCase();

  const results = wysiwygMap.editors.filter(
    e =>
      e.name.includes(lower) ||
      e.description.toLowerCase().includes(lower) ||
      e.features.some(f => f.toLowerCase().includes(lower)) ||
      e.plugins?.some(p => p.name.includes(lower) || p.description.toLowerCase().includes(lower))
  );

  return {
    query,
    total: results.length,
    results: results.map(e => ({
      name: e.name,
      description: e.description,
      matching_features: e.features.filter(f => f.toLowerCase().includes(lower)),
      matching_plugins:
        e.plugins?.filter(
          p => p.name.includes(lower) || p.description.toLowerCase().includes(lower)
        ) ?? [],
    })),
  };
}

export function getWysiwygButtons(editorName: string): object {
  const editor = wysiwygMap.byName[editorName.toLowerCase()];

  if (!editor) {
    return { error: `Редактор "${editorName}" не найден` };
  }

  if (editorName === 'markitup' && editor.buttons) {
    return {
      editor: editor.name,
      type: 'markitup_buttons',
      buttons: editor.buttons.map((btn, index) => ({
        id: index,
        ...(typeof btn === 'string' ? { name: btn } : btn),
      })),
    };
  }

  if (editor.buttons && editor.buttons.every(b => typeof b === 'string')) {
    return {
      editor: editor.name,
      type: 'toolbar_buttons',
      buttons: editor.buttons,
    };
  }

  return {
    editor: editor.name,
    buttons: editor.buttons ?? [],
    note: `${editor.name} не имеет списка кнопок`,
  };
}

function buildExampleConfig(editor: WysiwygEditor): object {
  const example: Record<string, unknown> = {};

  Object.entries(editor.optionsDescriptions).forEach(([key, opt]) => {
    if (opt.default !== undefined) {
      example[key] = opt.default;
    }
  });

  return example;
}
