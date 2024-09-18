// src/services/tradingViewDataFeed.ts
import axios from 'axios';

export async function fetchTokenData(tokenMint: string) {
  try {
    const response = await axios.get(`/api/candlesticks/${tokenMint}?offset=0&limit=1000&timeframe=5`);
    return response.data.map((item: any) => ({
      time: item.timestamp, // O lightweight-charts aceita timestamp em segundos
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      value: item.value,
      is_5_min: item.is_5_min,
    }));
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error;
  }
}
