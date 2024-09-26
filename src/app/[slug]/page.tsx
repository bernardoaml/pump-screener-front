"use client";
import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';
import { FaGlobe, FaTwitter, FaTelegramPlane } from "react-icons/fa";

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
        response.data.image_uri = unprotectLinkOfCFIPFS(response.data.image_uri);
        setToken(response.data);
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
      <div className="relative flex max-w-7xl mx-auto flex-col place-items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto pt-10">
      <div className="flex w-full justify-center gap-10 ">
        {/* Coluna do Gráfico */}
        <div className="w-full ">

          <LightweightChart tokenMint={token.mint} />
          <div ref={topRef} className="mb-4 flex justify-start">
            <span className="text-sm bg-transparent text-white mb-2 cursor-pointer" onClick={scrollToBottom}>
              [scroll down]
            </span>
          </div>
        </div>

        {/* Coluna da Imagem e Informações */}
        <div className="col-span-1 order-2 flex flex-col items-center">
        <img src={token.image_uri} alt={token.name} className="w-64 h-auto mb-4 border-8 border-black" />
        <h1 className="text-xl font-semibold text-center">{token.name} ({token.symbol})</h1>
        <p className="text-sm text-center">{token.description}</p>

        {token.website && (
          <a href={token.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 flex items-center">
            <FaGlobe className="mr-2" /> Visit Website
          </a>
        )}

        {token.twitter && (
          <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 flex items-center">
            <FaTwitter className="mr-2" /> Visit Twitter
          </a>
        )}

        {token.telegram && (
          <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 flex items-center">
            <FaTelegramPlane className="mr-2" /> Visit Telegram
          </a>
        )}
    </div>
      </div>
      <div className="flex w-full justify-center items-center mt-4">
        <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
      </div>
      <div ref={bottomRef} className="w-full flex justify-center mt-4">
        <span className="text-sm bg-transparent text-white cursor-pointer" onClick={scrollToTop}>
          [scroll up]
        </span>
      </div>
    </div>
  );
}
