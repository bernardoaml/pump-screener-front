// src/app/[slug]/page.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getData } from '@/services/api';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';
export default function TokenPage({ params }: { params: { slug: string } }): JSX.Element {
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchToken() {
      // try {
      //   const tokenData = await getData(params.slug);
      //   setToken(tokenData);
      // } catch (error: any) {
      //   setError(error.message);
      // }
      try {
        const response = await axios.get("/api/coins", {
          params: {
            tokenAddress: params.slug
          }
        });
        setToken(response.data)
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchToken();
  }, [params.slug]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token) {
    return (
      <div className="relative flex max-w-7xl flex-col place-items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto pt-10">
      <div className="grid grid-cols-8 gap-6">
        <div className="col-span-6">
          <div ref={topRef} className="mb-4 flex">
            <span
              className="text-sm bg-transparent text-white mb-2 cursor-pointer"
              onClick={scrollToBottom}
            >
              [scroll down]
            </span>
          </div>
          {/* <div className="bg-gray-500 h-96 mb-4">
            <LightweightChart tokenMint={token.mint} />
          </div> */}
          <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
          <div ref={bottomRef} className="mt-4 flex">
            <span
              className="text-sm bg-transparent text-white mt-2 cursor-pointer"
              onClick={scrollToTop}
            >
              [scroll up]
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <img src={token.image_uri} alt={token.name} className="w-80" />
          <h1 className="mt-5 text-xl font-semibold">{token.name} ({token.symbol})</h1>
          <p className="mt-4">{token.description}</p>
          <a href={token.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
      </div>
    </div>
  );
}
