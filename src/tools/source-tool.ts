import { widgetsMap, getWidget, getWidgetsByController, getSystemWidgets } from "../data/widgets-map.js";
import { traitsMap, getTrait, getTraitMethods, getTraitsByNamespace } from "../data/traits-map.js";
import { fieldsMap, getField, getFieldTypes, getSystemFields } from "../data/fields-map.js";
import { routesMap, getRoutesByController, getAllRoutes } from "../data/routes-map.js";

export function listWidgets(controller?: string): object {
  let widgets = widgetsMap.widgets;
  
  if (controller) {
    widgets = getWidgetsByController(controller);
  }
  
  return {
    total: widgets.length,
    widgets: widgets.map(w => ({
      name: w.name,
      className: w.className,
      controller: w.controller,
      hasOptionsForm: w.hasOptionsForm,
      description: w.description
    }))
  };
}

export function getWidgetInfo(name: string): object {
  const widget = getWidget(name);
  
  if (!widget) {
    return {
      error: `Widget "${name}" not found`,
      available: widgetsMap.widgets.map(w => w.name)
    };
  }
  
  return {
    name: widget.name,
    className: widget.className,
    controller: widget.controller,
    filePath: widget.filePath,
    hasOptionsForm: widget.hasOptionsForm,
    optionsFormPath: widget.optionsFormPath,
    description: widget.description
  };
}

export function listTraits(namespace?: string): object {
  let traits = traitsMap.traits;
  
  if (namespace) {
    traits = getTraitsByNamespace(namespace);
  }
  
  const byNamespace: Record<string, object[]> = {};
  for (const trait of traits) {
    if (!byNamespace[trait.namespace]) {
      byNamespace[trait.namespace] = [];
    }
    byNamespace[trait.namespace].push({
      name: trait.name,
      methodsCount: trait.methods.length,
      description: trait.description
    });
  }
  
  return {
    total: traits.length,
    methodCount: traits.reduce((sum, t) => sum + t.methods.length, 0),
    namespaces: Object.keys(byNamespace).length,
    byNamespace,
    traits: traits.map(t => ({
      name: t.name,
      namespace: t.namespace,
      methodsCount: t.methods.length,
      description: t.description
    }))
  };
}

export function getTraitInfo(name: string): object {
  const trait = getTrait(name);
  
  if (!trait) {
    return {
      error: `Trait "${name}" not found`,
      available: traitsMap.traits.map(t => t.name)
    };
  }
  
  return {
    name: trait.name,
    namespace: trait.namespace,
    filePath: trait.filePath,
    description: trait.description,
    methods: trait.methods.map(m => ({
      name: m.name,
      visibility: m.visibility,
      params: m.params,
      paramCount: m.params.length
    }))
  };
}

export function listFields(): object {
  return {
    total: fieldsMap.fieldCount,
    systemFieldsCount: fieldsMap.systemFields.length,
    fields: fieldsMap.fields.map(f => ({
      name: f.name,
      className: f.className,
      isSystem: f.isSystem,
      hasOptions: f.hasOptions,
      description: f.description
    }))
  };
}

export function getFieldInfo(name: string): object {
  const field = getField(name);
  
  if (!field) {
    return {
      error: `Field "${name}" not found`,
      available: fieldsMap.fields.map(f => f.name)
    };
  }
  
  return {
    name: field.name,
    className: field.className,
    filePath: field.filePath,
    isSystem: field.isSystem,
    hasOptions: field.hasOptions,
    options: field.options,
    description: field.description
  };
}

export function listRoutes(controller?: string): object {
  if (controller) {
    const routes = getRoutesByController(controller);
    if (!routes) {
      return {
        error: `Controller "${controller}" has no routes`,
        available: routesMap.controllers.map(c => c.name)
      };
    }
    return {
      total: routes.routes.length,
      controller: routes.name,
      functionName: routes.functionName,
      filePath: routes.filePath,
      routes: routes.routes
    };
  }
  
  return {
    total: routesMap.routeCount,
    controllersCount: routesMap.controllers.length,
    controllers: routesMap.controllers.map(c => ({
      name: c.name,
      functionName: c.functionName,
      routeCount: c.routes.length
    }))
  };
}
