// src/components/TradeSection.tsx
import { useEffect, useState } from 'react';
import { fetchTrades } from '@/services/api';
import TradeItem from './TradeItem';

const TradeSection: React.FC<{ tokenAddress: string }> = ({ tokenAddress }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 200;

  useEffect(() => {
    const fetchData = async () => {
      const tradesData = await fetchTrades(tokenAddress, limit, offset);
      setTrades(Array.isArray(tradesData) ? tradesData : []);
    };

    fetchData();
  }, [tokenAddress, offset]);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <div>
      <div className="trade-header grid grid-cols-6 gap-4 mb-2 font-bold">
        <div>User</div>
        <div>Type</div>
        <div>SOL</div>
        <div>Token Amount</div>
        <div>Date</div>
        <div>Transaction</div>
      </div>
      {trades.map(trade => (
        <TradeItem key={trade.signature} trade={trade} />
      ))}
      <div className="pagination-controls flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={offset === 0} className="bg-gray-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleNextPage} className="bg-gray-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default TradeSection;
