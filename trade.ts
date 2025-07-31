import { KiteConnect } from "kiteconnect";

const apiKey = "5s3119ar39i7dtzz";
let access_token = "LNPyCtSo3cFfjX6Cx6qFXiccofpflZQT";
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
