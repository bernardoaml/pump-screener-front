"use client";
import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';

export default function TokenPage({ params }: { params: { slug: string } }): JSX.Element {
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.get(`/api/coins`, {
          params: { tokenAddress: params.slug }
        });
        setToken(response.data)
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error) {
          setError(err.message);
        } else {
          console.error(err);
          setError("Unexpected error");
        }
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
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="col-span-2">
          <div ref={topRef} className="mb-4 flex">
            <span
              className="text-sm bg-transparent text-white mb-2 cursor-pointer"
              onClick={scrollToBottom}
            >
              [scroll down]
            </span>
          </div>
          <LightweightChart tokenMint={token.mint} />
          <div className="col-span-1 flex flex-col items-center">
          <img src={token.image_uri} alt={token.name} className="w-full h-auto mb-4" />
          <h1 className="text-xl font-semibold">{token.name} ({token.symbol})</h1>
          <p className="text-sm">{token.description}</p>
          <a href={token.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Visit Website
          </a>
          <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
        </div>
          <div ref={bottomRef} className="mt-4 flex">
            <span
              className="text-sm bg-transparent text-white mt-2 cursor-pointer"
              onClick={scrollToTop}
            >
              [scroll up]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
