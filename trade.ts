import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
let access_token = process.env.ACCESS_TOKEN;

if (!apiKey || !access_token) {
  throw new Error("API_KEY and API_SECRET environment variables are required");
}

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token);


export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    await kc.placeOrder("regular",{
      exchange: "NSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product:"CNC",
      order_type:"MARKET",
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getStockPrice(tradingsymbol: string) {
  try {
    const price = await kc.getQuote(tradingsymbol);
    return price.last_price;
  } catch (err) {
    console.error(err);
  }
}


export async function getPositions(){
  const holdings = await kc.getPositions();
  let all= "";
  holdings.net.map(holding => {
      all+= `stock: ${holding.tradingsymbol} ,quantity:${holding.quantity}, currentprice:${holding.last_price}`
  })
  return all;
}
