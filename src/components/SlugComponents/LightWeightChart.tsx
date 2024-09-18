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
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
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
          },
        });

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#4caf50',
          downColor: '#f44336',
          borderDownColor: '#f44336',
          borderUpColor: '#4caf50',
          wickDownColor: '#f44336',
          wickUpColor: '#4caf50',
        });

        const volumeSeries = chart.addHistogramSeries({
          color: '#26a69a',
          priceFormat: {
            type: 'volume',
          },
        });

        const data = await fetchTokenData(tokenMint);
        candlestickSeries.setData(data);
        volumeSeries.setData(data.map((item: { time: number, value: number, close: number, open: number }) => ({ time: item.time, value: item.value, color: item.close > item.open ? '#4caf50' : '#f44336' })));

        return () => {
          chart.remove();
        };
      }
    }

    initChart();
  }, [tokenMint]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '200px' }} />;
};

export default LightweightChart;
