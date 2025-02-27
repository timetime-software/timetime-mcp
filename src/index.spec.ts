import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { run } from "./tools.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["./dist/index.js"],
  });

  const client = new Client(
    {
      name: "example-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );

  await client.connect(transport);
}

// main();


run({
  "path": "/v1/bookings",
  "method": "POST",
  "body": "{\"eventTypeId\":\"1e254f5e-57c2-44e8-bf04-3491088eae91\",\"startTime\":\"2023-12-18T10:00:00.000Z\",\"endTime\":\"2023-12-18T11:00:00.000Z\",\"timezone\":\"Europe/Madrid\",\"name\":\"Juan Pérez\",\"email\":\"juan.perez@example.com\",\"questions\":{\"50635a2e-6293-4e0d-a170-7aa2311653dc\":\"Juan Pérez\"}}",
  "apiKey": "tt1.188bff21bb334ef18d0d08de57ec17203a415aeeb73e49b896870728426c2cbc"
});
