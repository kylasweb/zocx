import React, { useState } from 'react';

const ROICalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState(30);

  const calculateReturns = () => {
    const dailyROI = 1.85; // Base ROI percentage
    return amount * (dailyROI / 100) * duration;
  };

  return (
    <div className="p-6 bg-indigo-50 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">AI Investment Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Investment Amount ($)</label>
          <input
            type="range"
            min="100"
            max="10000"
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="w-full"
          />
          <div className="text-center">${amount}</div>
        </div>
        
        <div>
          <label className="block mb-2">Duration (Days)</label>
          <div className="flex gap-2">
            {[7, 15, 30, 60].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded ${duration === d ? 'bg-indigo-600 text-white' : 'bg-white'}`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg text-center">
          <h4 className="font-bold text-lg">Projected Returns</h4>
          <div className="text-2xl text-green-600">
            ${calculateReturns().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}; 