import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface OrderBookProps {
  pair: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
  // Sample data - In production, this would come from your backend
  const asks = Array.from({ length: 10 }, (_, i) => ({
    price: 100 + i * 0.1,
    amount: Math.random() * 10,
    total: Math.random() * 100,
  })).reverse();

  const bids = Array.from({ length: 10 }, (_, i) => ({
    price: 99.9 - i * 0.1,
    amount: Math.random() * 10,
    total: Math.random() * 100,
  }));

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Order Book</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Depth:</span>
          <select className="text-sm border-gray-300 rounded-md">
            <option>0.1</option>
            <option>0.01</option>
            <option>0.001</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Asks */}
        <div>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 mb-2">
            <div>Price</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          <div className="space-y-1">
            {asks.map((ask, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 text-sm hover:bg-red-50"
              >
                <div className="text-red-500">{ask.price.toFixed(4)}</div>
                <div className="text-right">{ask.amount.toFixed(4)}</div>
                <div className="text-right">{ask.total.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bids */}
        <div>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 mb-2">
            <div>Price</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 text-sm hover:bg-green-50"
              >
                <div className="text-green-500">{bid.price.toFixed(4)}</div>
                <div className="text-right">{bid.amount.toFixed(4)}</div>
                <div className="text-right">{bid.total.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;