#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();

server.connect(transport).then(() => {
  // Server is running via stdio
}).catch((err) => {
  console.error("Failed to start InstantCMS MCP server:", err);
  process.exit(1);
});
