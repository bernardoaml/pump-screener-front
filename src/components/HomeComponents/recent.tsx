'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { FaGlobe, FaTwitter, FaTelegramPlane } from "react-icons/fa";

interface Token {
  image_uri?: string;
  name: string;
  symbol: string;
  mint: string;
  website?:string;
  twitter?:string;
  telegram?:string;
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
          twitter:token.twitter,
          website:token.website,
          telegram:token.telegram,
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
  
              {/* Adicionando os ícones */}
              <div className="flex mt-2 space-x-4">
                {token.website && (
                  <a href={token.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaGlobe className="h-5 w-5" />
                  </a>
                )}
                {token.twitter && (
                  <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaTwitter className="h-5 w-5" />
                  </a>
                )}
                {token.telegram && (
                  <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaTelegramPlane className="h-5 w-5" />
                  </a>
                )}
  
                {/* Alterar ícone para Pump.fun */}
                <a
                  href={`https://pump.fun/${token.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  <FaGlobe className="h-5 w-5" />
                </a>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RecentTokens;