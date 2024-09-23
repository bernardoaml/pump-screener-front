import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

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
        <div className="inline-flex h-24 w-full items-center justify-between p-2 px-6">
          <Link href="/" prefetch={false}>
            <Image
              src="/logo.webp"
              width={90}
              height={90}
              alt="OnePay"
              className="mr-10"
            />
          </Link>

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
