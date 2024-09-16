'use client';

import {Splide, SplideSlide} from '@splidejs/react-splide';

import '@splidejs/react-splide/css';

const MoreCloseToRaydium = () => {
  return (
    <>

    
      <div className="max-w-7xl mx-auto mt-5">
      <h1 className='text-3xl font-extrabold py-10'>More close to Raydium</h1>
        <Splide
          options={{perPage: 6, gap: 26}}
          aria-label="King of The Hill"
          className="hidden lg:flex"
          data-aos="zoom-in-up"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/1.webp"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
                Token Name 
              </h2>
              <p className="text-blackcolor text-sm">$FASF</p>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/2.jpg"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
              Token Name
              </h2>
              <p className="text-blackcolor text-sm">$TEC</p>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/3.png"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
              Token Name
              </h2>
              <p className="text-blackcolor text-sm">$GXA</p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/4.png"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
              Token Name
              </h2>
              <p className="text-blackcolor text-sm">$AOA</p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/5.png"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
                Token Name
              </h2>
              <p className="text-blackcolor text-sm">$BOAA</p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/6.webp"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
                Token Name
              </h2>
              <p className="text-blackcolor text-sm">$BOA2</p>
            </div>
          </SplideSlide>

          <SplideSlide>
            <div className="flex flex-col">
              <img
                src="/tokens/7.png"
                alt="Token Name"
                className="h-full w-full"
              />
              <h2 className="text-maincolor mt-2 font-poppins text-lg">
                Token Name
              </h2>
              <p className="text-blackcolor text-sm">$LUFF</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </>
  );
};

export default MoreCloseToRaydium;
