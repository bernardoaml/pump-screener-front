'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface Token {
  image_uri?: string;
  name: string;
  symbol: string;
  address: string;
}

const RecentTokens = () => {
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);

  useEffect(() => {
    axios.get('/api/recent_tokens')
      .then(response => {
        const tokenData = response.data.map((token: any) => ({
          image_uri: token.image_uri,
          name: token.name,
          symbol: token.symbol,
          address: token.address
        }))
        setRecentTokens(tokenData);
      })
      .catch(error => console.error('Request Error', error));
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-7xl">
      <h1 className="pb-10 font-extrabold text-3xl">Most Recent Tokens</h1>
      <Splide
        options={{ perPage: 6, gap: 26, navigator: false, pagination: false }}
        aria-label="Recent Tokens"
        className="hidden lg:flex"
      >
        {recentTokens.map(token => (
          <SplideSlide key={token.address}>
            <div className="flex flex-col items-center">
              <img
                src={token.image_uri}
                alt={token.name}
                className="h-48 w-48 object-contain"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">{token.name}</h2>
              <p className="text-blackcolor text-sm">{token.symbol}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RecentTokens;