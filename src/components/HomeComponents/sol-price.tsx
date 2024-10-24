"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const SolPrice: React.FC = () => {
  const [solPrice, setSolPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get('/api/sol-price');
        setSolPrice(response.data.solPrice);
      } catch (error) {
        console.error('Error fetching Sol price:', error);
      }
    };

    // Fetch the price immediately when the component mounts
    fetchSolPrice();

    // Set interval to update the price every 5 seconds
    const intervalId = setInterval(fetchSolPrice, 5000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-sm font-medium font-sans flex items-center">
      <img src='/solana-symbol.png' className='h-4 w-3.5 mr-2' />
      
      {solPrice !== null ? `$${solPrice.toLocaleString()}` : 'Loading Sol Price...'}
    </div>
  );
};

export default SolPrice;
