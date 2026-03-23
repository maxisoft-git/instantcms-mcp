interface ApiEndpoint {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description?: string;
  auth_required?: boolean;
  params?: ApiParam[];
}

interface ApiParam {
  name: string;
  type: 'path' | 'query' | 'body';
  required?: boolean;
  description?: string;
}

interface ScaffoldApiOptions {
  addon_name: string;
  version?: string;
  endpoints: ApiEndpoint[];
  options?: {
    use_swagger?: boolean;
    use_rate_limit?: boolean;
    base_path?: string;
  };
}

export function scaffoldApi(opts: ScaffoldApiOptions): object {
  const name = opts.addon_name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const Name = name.split('_').map(capitalize).join('');
  const version = opts.version || 'v1';
  const basePath = opts.options?.base_path || `/api/${version}/${name}`;

  const files: Record<string, string> = {};

  const ctrl = `package/system/controllers/${name}`;

  files[`${ctrl}/api/${version}/index.php`] = generateApiController(
    name,
    Name,
    version,
    opts.endpoints,
    basePath
  );

  files[`${ctrl}/manifest.xml`] = generateManifest(name, Name, version);

  if (opts.options?.use_swagger) {
    files[`package/docs/openapi.json`] = generateOpenApi(name, version, opts.endpoints, basePath);
  }

  return {
    addon_name: name,
    api_version: version,
    base_path: basePath,
    endpoints_count: opts.endpoints.length,
    files,
    endpoints: opts.endpoints.map(e => ({
      method: e.method,
      path: `${basePath}${e.path}`,
      name: e.name,
      auth_required: e.auth_required ?? true,
    })),
    structure_notes: [
      `API контроллер: ${ctrl}/api/${version}/index.php`,
      `Маршрут: ${basePath}/*`,
      `Аутентификация: через API ключ или OAuth токен`,
    ],
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateApiController(
  name: string,
  Name: string,
  version: string,
  endpoints: ApiEndpoint[],
  basePath: string
): string {
  let code = `<?php
/**
 * API Controller ${name} v${version}
 * Base path: ${basePath}
 */

class api${Name}${capitalize(version)} extends cmsBackend {

    protected $token;
    protected $user_id;

    public function __construct(cmsRequest $request) {
        parent::__construct($request);
        $this->token = $this->request->get('token', '');
        $this->checkAuth();
    }

    protected function checkAuth() {
        if (!$this->token) {
            $this->errorResponse('API token required', 401);
            return false;
        }

        $user = $this->model->getUserByToken($this->token);
        if (!$user) {
            $this->errorResponse('Invalid API token', 401);
            return false;
        }

        $this->user_id = $user['id'];
        return true;
    }

    protected function errorResponse($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => true, 'message' => $message]);
        exit;
    }

    protected function successResponse($data, $code = 200) {
        http_response_code($code);
        echo json_encode(['success' => true, 'data' => $data]);
        exit;
    }

`;

  for (const endpoint of endpoints) {
    code += generateEndpoint(name, Name, endpoint);
  }

  code += `}
`;
  return code;
}

function generateEndpoint(name: string, _Name: string, endpoint: ApiEndpoint): string {
  const methodUpper = endpoint.method.toUpperCase();

  let paramsValidation = '';
  let pathParams = '';

  if (endpoint.params) {
    for (const param of endpoint.params) {
      if (param.type === 'path') {
        pathParams += `, $${param.name}`;
        paramsValidation += `
        $${param.name} = $this->request->get('${param.name}', ${param.required ? "''" : 'null'});
        if (${param.required ? `empty($${param.name})` : 'false'}) {
            $this->errorResponse('Missing required parameter: ${param.name}', 400);
        }`;
      } else if (param.type === 'query') {
        paramsValidation += `
        $${param.name} = $this->request->get('${param.name}', null);`;
      } else if (param.type === 'body') {
        paramsValidation += `
        $${param.name} = $this->request->get('${param.name}', null);`;
      }
    }
  }

  const authCheck =
    endpoint.auth_required !== false
      ? `
        if (!$this->user_id) {
            $this->errorResponse('Unauthorized', 401);
        }`
      : '';

  const endpointDoc = endpoint.description
    ? `/**
     * ${endpoint.description}
     */
    `
    : '';

  let code = `${endpointDoc}    public function run(${pathParams}) {${authCheck}${paramsValidation}
`;

  switch (methodUpper) {
    case 'GET':
      code += generateGetHandler(name, endpoint);
      break;
    case 'POST':
      code += generatePostHandler(name, endpoint);
      break;
    case 'PUT':
    case 'PATCH':
      code += generatePutPatchHandler(name, endpoint);
      break;
    case 'DELETE':
      code += generateDeleteHandler(name, endpoint);
      break;
  }

  code += `    }

`;
  return code;
}

function generateGetHandler(name: string, endpoint: ApiEndpoint): string {
  const isList = endpoint.path.includes('/list') || endpoint.name.includes('list');
  const isSingle = endpoint.name.includes('_by_') || endpoint.path.match(/\/[a-z_]+\/\{.*\}/);

  if (isList) {
    return `
        $page = $this->request->get('page', 1);
        $perpage = $this->request->get('perpage', 20);

        $items = $this->model->get${capitalize(name)}List($this->user_id, [
            'page' => $page,
            'perpage' => $perpage,
        ]);

        $this->successResponse($items);
`;
  } else if (isSingle) {
    const idVar = endpoint.params?.find(p => p.type === 'path')?.name || 'id';
    return `
        $${idVar} = (int) $${idVar};

        $item = $this->model->get${capitalize(name)}ById($${idVar}, $this->user_id);

        if (!$item) {
            $this->errorResponse('Item not found', 404);
        }

        $this->successResponse($item);
`;
  } else {
    return `
        $this->successResponse(['status' => 'ok']);
`;
  }
}

function generatePostHandler(name: string, _endpoint: ApiEndpoint): string {
  return `
        $data = $this->request->getAll();

        $id = $this->model->add${capitalize(name)}($data, $this->user_id);

        if (!$id) {
            $this->errorResponse('Failed to create item', 500);
        }

        $this->successResponse(['id' => $id], 201);
`;
}

function generatePutPatchHandler(name: string, endpoint: ApiEndpoint): string {
  const idVar = endpoint.params?.find(p => p.type === 'path')?.name || 'id';
  return `
        $${idVar} = (int) $${idVar};
        $data = $this->request->getAll();

        $item = $this->model->get${capitalize(name)}ById($${idVar}, $this->user_id);

        if (!$item) {
            $this->errorResponse('Item not found', 404);
        }

        $updated = $this->model->update${capitalize(name)}($${idVar}, $data);

        if (!$updated) {
            $this->errorResponse('Failed to update item', 500);
        }

        $this->successResponse(['id' => $${idVar}]);
`;
}

function generateDeleteHandler(name: string, endpoint: ApiEndpoint): string {
  const idVar = endpoint.params?.find(p => p.type === 'path')?.name || 'id';
  return `
        $${idVar} = (int) $${idVar};

        $deleted = $this->model->delete${capitalize(name)}($${idVar}, $this->user_id);

        if (!$deleted) {
            $this->errorResponse('Failed to delete item', 500);
        }

        $this->successResponse(['deleted' => true]);
`;
}

function generateManifest(name: string, Name: string, version: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<addon>
    <name>${name}_api</name>
    <title>${Name} API ${version}</title>
    <version>1.0.0</version>
    <files>
        <file>controllers/${name}/api/${version}/index.php</file>
    </files>
    <routes>
        <route path="/api/${version}/${name}/">
            <handler>${name}/api/${version}/index.php</handler>
        </route>
    </routes>
</addon>`;
}

function generateOpenApi(
  name: string,
  version: string,
  endpoints: ApiEndpoint[],
  basePath: string
): string {
  const paths: Record<string, unknown> = {};

  for (const endpoint of endpoints) {
    const path = `${basePath}${endpoint.path}`;
    paths[path] = {
      [endpoint.method.toLowerCase()]: {
        summary: endpoint.description || endpoint.name,
        tags: [name],
        security: endpoint.auth_required !== false ? [{ ApiToken: [] }] : [],
        parameters: endpoint.params
          ?.filter(p => p.type === 'query')
          .map(p => ({
            name: p.name,
            in: 'query',
            required: p.required,
            description: p.description,
          })),
        responses: {
          '200': { description: 'Success' },
          '400': { description: 'Bad Request' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not Found' },
        },
      },
    };
  }

  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: `${name} API ${version}`,
      version: version,
    },
    paths,
    components: {
      securitySchemes: {
        ApiToken: {
          type: 'apiKey',
          in: 'query',
          name: 'token',
        },
      },
    },
  };

  return JSON.stringify(openApiSpec, null, 2);
}
