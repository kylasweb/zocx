import React, { useState } from 'react';
import { 
  LineChart, 
  CandlestickChart, 
  Wallet, 
  Lock, 
  ArrowUpDown, 
  Settings,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useTradingStore } from '../../store/admin/tradingStore';
import TradingChart from '../../components/trading/TradingChart';
import OrderBook from '../../components/trading/OrderBook';
import StakingConfig from '../../components/trading/StakingConfig';

const TradingManager: React.FC = () => {
  const {
    tradingPairs,
    stakingPools,
    addTradingPair,
    removeTradingPair,
    updateStakingPool,
    loading,
  } = useTradingStore();

  const [activeTab, setActiveTab] = useState<'trading' | 'staking' | 'settings'>('trading');
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  const [newPair, setNewPair] = useState({
    baseToken: '',
    quoteToken: '',
    minTradeAmount: 0,
    maxTradeAmount: 0,
    tradingFee: 0.1,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Trading Management</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'trading', label: 'Trading Pairs', icon: CandlestickChart },
            { id: 'staking', label: 'Staking Pools', icon: Lock },
            { id: 'settings', label: 'Exchange Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <tab.icon className={`
                -ml-0.5 mr-2 h-5 w-5
                ${activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Trading Pairs */}
      {activeTab === 'trading' && (
        <div className="space-y-6">
          {/* Add New Trading Pair */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add Trading Pair</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Base Token</label>
                  <input
                    type="text"
                    value={newPair.baseToken}
                    onChange={(e) => setNewPair({ ...newPair, baseToken: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ZOC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quote Token</label>
                  <input
                    type="text"
                    value={newPair.quoteToken}
                    onChange={(e) => setNewPair({ ...newPair, quoteToken: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="USDT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Trading Fee (%)</label>
                  <input
                    type="number"
                    value={newPair.tradingFee}
                    onChange={(e) => setNewPair({ ...newPair, tradingFee: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Trade Amount</label>
                  <input
                    type="number"
                    value={newPair.minTradeAmount}
                    onChange={(e) => setNewPair({ ...newPair, minTradeAmount: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Trade Amount</label>
                  <input
                    type="number"
                    value={newPair.maxTradeAmount}
                    onChange={(e) => setNewPair({ ...newPair, maxTradeAmount: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      addTradingPair({
                        ...newPair,
                        id: `${newPair.baseToken}-${newPair.quoteToken}`,
                        status: 'active',
                        lastPrice: 0,
                        volume24h: 0,
                        change24h: 0,
                      });
                      setNewPair({
                        baseToken: '',
                        quoteToken: '',
                        minTradeAmount: 0,
                        maxTradeAmount: 0,
                        tradingFee: 0.1,
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pair
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Pairs List */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Active Trading Pairs</h3>
              <div className="space-y-4">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {pair.baseToken}/{pair.quoteToken}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Fee: {pair.tradingFee}% | Min: {pair.minTradeAmount} | Max: {pair.maxTradeAmount}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            Last Price: ${pair.lastPrice.toFixed(4)}
                          </p>
                          <p className={`text-sm ${
                            pair.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {pair.change24h >= 0 ? '+' : ''}{pair.change24h}%
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedPair(pair.id)}
                          className="p-2 text-gray-400 hover:text-gray-500"
                        >
                          <LineChart className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => removeTradingPair(pair.id)}
                          className="p-2 text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Chart Modal */}
          {selectedPair && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedPair} Chart
                    </h2>
                    <button
                      onClick={() => setSelectedPair(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <TradingChart pair={selectedPair} />
                  <OrderBook pair={selectedPair} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Staking Pools */}
      {activeTab === 'staking' && (
        <div className="space-y-6">
          <StakingConfig
            pools={stakingPools}
            onUpdatePool={updateStakingPool}
          />
        </div>
      )}

      {/* Exchange Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Exchange Configuration</h3>
              {/* Add exchange settings form */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingManager;