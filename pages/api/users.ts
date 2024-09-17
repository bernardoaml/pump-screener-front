import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const userId = req.url?.split("userId=")[1];
  if (!userId) {
    res.status(500).json({ error: "Token Address not found in requested URL" });
    return;
  }
  try {
    const response = await axios.get(`https://frontend-api.pump.fun/users/${userId}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Token Data' });
  }
}
  