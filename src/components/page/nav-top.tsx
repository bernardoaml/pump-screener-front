import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import SolPrice from '../HomeComponents/sol-price';
import { FaWallet } from 'react-icons/fa';

// import {W3Btn} from '@/wallet/w3-btn';
// import Notifications from '@/content/Notifications';

export function NavTop() {
  return (
    <header
      className="flex w-full justify-center"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="flex w-full max-w-7xl justify-center">
        <div className="inline-flex h-24 w-full items-center justify-between">
          <div className='flex flex-row items-center'>

          <Link href="/" prefetch={false}>
          <Image
              src="/logo.webp"
              width={180}
              height={90}
              alt="Pump.fun Alternative"
              className="mr-10"
              />
          </Link>
          
          </div>


          <ul className="flex flex-row mt-6 mb-4">
          <a href="" className='mr-10'>My Dashboard</a>
          <a href="" className='mr-10'>Advertise</a>
          <a href="" className='mr-10'>Support</a>
          <a href="">Contact</a>

          
        </ul>

        <div className='flex items-center'>
        <SolPrice/>
        <a className='ml-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 highlight highlightSelected border-spacing-2 border-2 border-primary bg-[--wui-gray-glass-005] py-1 px-4 text-primary sm:h-10 sm:w-30'><FaWallet className='mr-2' />My Dashboard</a>
        </div>


          {/* <div className="flex justify-between gap-2">
            <Notifications />
            <div className="inline-flex items-center justify-between gap-0">
              <W3Btn />
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
