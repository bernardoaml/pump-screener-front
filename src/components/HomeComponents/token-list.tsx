import React from 'react';

import {GlobeIcon, TwitterLogoIcon} from '@radix-ui/react-icons';

import {FaTelegramPlane} from 'react-icons/fa';

 

async function getData() {
  const res = await fetch('http://localhost:3000/api/tokens');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function TokenList() {
  const data = await getData();
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl">
        <div className="flex flex-row items-center justify-between">
          <div>
          <h1
          className="ml-6 text-2xl text-primary"
          data-aos="fade-right"
          data-aos-delay="350"
          data-aos-duration="1500"
        >
         All Tokens
        </h1>

         
          </div>

          
        </div>

        <div className="grid grid-cols-5 gap-10 px-7">
          {data.map((token: Token) => (
            <div className="flex flex-col" key={token.address}>
              <img
                src={token.image}
                alt={`Token ${token.name}`}
                className="h-34 w-full rounded-sm"
              />
              <h2 className="text-maincolor font-catamaran mt-3 line-clamp-1 text-base">
                {token.name}
              </h2>

              <span className="font-catamaran text-base uppercase text-primary">
                {' '}
                ${token.symbol}
              </span>

              <div className="mt-4 flex flex-row items-center gap-2">
                <TwitterLogoIcon className="h-5 w-5" />
                <FaTelegramPlane className="h-5 w-5" />
                <GlobeIcon className="h-5 w-5" />
                <img
                  src="/logo-pumpfun.webp"
                  alt="pumpfun"
                  className="h-5 w-5"
                />
              </div>

              <p className="mb-6 mt-3 line-clamp-5">{token.description}</p>
            </div>
          ))}
        </div>

         
      </div>
    </>
  );
}
