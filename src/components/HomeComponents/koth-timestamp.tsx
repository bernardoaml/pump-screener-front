'use client';

import { useEffect,useState } from 'react';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import {Splide, SplideSlide} from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import { FaTelegramPlane } from 'react-icons/fa';

interface Token {
  image_uri?: string;
  logo?: string;
  name: string;
  symbol: string;
  address:string;
}

const KothTimestamp = () => {
  const [kothTokens, setKothTokens] = useState<Token[]>([]);
  useEffect(() => {
    // const fetchTokens = async () => {
      const response = axios.get('/api/last_koth')
      .then(response=>{
        const tokenData = response.data.map((token: any)=>({
          logo : token.logo,
          name: token.name,
          symbol: token.symbol
        }))
        setKothTokens(tokenData)
      }).catch(error => console.error('Request Error', error))
  }, []);

  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl">
        <h1 className="pb-10 font-extrabold text-3xl">Last King of the Hill</h1>

        <Splide
          options={{ perPage: 6, gap: 26, navigator: false, pagination: false }}
          aria-label="King of The Hill"
          className="hidden lg:flex"
          data-aos="zoom-in-up"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          {kothTokens.map(token => (
            <SplideSlide key={token.address}>
              <div className="flex flex-col">
                <img
                  src={token.logo}
                  alt={token.name}
                  className="max-h-48 max-w-48"
                />
                <h2 className="text-maincolor mt-2 font-poppins text-lg">
                  {token.name}
                </h2>
                <p className="text-blackcolor text-sm">{token.symbol}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default KothTimestamp;
