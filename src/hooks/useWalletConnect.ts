import { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  chainId: number;
}

export const useWalletConnect = () => {
  const [provider, setProvider] = useState<WalletConnectProvider | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          1: 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
          56: 'https://bsc-dataseed.binance.org',
          137: 'https://polygon-rpc.com',
        },
        chainId: 1,
      });

      setProvider(provider);
      const web3 = new Web3(provider as any);
      setWeb3(web3);

      return { provider, web3 };
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const updateWalletInfo = async (web3: Web3, address: string) => {
    try {
      const balance = await web3.eth.getBalance(address);
      const chainId = await web3.eth.getChainId();
      const network = getNetworkName(chainId);

      setWalletInfo({
        address,
        balance: web3.utils.fromWei(balance, 'ether'),
        network,
        chainId,
      });
    } catch (err) {
      console.error('Error updating wallet info:', err);
    }
  };

  const connect = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await initialize();
      if (!result) throw new Error('Failed to initialize provider');

      const { provider, web3 } = result;
      await provider.enable();

      const accounts = await web3.eth.getAccounts();
      if (!accounts[0]) throw new Error('No accounts found');

      await updateWalletInfo(web3, accounts[0]);

      // Subscribe to accounts change
      provider.on('accountsChanged', async (accounts: string[]) => {
        if (accounts[0] && web3) {
          await updateWalletInfo(web3, accounts[0]);
        } else {
          disconnect();
        }
      });

      // Subscribe to chainId change
      provider.on('chainChanged', async (chainId: number) => {
        if (walletInfo?.address && web3) {
          await updateWalletInfo(web3, walletInfo.address);
        }
      });

      // Subscribe to session disconnection
      provider.on('disconnect', () => {
        disconnect();
      });

    } catch (err) {
      setError((err as Error).message);
      disconnect();
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    if (provider) {
      provider.disconnect();
    }
    setProvider(null);
    setWeb3(null);
    setWalletInfo(null);
    setError(null);
  };

  const getNetworkName = (chainId: number): string => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 56:
        return 'Binance';
      case 137:
        return 'Polygon';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    return () => {
      if (provider) {
        provider.disconnect();
      }
    };
  }, [provider]);

  return {
    connect,
    disconnect,
    walletInfo,
    loading,
    error,
    web3,
  };
};