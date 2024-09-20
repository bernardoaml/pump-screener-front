// src/SlugComponents/LightweightChart.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { CandlestickData, CandlestickSeriesOptions, createChart, IChartApi, ISeriesApi, Time, WhitespaceData } from 'lightweight-charts';
import { CandleStick, fetchTokenData } from '@/services/tradingViewDataFeed';

type CandleStickSeries = ISeriesApi<"Candlestick", Time, CandlestickData<Time> | WhitespaceData<Time>, CandlestickSeriesOptions>;
type ChartState = { chart: IChartApi, series: CandleStickSeries };
interface LightweightChartProps {
  tokenMint: string;
}

const LightweightChart: React.FC<LightweightChartProps> = ({ tokenMint }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartState, setChartState] = useState<ChartState | null>(null);
  const [data, setData] = useState<CandleStick[] | null>(null);
  const [makeRequest, setMakeRequest] = useState(true);

  useEffect(() => {
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
      const series = chart.addCandlestickSeries({
        upColor: '#4caf50',
        downColor: '#f44336',
        borderDownColor: '#f44336',
        borderUpColor: '#4caf50',
        wickDownColor: '#f44336',
        wickUpColor: '#4caf50',
        priceFormat: {
          type: "price",
          precision: 10,
          minMove: 0.0000000001,
        },
      });
      chart.timeScale().applyOptions({ barSpacing: 0 });
      chart.timeScale().fitContent(); 
      setChartState({ chart, series });     
      window.addEventListener("resize", () => {
        if (chart && chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
        }
      });
      return () => {
        chart.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (chartState) {
      fetchTokenData(tokenMint)
        .then((candles) => setData(candles))
        .catch((err) => console.error("Fail fetching token candles data", err))
        .finally(() => {
          setTimeout(() => {
            setMakeRequest((prev) => !prev);
          }, 1000);
        })
    }
  }, [makeRequest, chartState, tokenMint]);

  useEffect(() => {
    if (chartState && data) {
      chartState.series.setData(data as unknown as CandlestickData<Time>[]);
    }
  }, [data, chartState])

  return <div ref={chartContainerRef} className='bg-gray-500 w-full max-w-[900px] h-96 mb-4 m-auto' />
};

export default LightweightChart;
