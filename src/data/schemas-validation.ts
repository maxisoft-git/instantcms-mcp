import { z } from 'zod';

export const HookParamSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  modifiable: z.boolean().optional(),
});

export const HookSchema = z.object({
  name: z.string(),
  type: z.enum(['filter', 'action', 'filter|action']),
  category: z.string(),
  description: z.string(),
  parameters: z.array(HookParamSchema),
  return_type: z.string(),
  example: z.string(),
  since: z.string().optional(),
});

export const ComponentMethodSchema = z.object({
  name: z.string(),
  signature: z.string(),
  description: z.string(),
  parameters: z.array(z.object({
    name: z.string(),
    type: z.string(),
    description: z.string(),
    required: z.boolean().optional(),
    default: z.string().optional(),
  })),
  return_type: z.string(),
  example: z.string(),
  deprecated: z.boolean().optional(),
});

export const ComponentSchema = z.object({
  name: z.string(),
  class: z.string(),
  description: z.string(),
  access: z.string(),
  methods: z.array(ComponentMethodSchema),
});

export const FieldOptionSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  default: z.any().optional(),
  required: z.boolean().optional(),
  extended: z.boolean().optional(),
  visible_depend: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.array(z.string())))).optional(),
  hint: z.string().optional(),
  items: z.record(z.string(), z.string()).optional(),
});

export const FieldInfoSchema = z.object({
  name: z.string(),
  className: z.string(),
  filePath: z.string(),
  hasOptions: z.boolean(),
  isSystem: z.boolean(),
  options: z.array(FieldOptionSchema).optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  sqlTemplate: z.string().optional(),
  filterType: z.string().optional(),
  filterHint: z.string().optional(),
  varType: z.string().optional(),
  allowIndex: z.boolean().optional(),
  nativeTag: z.boolean().optional(),
  dynamicList: z.boolean().optional(),
  validationRules: z.array(z.string()).optional(),
  methods: z.object({
    parse: z.boolean().optional(),
    store: z.boolean().optional(),
    getInput: z.boolean().optional(),
    applyFilter: z.boolean().optional(),
    getStringValue: z.boolean().optional(),
    getFilterInput: z.boolean().optional(),
  }).optional(),
});

export const WidgetOptionSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
});

export const WidgetInfoSchema = z.object({
  name: z.string(),
  className: z.string(),
  controller: z.string().optional(),
  filePath: z.string(),
  hasOptionsForm: z.boolean(),
  optionsFormPath: z.string().optional(),
  description: z.string().optional(),
});

export const TraitMethodSchema = z.object({
  name: z.string(),
  visibility: z.enum(['public', 'protected', 'private']),
  params: z.array(z.string()),
  description: z.string().optional(),
});

export const TraitInfoSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  filePath: z.string(),
  methods: z.array(TraitMethodSchema),
  description: z.string().optional(),
});

export const DbFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  nullable: z.boolean(),
  default: z.string().optional(),
  comment: z.string().optional(),
  key: z.enum(['PRI', 'UNI', 'MUL']).optional(),
  extra: z.string().optional(),
});

export const DbIndexSchema = z.object({
  name: z.string(),
  fields: z.array(z.string()),
  type: z.string().optional(),
});

export const DbTableSchema = z.object({
  name: z.string(),
  comment: z.string().optional(),
  fields: z.array(DbFieldSchema),
  indexes: z.array(DbIndexSchema),
});

export const DatabaseSchemaSchema = z.object({
  tables: z.array(DbTableSchema),
  tableCount: z.number(),
  generatedAt: z.string(),
  sourceFile: z.string().optional(),
});

export const EventRecordSchema = z.object({
  id: z.number(),
  event: z.string(),
  listener: z.string(),
  ordering: z.number(),
  isEnabled: z.boolean(),
});

export const EventsMapSchema = z.object({
  events: z.array(EventRecordSchema),
  byController: z.record(z.string(), z.array(z.string())),
  byEvent: z.record(z.string(), EventRecordSchema),
  eventCount: z.number(),
  generatedAt: z.string(),
  sourceFile: z.string(),
});

export const ControllerActionSchema = z.object({
  name: z.string(),
  className: z.string(),
  filePath: z.string(),
  visibility: z.enum(['public', 'private', 'protected']),
  hasParams: z.boolean(),
  params: z.array(z.string()),
  traits: z.array(z.string()),
  description: z.string().optional(),
});

export const ControllerInfoSchema = z.object({
  name: z.string(),
  className: z.string(),
  type: z.enum(['frontend', 'backend']),
  extends: z.string(),
  filePath: z.string(),
  actions: z.array(ControllerActionSchema),
  hasBackendFolder: z.boolean(),
  hasModel: z.boolean(),
  modelFile: z.string().optional(),
});

export const ControllersMapSchema = z.object({
  controllers: z.array(ControllerInfoSchema),
  byName: z.record(z.string(), ControllerInfoSchema),
  controllerCount: z.number(),
  generatedAt: z.string(),
});

export const RouteRuleSchema = z.object({
  pattern: z.string(),
  action: z.string(),
  params: z.record(z.string(), z.any()).optional(),
});

export const ControllerRouteSchema = z.object({
  name: z.string(),
  functionName: z.string(),
  filePath: z.string(),
  routes: z.array(RouteRuleSchema),
});

export const RoutesMapSchema = z.object({
  controllers: z.array(ControllerRouteSchema),
  routeCount: z.number(),
  generatedAt: z.string(),
});

export const CoreClassSchema = z.object({
  name: z.string(),
  extends: z.string().optional(),
  description: z.string(),
  file: z.string(),
  methods: z.number(),
  properties: z.number(),
  constants: z.number(),
});

export function validateHook(data: unknown) {
  return HookSchema.safeParse(data);
}

export function validateComponent(data: unknown) {
  return ComponentSchema.safeParse(data);
}

export function validateField(data: unknown) {
  return FieldInfoSchema.safeParse(data);
}

export function validateWidget(data: unknown) {
  return WidgetInfoSchema.safeParse(data);
}

export function validateTrait(data: unknown) {
  return TraitInfoSchema.safeParse(data);
}

export function validateTable(data: unknown) {
  return DbTableSchema.safeParse(data);
}

export function validateEvent(data: unknown) {
  return EventRecordSchema.safeParse(data);
}

export function validateController(data: unknown) {
  return ControllerInfoSchema.safeParse(data);
}

export function validateRoute(data: unknown) {
  return RouteRuleSchema.safeParse(data);
}

export function validateDatabaseSchema(data: unknown) {
  return DatabaseSchemaSchema.safeParse(data);
}

export function validateEventsMap(data: unknown) {
  return EventsMapSchema.safeParse(data);
}

export function validateControllersMap(data: unknown) {
  return ControllersMapSchema.safeParse(data);
}

export function validateRoutesMap(data: unknown) {
  return RoutesMapSchema.safeParse(data);
}

export function validateCoreClass(data: unknown) {
  return CoreClassSchema.safeParse(data);
}
