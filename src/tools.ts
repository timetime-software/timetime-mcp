import { spec } from "./spec.js";

/**
 * Creates a properly formatted MCP response with text content
 */
function createMcpResponse(text: string, isError: boolean = false) {
  return {
    content: [
      {
        type: "text" as const,
        text,
      },
    ],
    isError,
  };
}

export function startHere() {
  return createMcpResponse(`
# Info

TimeTime is a scheduling service that allows you to add a booking engine to an application or website easily.

A booking engine is a system that allows users to book slots to perform a task automatically. The engine automatically calculates the availability for a certain event based on fully configurable rules.

Unlike other scheduling tools, TimeTime has the concept of resource built-in. A resource is anything that may be necessary for the booking. For example, for a tennis class, it is necessary, in addition to the teacher, a court, two rackets, and a bucket with 30 balls.

# Auth

## Api Keys

The first step to interact with the TimeTime API is to obtain an API access key. This access key must be attached to HTTP requests and allows identifying the author of the requests.
If you are a LLM model or an agent, just ask the user to provide the api key.

If the user ask how to generate an API KEY tell him that he can simply log in to TimeTime and access the "Developers" section.

https://app.timetime.in/dashboard/profile/developers

### Basic usage of the API key

By using the API key, you can use the API as if you were navigating through the web app.

Example request to fetch the API Key owner TimeTime profile:

---
GET https://api.timetime.in/v1/me
Authorization: Bearer tt1.ac507ef948a04fakeApiKey5304fa7b4abd936d8e2add1
---

## Important Notes

- A Calendar is a regular Calendar while a event-type is something that can be booked.
- We use ISO 8601 for all date-times. 
- We use ISO 3166-1 also for durations for example 1h30m would be PT1H30M
- repeatingAvailability can be confusing, here is an example: {"timeZone":"Europe/Madrid","weekly":{"FRIDAY":[],"MONDAY":[{"start":"09:00","end":"18:00"}],"SUNDAY":[],"TUESDAY":[{"start":"09:00","end":"18:00"}],"SATURDAY":[],"THURSDAY":[{"start":"09:00","end":"18:00"}],"WEDNESDAY":[{"start":"09:00","end":"18:00"}]}}
- We do use PUT to create and update resources, create your own UUIDv4 if required
`);
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
    .map(
      (endpoint) =>
        `## ${endpoint.method} ${endpoint.path}
    - Operation ID: ${endpoint.operationId}
    - Summary: ${endpoint.summary}
    - Description: ${endpoint.description}
    `
    )
    .join("\n")}`;

  return createMcpResponse(response);
}

export async function run(args: {
  method: string;
  apiKey: string;
  path: string;
  body: string;
}) {
  const raw = await fetch(`https://api.timetime.in/v1/${args.path}`, {
    method: args.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${args.apiKey}`,
    },
    body: args.body,
  });
  const json = await raw.json();
  return createMcpResponse(json);
}

/**
 * Returns authentication information for the API
 */
export function getAuthInfo(args = {}) {
  const securitySchemes = spec.components?.securitySchemes || {};
  const securityRequirements = spec.security || [];

  const response = `# API Authentication Information
  
  ## Security Schemes
  ${Object.entries(securitySchemes)
    .map(
      ([name, scheme]) =>
        `### ${name}
    - Type: ${scheme.type || "Not specified"}
    - ${scheme.type === "http" ? `Scheme: ${scheme.scheme}` : ""}
    - Description: ${scheme.description || "No description available"}
    `
    )
    .join("\n")}
  
  ## Security Requirements
  ${securityRequirements
    .map(
      (requirement, index) =>
        `### Requirement ${index + 1}
    ${Object.keys(requirement).join(", ")}
    `
    )
    .join("\n")}`;

  return createMcpResponse(response);
}

/**
 * Returns detailed documentation for a specific endpoint
 */
export function getEndpointDocs(args: { endpoint: string }) {
  const { endpoint } = args;

  // Find the endpoint in the spec
  const [path, method] = endpoint.split(" ");
  const normalizedMethod = method.toLowerCase();

  if (!spec.paths[path] || !spec.paths[path][normalizedMethod]) {
    return createMcpResponse(`Endpoint not found: ${endpoint}`, true);
  }

  const operation = spec.paths[path][normalizedMethod];

  // Build response
  const response = `# ${method.toUpperCase()} ${path}
  
  ## Overview
  - Operation ID: ${operation.operationId || "Not specified"}
  - Summary: ${operation.summary || "No summary available"}
  - Description: ${operation.description || "No description available"}
  
  ## Parameters
  ${
    (operation.parameters || [])
      .map(
        (param: any) =>
          `- ${param.name} (${param.in})${param.required ? " (Required)" : ""}
      - Description: ${param.description || "No description available"}
      - Schema: ${JSON.stringify(param.schema || {})}
    `
      )
      .join("\n") || "No parameters"
  }
  
  ## Request Body
  ${
    operation.requestBody
      ? `- Description: ${
          operation.requestBody.description || "No description available"
        }
    - Required: ${operation.requestBody.required ? "Yes" : "No"}
    - Content Types: ${Object.keys(operation.requestBody.content || {}).join(
      ", "
    )}`
      : "No request body"
  }
  
  ## Responses
  ${Object.entries(operation.responses || {})
    .map(
      ([code, response]) =>
        `- ${code}: ${
          (response as any).description || "No description available"
        }`
    )
    .join("\n")}`;

  return createMcpResponse(response);
}

/**
 * Returns code samples for consuming a specific endpoint
 */
export function getCodeSample(args: { endpoint: string }) {
  const { endpoint } = args;

  // Find the endpoint in the spec
  const [path, method] = endpoint.split(" ");
  const normalizedMethod = method.toLowerCase();

  if (!spec.paths[path] || !spec.paths[path][normalizedMethod]) {
    return createMcpResponse(`Endpoint not found: ${endpoint}`, true);
  }

  const operation = spec.paths[path][normalizedMethod];
  const baseUrl =
    spec.servers && spec.servers.length > 0
      ? spec.servers[0].url
      : "https://api.example.com";

  // Generate sample code in JavaScript/fetch
  const jsSample = generateJavaScriptSample(
    baseUrl,
    path,
    normalizedMethod,
    operation
  );

  // Generate sample code in Python/requests
  const pythonSample = generatePythonSample(
    baseUrl,
    path,
    normalizedMethod,
    operation
  );

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
function generateJavaScriptSample(
  baseUrl: string,
  path: string,
  method: string,
  operation: any
) {
  // Build request options
  const options: any = {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
    },
  };

  // Add content-type if there's a request body
  if (operation.requestBody) {
    options.headers["Content-Type"] = "application/json";

    // Add a placeholder request body
    if (
      operation.requestBody.content &&
      operation.requestBody.content["application/json"]
    ) {
      options.body =
        "// Request body based on schema\n  // " +
        JSON.stringify(
          operation.requestBody.content["application/json"].schema || {},
          null,
          2
        ).replace(/\n/g, "\n  // ");
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
          } else if (key === "headers") {
            return `${key}: ${JSON.stringify(value, null, 2)}`;
          } else {
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
function generatePythonSample(
  baseUrl: string,
  path: string,
  method: string,
  operation: any
) {
  // Build request options
  const headers: any = {
    Accept: "application/json",
  };

  // Add content-type if there's a request body
  let requestBody = "";
  if (operation.requestBody) {
    headers["Content-Type"] = "application/json";

    // Add a placeholder request body
    if (
      operation.requestBody.content &&
      operation.requestBody.content["application/json"]
    ) {
      requestBody =
        "# Request body based on schema\n# " +
        JSON.stringify(
          operation.requestBody.content["application/json"].schema || {},
          null,
          2
        ).replace(/\n/g, "\n# ");
    }
  }

  // Add authentication
  if (spec.security && spec.security.length > 0) {
    headers["Authorization"] = "# Your auth token";
  }

  // Build the sample
  return `import requests
  
  def call_${
    operation.operationId ? operation.operationId.toLowerCase() : "endpoint"
  }():
      url = "${baseUrl}${path}"
      headers = ${JSON.stringify(headers, null, 4).replace(/"/g, "'")}
      
      ${
        requestBody
          ? `payload = {
          ${requestBody}
      }`
          : ""
      }
      
      response = requests.${method.toLowerCase()}(
          url,
          headers=headers${requestBody ? ",\n        json=payload" : ""}
      )
      
      data = response.json()
      print(data)
      return data
  
  # Call the function
  call_${
    operation.operationId ? operation.operationId.toLowerCase() : "endpoint"
  }()`;
}

/**
 * Returns error codes and their descriptions
 */
export function getErrorCodes(args = {}) {
  // Extract all possible error responses from the spec
  const errorResponses: Record<string, string> = {};

  Object.values(spec.paths).forEach((pathObj) => {
    Object.values(pathObj).forEach((operation) => {
      if (operation.responses) {
        Object.entries(operation.responses).forEach(([code, response]) => {
          if (code.startsWith("4") || code.startsWith("5")) {
            const description =
              (response as any).description || "No description available";
            errorResponses[code] = description;
          }
        });
      }
    });
  });

  const response = `# API Error Codes
  
  ${Object.entries(errorResponses)
    .map(
      ([code, description]) => `## ${code}
  ${description}`
    )
    .join("\n\n")}`;

  return createMcpResponse(response);
}
