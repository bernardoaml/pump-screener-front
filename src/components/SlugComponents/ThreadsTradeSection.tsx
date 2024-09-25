// src/components/ThreadTradesSection.tsx
import { useState } from 'react';
import CommentSection from './CommentSection';
import TradeSection from './TradeSection';

const ThreadTradesSection: React.FC<{ tokenAddress: string, creator: string }> = ({ tokenAddress, creator }) => {
  const [activeTab, setActiveTab] = useState<'thread' | 'trades'>('thread');

  return (
    <div className="p-4 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded z-10 ${activeTab === 'thread' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('thread')}
        >
          Thread
        </button>
        <button
          className={`px-4 py-2 rounded z-10 ${activeTab === 'trades' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('trades')}
        >
          Trades
        </button>
      </div>
      {activeTab === 'thread' ? (
        <div className="bg-blue-500 p-4 rounded-lg">
          <CommentSection tokenAddress={tokenAddress} creator={creator} />
        </div>
      ) : (
        <div className="bg-black p-4 rounded-lg">
          <TradeSection tokenAddress={tokenAddress} creator={creator} />
        </div>
      )}
    </div>
  );
};

export default ThreadTradesSection;
