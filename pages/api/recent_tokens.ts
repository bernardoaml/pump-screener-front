import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const response = await axios.get('https://frontend-api.pump.fun/coins?offset=3&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false');
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Recent Token data' });
    }
  }
  