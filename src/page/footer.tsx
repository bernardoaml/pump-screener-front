import config from '@/configs/general.config';
import Image from 'next/image';

import {RiTwitterXFill} from 'react-icons/ri';

 

export function Footer() {
  return (
    <footer
      className="relative mx-auto flex h-20 max-w-7xl flex-col justify-between"
      id="footer"
    >
      <div
        className="flex flex-col items-center justify-center md:flex-row"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
        // data-aos-anchor="#footer"
      >
        <div className="flex flex-row items-center space-x-4">
          {/* <a
            href="https://twitter.com/OnePaySolana"
            target="_blank"
            rel="noreferrer"
          >
            <RiTwitterXFill className="mx-auto mt-0.5 text-2xl text-gray-200 hover:text-cyan-300" />
          </a> */}

          {/* <a
              href="https://www.reddit.com/r/OnePaySolana/"
              target="_blank"
              rel="noreferrer"
            >
              <RiRedditLine className="mx-auto text-3xl text-gray-200 hover:text-cyan-300" />
            </a> */}
        </div>
      </div>

      <div className='text-center justify-center'>
        <Image
          className="relative mx-auto border-none"
          src="/logo.webp"
          alt="PumpScreener"
          width={150}
          height={150}
          priority
          data-aos="zoom-in"
          data-aos-duration="700"
        />

        <p
          className="pt-4 pb-8 text-center text-gray-200"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          &copy;2024 - {config.siteName}
        </p>
      </div>
    </footer>
  );
}
