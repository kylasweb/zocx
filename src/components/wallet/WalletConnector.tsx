import React, { useState } from 'react';
import { Wallet, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  chainId: number;
}

interface WalletConnectorProps {
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
  walletInfo?: WalletInfo | null;
  loading: boolean;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  onConnect,
  onDisconnect,
  walletInfo,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkColor = (network: string) => {
    switch (network.toLowerCase()) {
      case 'ethereum':
        return 'bg-blue-100 text-blue-800';
      case 'binance':
        return 'bg-yellow-100 text-yellow-800';
      case 'polygon':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      {walletInfo ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {formatAddress(walletInfo.address)}
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}

      {isOpen && walletInfo && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">Connected Wallet</span>
              <button
                onClick={onDisconnect}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Disconnect
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500">Address</label>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-900">{formatAddress(walletInfo.address)}</span>
                  <button
                    onClick={handleCopyAddress}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500">Network</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  getNetworkColor(walletInfo.network)
                }`}>
                  {walletInfo.network}
                </span>
              </div>

              <div>
                <label className="block text-xs text-gray-500">Balance</label>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(parseFloat(walletInfo.balance))}
                </span>
              </div>

              <div className="pt-3 border-t">
                <a
                  href={`https://etherscan.io/address/${walletInfo.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  View on Explorer
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;