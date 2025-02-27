import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
async function main() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["./dist/index.js"],
    });
    const client = new Client({
        name: "example-client",
        version: "1.0.0",
    }, {
        capabilities: {
            prompts: {},
            resources: {},
            tools: {},
        },
    });
    await client.connect(transport);
}
main();
//# sourceMappingURL=index.spec.js.map