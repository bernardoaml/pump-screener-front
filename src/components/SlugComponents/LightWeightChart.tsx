// src/SlugComponents/LightweightChart.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchTokenData } from '@/services/tradingViewDataFeed';

interface LightweightChartProps {
  tokenMint: string;
}

const LightweightChart: React.FC<LightweightChartProps> = ({ tokenMint }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initChart() {
      if (chartContainerRef.current && chartContainerRef.current.children.length === 0) {
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { color: '#1e1e1e' },
            textColor: '#d1d4dc',
          },
          grid: {
            vertLines: {
              color: '#2a2e39',
            },
            horzLines: {
              color: '#2a2e39',
            },
          },
          crosshair: {
            mode: 0,
          },

          timeScale: {
            borderColor: '#485c7b',
            timeVisible: true,
            secondsVisible: true
          },
        });

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#4caf50',
          downColor: '#f44336',
          borderDownColor: '#f44336',
          borderUpColor: '#4caf50',
          wickDownColor: '#f44336',
          wickUpColor: '#4caf50',
          priceFormat: {
            type: "price",
            precision: 10,
            minMove: 0.000000001,
          },
        });
        

        const data = await fetchTokenData(tokenMint);
        candlestickSeries.setData(data); 
        chart.timeScale().applyOptions({
          barSpacing: 0,
        });
        chart.timeScale().fitContent();       
        window.addEventListener("resize", () => {
          if (chart && chartContainerRef.current) {
            chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
          }
        });
        return () => {
          chart.remove();
        };
      }
    }

    initChart();
  }, [tokenMint]);

  return <div ref={chartContainerRef} className='bg-gray-500 w-full h-96 mb-4' />;
};

export default LightweightChart;
