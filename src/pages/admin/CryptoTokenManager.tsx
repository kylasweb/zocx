import React, { useState } from 'react';
import { Coins, Droplet, Gift, History, Settings, Plus, Trash2, RefreshCw } from 'lucide-react';
import { useCryptoStore } from '../../store/admin/cryptoStore';

const CryptoTokenManager: React.FC = () => {
  const {
    tokenConfig,
    faucetConfig,
    airdropConfig,
    updateTokenConfig,
    updateFaucetConfig,
    updateAirdropConfig,
    loading,
  } = useCryptoStore();

  const [activeTab, setActiveTab] = useState<'token' | 'faucet' | 'airdrop'>('token');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Crypto Token Management</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'token', label: 'Token Settings', icon: Coins },
            { id: 'faucet', label: 'Faucet Manager', icon: Droplet },
            { id: 'airdrop', label: 'Airdrop Manager', icon: Gift },
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

      {/* Token Settings */}
      {activeTab === 'token' && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Token Configuration</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Token Name</label>
                <input
                  type="text"
                  value={tokenConfig.name}
                  onChange={(e) => updateTokenConfig({ name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Token Symbol</label>
                <input
                  type="text"
                  value={tokenConfig.symbol}
                  onChange={(e) => updateTokenConfig({ symbol: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Supply</label>
                <input
                  type="number"
                  value={tokenConfig.totalSupply}
                  onChange={(e) => updateTokenConfig({ totalSupply: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Decimals</label>
                <input
                  type="number"
                  value={tokenConfig.decimals}
                  onChange={(e) => updateTokenConfig({ decimals: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faucet Manager */}
      {activeTab === 'faucet' && (
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Faucet Settings</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Claim Amount</label>
                  <input
                    type="number"
                    value={faucetConfig.claimAmount}
                    onChange={(e) => updateFaucetConfig({ claimAmount: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cooldown Period (hours)</label>
                  <input
                    type="number"
                    value={faucetConfig.cooldownPeriod}
                    onChange={(e) => updateFaucetConfig({ cooldownPeriod: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={faucetConfig.enabled}
                        onChange={(e) => updateFaucetConfig({ enabled: e.target.checked })}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700">Enable Faucet</label>
                      <p className="text-gray-500">Allow users to claim tokens from the faucet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Claims</h3>
              <div className="mt-6">
                {/* Claims list would go here */}
                <div className="text-center text-gray-500 py-8">
                  No recent claims
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Airdrop Manager */}
      {activeTab === 'airdrop' && (
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Active Airdrops</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Airdrop
                </button>
              </div>

              <div className="space-y-4">
                {airdropConfig.campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-500">{campaign.description}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="block font-medium text-gray-700">Total Amount</span>
                        {campaign.totalAmount} {tokenConfig.symbol}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-700">Claimed</span>
                        {campaign.claimedAmount} {tokenConfig.symbol}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-700">Participants</span>
                        {campaign.participants.length}
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Requirements</h5>
                      <ul className="space-y-2">
                        {campaign.requirements.map((req, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTokenManager;