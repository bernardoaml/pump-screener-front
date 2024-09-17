import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (!req.url) {
    res.status(500).json({ error: "Requested URL Not Found" });
    return;
  }
  const url = new URL(`http://c${req.url}`);
  const tokenAddress = url.searchParams.get("tokenAddress");
  if (!tokenAddress) {
    res.status(500).json({ error: "tokenAddress not found in URL" });
    return;
  }
  try {
    const response = await axios.get(`https://frontend-api.pump.fun/trades/all/${tokenAddress}?limit=${url.searchParams.get("limit") || 200}&offset=${url.searchParams.get("offset") || 0}&minimumSize=${url.searchParams.get("minimumSize") || 0}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Trades Data' });
  }
}
