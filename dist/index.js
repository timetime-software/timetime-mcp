#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAuthInfo, getCodeSample, getEndpointDocs, getErrorCodes, getMetaInfo, } from "./tools.js";
const server = new McpServer({
    name: "timetime-mcp",
    version: "1.0.0",
});
/**
 * Main function to start the MCP server
 *
 * Initializes the transport layer and connects the server to the MCP protocol.
 * Uses stdio for communication with client applications.
 */
(function main() {
    const transport = new StdioServerTransport();
    // 1. Discover available API methods
    server.tool("get-meta", "Returns a list of available endpoints and a brief description of each one to help the LLM learn the API structure.", {}, getMetaInfo);
    // 2. Authentication information
    server.tool("get-auth-info", `Returns details about the API authentication scheme, including token type, required header, and format.`, {}, getAuthInfo);
    // 3. Get documentation for a specific endpoint
    server.tool("get-endpoint-docs", "Returns detailed documentation for a specific endpoint, including description, parameters, and usage examples.", {
        endpoint: z
            .string()
            .describe("The endpoint to get documentation for, in the format '/path METHOD' (e.g. '/users GET')"),
    }, getEndpointDocs);
    // 4. Get code examples for an endpoint
    server.tool("get-code-sample", "Returns a code example to consume an API endpoint in the specified language.", {
        endpoint: z
            .string()
            .describe("The endpoint to get code examples for, in the format '/path METHOD' (e.g. '/users GET')"),
    }, getCodeSample);
    // 5. Get list of possible error codes
    server.tool("get-error-codes", "Returns a list of possible error codes and their description to help the LLM understand how to handle failures.", {}, getErrorCodes);
    server
        .connect(transport)
        .then(() => {
        console.info("TimeTime MCP Server started");
    })
        .catch((error) => {
        console.error("Error starting MCP server:", error);
        process.exit(1);
    });
})();
//# sourceMappingURL=index.js.map