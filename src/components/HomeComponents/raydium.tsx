'use client';

import { useEffect,useState } from 'react';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import axios from 'axios';
import '@splidejs/react-splide/css';
import { FaGlobe, FaTwitter, FaTelegramPlane } from "react-icons/fa";

interface Token {
  image_uri?: string;
  logo?: string;
  mint:string;
  name: string;
  symbol: string;
  address:string;
  website?:string;
  twitter?:string;
  telegram?:string;
}

const MoreCloseToRaydium = () => {
  const [raydiumTokens, setRaydiumTokens] = useState<Token[]>([]);
  useEffect(() => {
    axios.get<Token[]>('/api/usd_market_cap')
      .then(response => {
        const tokenData = response.data.map((token)=>({
          logo : token.logo,
          name: token.name,
          symbol: token.symbol,
          address: token.address,
          mint:token.mint
        }))
        setRaydiumTokens(tokenData)
      })
      .catch(error => console.error('Request Error', error));
  }, []);

    
return (
  <>
    <div className="mx-auto mt-8 max-w-7xl">
      <h1 className="pb-10 font-extrabold text-3xl">More Close to Raydium</h1>

      <Splide
        options={{ perPage: 6, gap: 26, navigator: false, pagination: false }}
        aria-label="King of The Hill"
        className="lg:flex"
        data-aos="zoom-in-up"
        data-aos-delay="100"
        data-aos-duration="1500"
      >
        {raydiumTokens.map(token => (
          <SplideSlide key={token.address}>
            <div className="flex flex-col items-center">
              <a href={`/${token.address}`}>
                <img
                  src={token.logo}
                  alt={token.name}
                  className="max-h-48 max-w-48 object-contain"
                />
              </a>
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
                {token.name}
              </h2>
              <p className="text-blackcolor text-sm">{token.symbol}</p>

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
  </>
);
  };
  
  export default MoreCloseToRaydium;