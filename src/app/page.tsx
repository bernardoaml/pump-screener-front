import React from 'react';
import Image from "next/image";
import KothTimestamp from '@/components/HomeComponents/koth-timestamp';
import MostRecentTokens from '@/components/HomeComponents/recent';
import MoreCloseToRaydium from '@/components/HomeComponents/raydium';

export default function Home() {
  return (
    <div>
      <MostRecentTokens/>
      <KothTimestamp/>
      <MoreCloseToRaydium/>
    </div>
  );
}
