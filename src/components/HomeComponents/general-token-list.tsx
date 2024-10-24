'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '@splidejs/react-splide/css';
import { FaTelegramPlane } from "react-icons/fa"; 
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import './splide-customization.css'
import MarketCap from './market-cap';

interface Token {
  image_uri?: string;
  name: string;
  symbol: string;
  mint: string;
  website?:string;
  twitter?:string;
  telegram?:string;
  usd_market_cap: number;
}

const GeneralTokens = () => {
  const [generalTokens, setGeneralTokens] = useState<Token[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    const tokensPerPage = 50;
    const offset = currentPage * tokensPerPage;
      axios.get<Token[]>(`/api/coins?offset=${offset}&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false`)
      .then(response =>{
          const tokenData = response.data.map((token)=>({
              image_uri: token.image_uri,
              name: token.name,
              symbol: token.symbol,
              twitter:token.twitter,
              website:token.website,
              telegram:token.telegram,
              mint: token.mint,
              usd_market_cap: token.usd_market_cap,
          }))
          setGeneralTokens(tokenData)
      })
      .catch(error=>console.error('Request Error', error))
  }, [currentPage]);

  return (
      <div className="mx-auto max-w-7xl mb-16 mt-3.5">
        <h1
            className="ml-3 text-3xl text-primary"
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            Most Recent Tokens
          </h1>
      
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3.5 wrapper"
              data-aos="zoom-in-up"
              data-aos-delay="100"
              data-aos-duration="1500"
        >
          {generalTokens.slice(0, 50).map(token => (
            <div key={token.mint} className="flex flex-col card">
              <a href={`/${token.mint}`}>
                <img
                  src={token.image_uri}
                  alt={token.name}
                  className="h-56 w-56 object-cover rounded-lg"
                />
              </a>
              <h2 className="text-maincolor mt-3 line-clamp-1 text-lg">
                  {token.name}
                </h2>
              <span className="text-base uppercase text-primary">
                  ${token.symbol}
              </span>

              <MarketCap value={token.usd_market_cap} />
    
              <div className="mt-4 flex flex-row items-center gap-2">
                {token.twitter && (
                  <a href={token.twitter} target="_blank" rel="nofollow">
                    <TwitterLogoIcon className="h-5 w-5 hover:text-primary" />
                  </a>
                )}
    
                {token.telegram && (
                <a href={token.telegram} target="_blank" rel="nofollow">
                  <FaTelegramPlane className="h-5 w-5 hover:text-primary" />
                </a>
                )}
    
                {token.website && (
                <a href={token.website} target="_blank" rel="nofollow">
                  <GlobeIcon className="h-5 w-5 hover:text-primary" />
                </a>
                )}
    
                <a
                  href={`https://pump.fun/${token.mint}`}
                  target="_blank"
                  rel="nofollow"
                >
                  <img
                    src="/logo-pumpfun.webp"
                    alt="pumpfun"
                    className="h-5 w-5 hover:opacity-70"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-controls flex justify-center mt-4">
        <button 
          className="mr-4 px-8 py-3 text-primary bg-white bg-opacity-5 hover:bg-primary hover:text-secondary disabled:bg-gray-50 disabled:bg-opacity-10 disabled:text-teal-100 disabled:opacity-30  rounded-md transition-colors duration-500"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button 
          className="px-8 py-3 text-primary bg-white bg-opacity-5 hover:bg-primary hover:text-secondary disabled:bg-gray-50 disabled:bg-opacity-10 disabled:text-teal-100 disabled:opacity-30  rounded-md transition-colors duration-500"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={generalTokens.length < 50}
        >
          Next
        </button>
      </div>
      </div>
    );
}

export default GeneralTokens