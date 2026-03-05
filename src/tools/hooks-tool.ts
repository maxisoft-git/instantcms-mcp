import { hooks, hookCategories, type Hook } from "../data/hooks.js";

export function listHooks(category?: string, type?: string): object {
  let filtered = hooks;

  if (category) {
    filtered = filtered.filter(h => h.category === category);
  }
  if (type) {
    filtered = filtered.filter(h => h.type === type || h.type.includes(type));
  }

  return {
    total: filtered.length,
    categories: hookCategories,
    hooks: filtered.map(h => ({
      name: h.name,
      type: h.type,
      category: h.category,
      description: h.description,
      parameters_count: h.parameters.length,
      return_type: h.return_type
    }))
  };
}

export function getHookDetails(hookName: string): object | null {
  // Точное совпадение
  let hook = hooks.find(h => h.name === hookName);

  // Если нет — поиск по частичному совпадению
  if (!hook) {
    const lower = hookName.toLowerCase();
    hook = hooks.find(h => h.name.includes(lower));
  }

  if (!hook) {
    // Поиск похожих
    const lower = hookName.toLowerCase();
    const similar = hooks
      .filter(h => h.name.includes(lower.split('_')[0]) || h.category === lower)
      .slice(0, 5)
      .map(h => h.name);

    return {
      error: `Хук "${hookName}" не найден`,
      similar_hooks: similar,
      tip: "Используйте list_hooks для просмотра всех доступных хуков"
    };
  }

  const className = buildClassName(hook);

  return {
    name: hook.name,
    type: hook.type,
    category: hook.category,
    description: hook.description,
    parameters: hook.parameters,
    return_type: hook.return_type,
    since: hook.since,
    implementation: {
      file_path: `hooks/${hook.name}.php`,
      class_name: className,
      usage_note: hook.type === "filter"
        ? "ОБЯЗАТЕЛЬНО вернуть модифицированные данные через return"
        : "Можно не возвращать данные, но рекомендуется return $data для цепочки"
    },
    example: hook.example,
    manifest_xml: `<hook controller="{your_addon_name}" name="${hook.name}" />`
  };
}

export function searchHooks(query: string): object {
  const lower = query.toLowerCase();

  const results = hooks.filter(h =>
    h.name.includes(lower) ||
    h.description.toLowerCase().includes(lower) ||
    h.category.includes(lower) ||
    h.parameters.some(p => p.description.toLowerCase().includes(lower))
  );

  return {
    query,
    total: results.length,
    results: results.map(h => ({
      name: h.name,
      type: h.type,
      category: h.category,
      description: h.description
    }))
  };
}

function buildClassName(hook: Hook): string {
  // on{AddonName}{HookNameCamelCase}
  const hookCamel = hook.name
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return `on{AddonName}${hookCamel}`;
}
