'use client';

import {SessionProvider} from 'next-auth/react';
import {Toaster} from 'sonner';

import { AosProvider } from './aos-provider';
import {BgProvider} from './bg-provider';
import { QueryProvider } from './query-provider';
import {ThemeProvider} from './theme-provider';

export function Providers({children}: {children?: React.ReactNode}) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider attribute="class">
          <BgProvider>
              <AosProvider>
                <Toaster
                  pauseWhenPageIsHidden
                  position="top-center"
                  richColors
                  theme="system"
                />
                {children}
              </AosProvider>
          </BgProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
