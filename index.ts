import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { placeOrder, getPositions, getStockPrice} from "./trade";  

const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

server.tool(
  "buy-stock","Buys the stock on zerodha exchange for the user. It executes a real order.",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    await placeOrder(stock, quantity, "BUY");
    return {
      content: [{ type: "text", text: "Stock Bought" }]
    };
  }
);

server.tool(
  "get-stock-price","Gets teh current stock price from the zerodha exchange ",
  { stock: z.string() },
  async ({ stock }) => {
    await getStockPrice(stock);
    return {
      content: [{ type: "text", text: "Stock Price" }]
    };
  }
);

server.tool(
  "show-portfolio","Shows my complete portfolio on Zerodha",
    {},
  async () => {
    return {
      content: [{ type: "text", text: await getPositions()}]
    };
  }
);

server.tool(
  "sell-stock","Sells the stock on zerodha exchange for the user. It executes a real order.",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    await placeOrder(stock, quantity, "SELL");
    return {
      content: [{ type: "text", text: "Stock Sold" }]
    };
  }
);
const transport = new StdioServerTransport();
await server.connect(transport);
// getPositions()
// placeOrder("YESBANK", 1, "BUY")