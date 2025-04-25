import { prompt_start } from "./prompts.js";
import { spec } from "./spec.js";
/**
 * Creates a properly formatted MCP response with text content
 */
function createMcpResponse(text, isError = false) {
    console.log(text);
    return {
        content: [
            {
                type: "text",
                text,
            },
        ],
        isError,
    };
}
export function startHere() {
    return createMcpResponse(prompt_start);
}
/**
 * Returns a list of available endpoints and their descriptions
 */
export function getMetaInfo(args = {}) {
    const paths = Object.keys(spec.paths);
    const endpointsInfo = paths
        .map((path) => {
        const methods = Object.keys(spec.paths[path]);
        return methods.map((method) => {
            const operation = spec.paths[path][method];
            return {
                path,
                method: method.toUpperCase(),
                operationId: operation.operationId || "Unknown",
                summary: operation.summary || "No summary available",
                description: operation.description || "No description available",
            };
        });
    })
        .flat();
    const response = `# Available API Endpoints
  
  ${endpointsInfo
        .map((endpoint) => `## ${endpoint.method} ${endpoint.path}
    - Operation ID: ${endpoint.operationId}
    - Summary: ${endpoint.summary}
    - Description: ${endpoint.description}
    `)
        .join("\n")}`;
    return createMcpResponse(response);
}
export async function run(args) {
    try {
        // Normalize path to ensure it starts with '/' but doesn't duplicate
        const normalizedPath = args.path.startsWith('/') ? args.path : `/${args.path}`;
        const url = `https://api.timetime.in${normalizedPath}`;
        console.log(`Making ${args.method} request to: ${url}`);
        // Common headers
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${args.apiKey}` // Removed the colon after Bearer
        };
        if (["GET", "DELETE"].includes(args.method.toUpperCase())) {
            const raw = await fetch(url, {
                method: args.method,
                headers
            });
            // Check for non-JSON responses
            const contentType = raw.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const json = await raw.json();
                return createMcpResponse(JSON.stringify(json, null, 2));
            }
            else {
                const text = await raw.text();
                return createMcpResponse(`Status: ${raw.status} ${raw.statusText}\n\nResponse:\n${text || '(empty response)'}`);
            }
        }
        const raw = await fetch(url, {
            method: args.method,
            headers,
            body: _normalizeBody(args.body)
        });
        // Check for non-JSON responses
        const contentType = raw.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const json = await raw.json();
            return createMcpResponse(JSON.stringify(json, null, 2));
        }
        else {
            const text = await raw.text();
            return createMcpResponse(`Status: ${raw.status} ${raw.statusText}\n\nResponse:\n${text || '(empty response)'}`);
        }
    }
    catch (err) {
        console.error('Error in API call:', err);
        return createMcpResponse(`Error executing API call: ${String(err)}`, true);
    }
}
/**
 * Returns authentication information for the API
 */
export function getAuthInfo(args = {}) {
    var _a;
    const securitySchemes = ((_a = spec.components) === null || _a === void 0 ? void 0 : _a.securitySchemes) || {};
    const securityRequirements = spec.security || [];
    const response = `# API Authentication Information
  
  ## Security Schemes
  ${Object.entries(securitySchemes)
        .map(([name, scheme]) => `### ${name}
    - Type: ${scheme.type || "Not specified"}
    - ${scheme.type === "http" ? `Scheme: ${scheme.scheme}` : ""}
    - Description: ${scheme.description || "No description available"}
    `)
        .join("\n")}
  
  ## Security Requirements
  ${securityRequirements
        .map((requirement, index) => `### Requirement ${index + 1}
    ${Object.keys(requirement).join(", ")}
    `)
        .join("\n")}`;
    return createMcpResponse(response);
}
/**
 * Returns detailed documentation for a specific endpoint
 */
export function getEndpointDocs(args) {
    const { endpoint } = args;
    // Find the endpoint in the spec
    const [path, method] = endpoint.split(" ");
    if (!path || !method) {
        return createMcpResponse(`Invalid endpoint format. Use '/path METHOD' (e.g. '/users GET')`, true);
    }
    const normalizedMethod = method.toLowerCase();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`; // Ensure path starts with /
    if (!spec.paths[normalizedPath] || !spec.paths[normalizedPath][normalizedMethod]) {
        return createMcpResponse(`Endpoint not found: ${method.toUpperCase()} ${normalizedPath}`, true);
    }
    const operation = spec.paths[normalizedPath][normalizedMethod];
    // Determine authentication requirement
    let authRequirement = "Required"; // Default to required
    if (operation.security) {
        if (Array.isArray(operation.security) && operation.security.length === 0) {
            authRequirement = "Not Required";
        }
        // If security exists but is not empty, it implies specific requirements exist, hence 'Required'
    }
    else {
        // If operation.security is not defined, check global security
        if (!spec.security || (Array.isArray(spec.security) && spec.security.length === 0)) {
            // Only if no operation security AND no global security is defined
            // This case might be rare, depending on the API default policy
            // Assuming global security usually applies if not overridden
            // Let's stick to 'Required' unless explicitly overridden by security: []
            // To be more precise, we could make this 'Depends on Global' or check global details
            // For simplicity for the LLM, 'Required' unless 'security: []' is the clearest
            // authRequirement = "Not Required (No Global Security)"; 
        }
    }
    // Build response
    const response = `# ${method.toUpperCase()} ${normalizedPath}
  
  ## Overview
  - Operation ID: ${operation.operationId || "Not specified"}
  - Summary: ${operation.summary || "No summary available"}
  - Description: ${operation.description || "No description available"}
  - Authentication: ${authRequirement}
  
  ## Parameters
  ${(operation.parameters || [])
        .map((param) => `- ${param.name} (${param.in})${param.required ? " (Required)" : ""}
      - Description: ${param.description || "No description available"}
      - Schema: ${JSON.stringify(param.schema || {})}
    `)
        .join("\n") || "No parameters"}
  
  ## Request Body
  ${operation.requestBody
        ? `- Description: ${operation.requestBody.description || "No description available"}
    - Required: ${operation.requestBody.required ? "Yes" : "No"}
    - Content Types: ${Object.keys(operation.requestBody.content || {}).join(", ")}`
        : "No request body"}
  
  ## Responses
  ${Object.entries(operation.responses || {}) // Use operation.responses
        .map(([code, resp]) => // Renamed variable to avoid conflict
     `- ${code}: ${resp.description || "No description available"}`)
        .join("\n") || "No responses defined"}
`;
    return createMcpResponse(response);
}
/**
 * Returns code samples for consuming a specific endpoint
 */
export function getCodeSample(args) {
    const { endpoint } = args;
    // Find the endpoint in the spec
    const [path, method] = endpoint.split(" ");
    const normalizedMethod = method.toLowerCase();
    if (!spec.paths[path] || !spec.paths[path][normalizedMethod]) {
        return createMcpResponse(`Endpoint not found: ${endpoint}`, true);
    }
    const operation = spec.paths[path][normalizedMethod];
    const baseUrl = spec.servers && spec.servers.length > 0
        ? spec.servers[0].url
        : "https://api.example.com";
    // Generate sample code in JavaScript/fetch
    const jsSample = generateJavaScriptSample(baseUrl, path, normalizedMethod, operation);
    // Generate sample code in Python/requests
    const pythonSample = generatePythonSample(baseUrl, path, normalizedMethod, operation);
    const response = `# Code Samples for ${method.toUpperCase()} ${path}
  
  ## JavaScript (fetch)
  \`\`\`javascript
  ${jsSample}
  \`\`\`
  
  ## Python (requests)
  \`\`\`python
  ${pythonSample}
  \`\`\``;
    return createMcpResponse(response);
}
/**
 * Generates a JavaScript code sample for the endpoint
 */
function generateJavaScriptSample(baseUrl, path, method, operation) {
    // Build request options
    const options = {
        method: method.toUpperCase(),
        headers: {
            Accept: "application/json",
        },
    };
    // Add content-type if there's a request body
    if (operation.requestBody) {
        options.headers["Content-Type"] = "application/json";
        // Add a placeholder request body
        if (operation.requestBody.content &&
            operation.requestBody.content["application/json"]) {
            options.body =
                "// Request body based on schema\n  // " +
                    JSON.stringify(operation.requestBody.content["application/json"].schema || {}, null, 2).replace(/\n/g, "\n  // ");
        }
    }
    // Add authentication
    if (spec.security && spec.security.length > 0) {
        options.headers["Authorization"] = "/* Your auth token */";
    }
    // Build the sample
    return `async function call${operation.operationId || "Endpoint"}() {
    const response = await fetch('${baseUrl}${path}', {
      ${Object.entries(options)
        .map(([key, value]) => {
        if (key === "body") {
            return `${key}: JSON.stringify({\n  ${value}\n  })`;
        }
        else if (key === "headers") {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
        }
        else {
            return `${key}: ${JSON.stringify(value)}`;
        }
    })
        .join(",\n    ")}
    });
    
    const data = await response.json();
    console.log(data);
    return data;
  }
  
  // Call the function
  call${operation.operationId || "Endpoint"}().catch(console.error);`;
}
/**
 * Generates a Python code sample for the endpoint
 */
function generatePythonSample(baseUrl, path, method, operation) {
    // Build request options
    const headers = {
        Accept: "application/json",
    };
    // Add content-type if there's a request body
    let requestBody = "";
    if (operation.requestBody) {
        headers["Content-Type"] = "application/json";
        // Add a placeholder request body
        if (operation.requestBody.content &&
            operation.requestBody.content["application/json"]) {
            requestBody =
                "# Request body based on schema\n# " +
                    JSON.stringify(operation.requestBody.content["application/json"].schema || {}, null, 2).replace(/\n/g, "\n# ");
        }
    }
    // Add authentication
    if (spec.security && spec.security.length > 0) {
        headers["Authorization"] = "# Your auth token";
    }
    // Build the sample
    return `import requests
  
  def call_${operation.operationId ? operation.operationId.toLowerCase() : "endpoint"}():
      url = "${baseUrl}${path}"
      headers = ${JSON.stringify(headers, null, 4).replace(/"/g, "'")}
      
      ${requestBody
        ? `payload = {
          ${requestBody}
      }`
        : ""}
      
      response = requests.${method.toLowerCase()}(
          url,
          headers=headers${requestBody ? ",\n        json=payload" : ""}
      )
      
      data = response.json()
      print(data)
      return data
  
  # Call the function
  call_${operation.operationId ? operation.operationId.toLowerCase() : "endpoint"}()`;
}
/**
 * Returns error codes and their descriptions
 */
export function getErrorCodes(args = {}) {
    // Extract all possible error responses from the spec
    const errorResponses = {};
    Object.values(spec.paths).forEach((pathObj) => {
        Object.values(pathObj).forEach((operation) => {
            if (operation.responses) {
                Object.entries(operation.responses).forEach(([code, response]) => {
                    if (code.startsWith("4") || code.startsWith("5")) {
                        const description = response.description || "No description available";
                        errorResponses[code] = description;
                    }
                });
            }
        });
    });
    const response = `# API Error Codes
  
  ${Object.entries(errorResponses)
        .map(([code, description]) => `## ${code}
  ${description}`)
        .join("\n\n")}`;
    return createMcpResponse(response);
}
/**
 * Returns the definition of a specific schema
 */
export function getSchemaDefinition(args) {
    var _a;
    const { schemaName } = args;
    // Get the schema from the spec
    const schemas = ((_a = spec.components) === null || _a === void 0 ? void 0 : _a.schemas) || {};
    if (!schemas[schemaName]) {
        return createMcpResponse(`Schema not found: ${schemaName}`, true);
    }
    const schema = schemas[schemaName];
    // Format properties for better readability
    let propertiesDescription = '';
    if (schema.properties) {
        propertiesDescription = Object.entries(schema.properties)
            .map(([propName, propSchema]) => {
            const required = schema.required && schema.required.includes(propName) ? '(Required)' : '';
            const propDetails = propSchema;
            // Handle references to other schemas
            let typeInfo = propDetails.type || 'Not specified';
            if (propDetails.$ref) {
                const refName = propDetails.$ref.split('/').pop();
                typeInfo = `Reference to [${refName}]`;
            }
            else if (propDetails.items && propDetails.items.$ref) {
                const refName = propDetails.items.$ref.split('/').pop();
                typeInfo = `Array of [${refName}]`;
            }
            return `- **${propName}** ${required}: ${propDetails.description || 'No description'}
    - Type: ${typeInfo}
    ${propDetails.format ? `- Format: ${propDetails.format}` : ''}
    ${propDetails.enum ? `- Enum values: ${JSON.stringify(propDetails.enum)}` : ''}
    ${propDetails.example ? `- Example: ${JSON.stringify(propDetails.example)}` : ''}`;
        })
            .join('\n');
    }
    // Add example if available
    const exampleSection = schema.example
        ? `\n## Example\n\`\`\`json\n${JSON.stringify(schema.example, null, 2)}\n\`\`\``
        : '';
    const response = `# Schema: ${schemaName}
  
  ## Description
  ${schema.description || 'No description available'}
  
  ## Type
  ${schema.type || 'Not specified'}
  ${schema.format ? `\n## Format\n${schema.format}` : ''}
  
  ## Properties
  ${propertiesDescription || 'No properties defined'}
  ${exampleSection}
  `;
    return createMcpResponse(response);
}
/**
 * Normalizes the body to a valid object that can be passed to fetch.
 * Body can be a JSON string or a valid object.
 */
function _normalizeBody(body) {
    if (typeof body === "string") {
        return body;
    }
    return JSON.stringify(body);
}
//# sourceMappingURL=tools.js.map