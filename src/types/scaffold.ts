/**
 * Unified error response structure for MCP tools
 */
export interface ToolError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Standard success response wrapper
 */
export interface ToolSuccess<T = unknown> {
  success: true;
  data: T;
}

/**
 * Standard error response wrapper
 */
export interface ToolErrorResponse {
  success: false;
  error: ToolError;
}

/**
 * Union type for tool responses
 */
export type ToolResponse<T = unknown> = ToolSuccess<T> | ToolErrorResponse;

/**
 * Base interface for all scaffold tools input
 */
export interface ScaffoldInput {
  addon_name: string;
}

/**
 * File template with path and generated code
 */
export interface FileTemplate {
  path: string;
  code: string;
}

/**
 * Result returned by most scaffold tools
 */
export interface ScaffoldResult {
  addon_name: string;
  files: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Creates a standardized error response
 */
export function createError(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ToolErrorResponse {
  return {
    success: false,
    error: { code, message, details },
  };
}

/**
 * Creates a standardized success response
 */
export function createSuccess<T>(data: T): ToolSuccess<T> {
  return {
    success: true,
    data,
  };
}

/**
 * Validates addon name format
 */
export function validateAddonName(name: string): { valid: boolean; error?: string } {
  if (!name) {
    return { valid: false, error: 'Addon name is required' };
  }

  if (!/^[a-z][a-z0-9_]*$/.test(name)) {
    return {
      valid: false,
      error:
        'Addon name must start with lowercase letter and contain only lowercase letters, numbers, and underscores',
    };
  }

  if (name.length > 50) {
    return { valid: false, error: 'Addon name must be 50 characters or less' };
  }

  return { valid: true };
}

/**
 * Converts addon name to various case formats
 */
export function normalizeAddonName(name: string): {
  lowercase: string;
  UpperCamelCase: string;
  lowercaseSnake: string;
} {
  const lowercase = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const UpperCamelCase = lowercase
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const lowercaseSnake = lowercase.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

  return { lowercase, UpperCamelCase, lowercaseSnake };
}

/**
 * Sanitizes a string for use in file paths
 */
export function sanitizePath(str: string): string {
  return str.replace(/[^a-zA-Z0-9_\/-]/g, '_').replace(/__+/g, '_');
}

/**
 * Generates a timestamp for use in version strings
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}
