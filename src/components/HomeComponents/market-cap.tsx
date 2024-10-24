import React from 'react';

export default function MarketCap({ value }: { value: number }) {
  return (
    <div className="text-base pt-1.5">
      <span>
        Market Cap:
      </span>
      <br/>
      {" "}
      <span className="text-primary">
        ${Number(Number(value).toFixed(2)).toLocaleString()}
      </span>
    </div>
  );
}
