"use client";
import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';
import { FaTelegramPlane } from "react-icons/fa";
import Loading from '@/components/page/loading';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { FaCopy } from 'react-icons/fa6';
import { BondingCurveResponse } from '../../../pages/api/bonding_curve';

export default function TokenPage({ params }: { params: { slug: string } }): JSX.Element {
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bondingCurve, setBondingCurve] = useState<BondingCurveResponse | null>(null);
  const [getBondingCurve, setGetBondingCurve] = useState(true);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const { data } = await axios.get<TokenData>(`/api/coins/${params.slug}`);
        data.image_uri = unprotectLinkOfCFIPFS(data.image_uri);
        setToken(data);
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

  useEffect(() => {
    if (getBondingCurve) {
      setGetBondingCurve(false);
      axios.get<BondingCurveResponse>("/api/bonding_curve", { headers: { mint: params.slug } })
        .then(({ data }) => setBondingCurve(data))
        .catch((err) => console.error("Fail fetch bonding curve", err));
    }
  }, [params.slug, getBondingCurve]);

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

            <h3 className='text-white ml-5'>Market Cap: <span className='text-primary'>{`$${Number(bondingCurve?.marketCapUSD || 0).toLocaleString()}`}</span></h3>

          </div>
          <LightweightChart tokenMint={token.mint} onUpdate={setGetBondingCurve} />
          <div ref={topRef} className="mb-4 flex justify-start">
            <span className="text-sm bg-transparent text-white mb-2 cursor-pointer" onClick={scrollToBottom}>
              [scroll down]
            </span>
          </div>
          <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
        </div>

        {/* Token Info */}
        <div className="col-span-3 order-2 flex flex-col">
          <img src={token.image_uri || ""} alt={token.name} className="w-64 h-auto mb-4" />

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
              <div className={`h-full text-center text-sm text-secondary  font-semibold bg-primary rounded-full`} style={{ width: `${bondingCurve?.percent || 0}%`}}>
                {`${bondingCurve?.percent || 0}%`}
              </div>
            </div>
            <p className='text-sm pt-5'>When the market cap reaches <span className='text-primary'>{`$${Number(Math.round(bondingCurve?.finalMarketCapUSD || 0)).toLocaleString()}`}</span> all the liquidity from the bonding curve will be deposited into Raydium and burned. progression increases as the price goes up.</p>

            <p className='text-sm pt-3'>there are {Math.floor((bondingCurve?.realTokenReserves || 0) / 10 ** 6).toLocaleString()} tokens still available for sale in the bonding curve and there is <span className='text-primary'>{((bondingCurve?.realSolReserves || 0) / 10 ** 9).toLocaleString()}</span> SOL in the bonding curve.</p>
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
