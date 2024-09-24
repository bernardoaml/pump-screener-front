import './globals.css';
import { fontLexend, fontMontserrat, fontShortStack } from '@/configs/fonts.configs';
import { cn } from '@/lib/utils';
import { NavTop } from '@/page/nav-top';
import { Footer } from '@/page/footer';
import { Providers } from '@/components/providers';
import { rootMetadata } from '@/constants/metadata/public';

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scrollbar scrollbar-track-background scrollbar-thumb-silver_lake_blue"
    >
      <body
        className={cn(
          fontMontserrat.className,
          fontLexend.className,
          fontShortStack.className,
          fontMontserrat.variable,
          fontLexend.variable,
          fontShortStack.variable,
        )}
      >
        <NavTop />
        <Providers>
          <div className="min-h-[calc(100vh-155px)] doodle ">
            <div className="min-h-[calc(100vh-195px)]">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
