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
import { delay } from '@/services/utils';

interface CreatedToken {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  twitter: string | null;
  telegram: string | null;
  bonding_curve: string;
  associated_bonding_curve: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  website: string | null;
  show_name: boolean;
  last_trade_timestamp: number;
  king_of_the_hill_timestamp: number | null;
  market_cap: number;
  reply_count: number;
  last_reply: number;
  nsfw: boolean;
  market_id: number | null;
  inverted: null;
  is_currently_live: boolean;
  username: string;
  profile_image: string;
  usd_market_cap: number;
}

export default function TokenPage({ params }: { params: { slug: string } }): JSX.Element {
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bondingCurve, setBondingCurve] = useState<BondingCurveResponse | null>(null);
  const [getBondingCurve, setGetBondingCurve] = useState(true);
  const [createdTokens, setCreatedTokens] = useState<CreatedToken[]>([]);
  const [buyers, setBuyers] = useState<Set<string>>(new Set());
  const [updateBuyers, setUpdateBuyers] = useState(false);

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

  useEffect(() => {
    if (token) {
      axios.get<CreatedToken[]>(`/api/coins/user-created-coins/${token.creator}?offset=0&limit=10&includeNsfw=false`)
        .then(({ data }) => {
          setCreatedTokens(data.toSorted((a, b) => b.created_timestamp - a.created_timestamp));
        })
        .catch((err) => {
          console.error("Fetch created", err);
        });
    }
  }, [params.slug, token]);

  useEffect(() => {
    const getTrades = async () => {
      const limit = 200;
      let offset = 0;
      let keepFetching = true;
      const waitIntervalMs = 1000;
      const allBuyers = new Set<string>();
      while (keepFetching) {
        await axios.get<Trade[]>(`/api/trades/all/${params.slug}?limit=${limit}&offset=${offset}&minimumSize=0`)
          .then(({ data }) => {
            if (data.length) {
              data.forEach((trade) => {
                allBuyers.add(trade.user);
              });
              offset += limit;
            } else {
              keepFetching = false;
            }
          })
          .catch((err) => {
            console.error("Fetch trades buyers error", err);
          });
        if (waitIntervalMs) await delay(waitIntervalMs);
      }
      setBuyers((prev) => allBuyers.union(prev));
      setUpdateBuyers(true);
    }

    getTrades();
  }, [params.slug]);

  useEffect(() => {
    if (updateBuyers) {
      const fetchRecentTrades = async () => {
        try {
          const { data } = await axios.get<Trade[]>(`/api/trades/all/${params.slug}?limit=50&offset=0&minimumSize=0`);
          const buyersSet = new Set<string>();
          for (let i = 0; i < data.length; ++i) {
            buyersSet.add(data[i].user);
          }
          if (buyersSet.size) {
            setBuyers((prev) => buyersSet.union(prev));
          }
        } catch (err) {
          console.error("Fail fetching recent trades", err);
        }
      }
      const interval = setInterval(fetchRecentTrades, 3000);
      return () => clearInterval(interval);
    }
  }, [params.slug, updateBuyers]);

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
          { createdTokens.length && (
            <div className="w-full block pt-6">
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href={`https://pump.fun/profile/${createdTokens[createdTokens.length - 1].creator}`}
                className="text-lg font-semibold text-white hover:text-blue-800 transition-colors underline"
              >
                { `${createdTokens[createdTokens.length - 1].username || createdTokens[createdTokens.length - 1].creator.slice(0, 6)} (dev)` }
              </a>
              
              <p className="text-md text-white-600 mt-4">Other coins created by this developer:</p>
              
              <ul className="mt-2 space-y-2 border-t border-gray-200 pt-4 flex-col">
                { createdTokens.filter((token) => token.mint != params.slug).map((token) => (
                  <li key={token.mint} className="text-gray-700">
                    <a href={`/${token.mint}`} className="no-underline hover:underline flex-row  hover:text-white transition-colors">
                      { token.name }
                    </a>
                  </li>
                )) }
              </ul>
            </div>
          ) }
          <div className="w-full block pt-6">
            { buyers.size ? `Number of buyers: ${buyers.size}` : `Number of buyers: Loading...` }
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
