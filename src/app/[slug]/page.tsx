"use client";
import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';
import { FaGlobe, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import Loading from '@/components/page/loading';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { BannerTop } from '@/components/HomeComponents/banner-top';
import { FaCopy } from 'react-icons/fa6';

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
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto pt-1">
      {/* <BannerTop /> */}
      <div className="w-full justify-center gap-10 mt-10 grid grid-cols-12">
        {/* Chart Column */}
        <div className="w-full h-full flex-grow col-span-9">
          <div className="flex flex-row text-sm mb-2">

            <h3 className='text-white'>Token: {token.name}</h3>

            <h3 className='text-white ml-5'>Ticker: ${token.symbol}</h3>

            <div className='flex flex-row'> <h3 className='text-white ml-5'>CA: {token.mint} </h3> <FaCopy className='pt-1 ml-1 text-primary' /></div>

            <h3 className='text-white ml-5'>Market Cap: <span className='text-primary'>$15.540</span></h3>
           

          </div>
          <LightweightChart tokenMint={token.mint} />
          <div ref={topRef} className="mb-4 flex justify-start">
            <span className="text-sm bg-transparent text-white mb-2 cursor-pointer" onClick={scrollToBottom}>
              [scroll down]
            </span>
          </div>
          <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
        </div>

        {/* Token Info */}
        <div className="col-span-3 order-2 flex flex-col">
          <img src={token.image_uri} alt={token.name} className="w-64 h-auto mb-4" />

          <h1 className="text-xl font-medium">{token.name}</h1>
          <h2 className='text-xl font-semibold text-primary'>${token.symbol}</h2>

          <p className="text-sm text mt-2">{token.description}</p>

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

          <div className="w-full block pt-6">
            <h3 className='text-base pb-2'>Bonding Curve Progress:</h3>
            <div className="w-full h-5 bg-black bg-opacity-70 rounded-full">
              <div className="w-3/4 h-full text-center text-sm text-secondary  font-semibold bg-primary rounded-full">
                75%
              </div>
            </div>
            <p className='text-sm pt-5'>When the market cap reaches <span className='text-primary'>$64,271</span> all the liquidity from the bonding curve will be deposited into Raydium and burned. progression increases as the price goes up.</p>

            <p className='text-sm pt-3'>there are 69,911,468 tokens still available for sale in the bonding curve and there is <span className='text-primary'>62.021</span> SOL in the bonding curve.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center mt-4">

      </div>
      <div ref={bottomRef} className="w-full flex justify-center mt-4">
        <span className="text-sm bg-transparent text-white cursor-pointer" onClick={scrollToTop}>
          [scroll up]
        </span>
      </div>
    </div>
  );
}
