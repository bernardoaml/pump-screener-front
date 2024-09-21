'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface Token {
  image_uri?: string;
  name: string;
  symbol: string;
  mint: string;
}

const RecentTokens = () => {
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);

  useEffect(() => {
    axios.get<Token[]>('/api/recent_tokens')
      .then(response => {
        const tokenData = response.data.map((token) => ({
          image_uri: token.image_uri,
          name: token.name,
          symbol: token.symbol,
          mint: token.mint
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
        className="lg:flex"
      >
        {recentTokens.map(token => (
          <SplideSlide key={token.mint}>
            <div className="flex flex-col items-center">
              <a href={`/${token.mint}`}>
                <img
                  src={token.image_uri}
                  alt={token.name}
                  className="h-48 w-48 object-contain"
                />
              </a>
              <h2 className="text-maincolor mt-2 font-poppins text-lg">{token.name}</h2>
              <p className="text-whitecolor text-sm">{token.symbol}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RecentTokens;