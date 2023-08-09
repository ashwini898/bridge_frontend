import React from "react";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';

const AVAXChainTestnet = {
  id: 43113,
  name: "Avalanche",
  network: "Avalanche",
  iconUrl: "https://cryptologos.cc/logos/versions/ethereum-eth-logo-animated.gif?v=024",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: 'https://api.avax-test.network/ext/bc/C/rpc',
      
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
};

const PolygonTestnet = {
    id: 80001,
    name: "Mumbai",
    network: "Polygon Testnet",
    iconUrl: "https://cryptologos.cc/logos/versions/ethereum-eth-logo-animated.gif?v=024",
    iconBackground: "#fff",
    nativeCurrency: {
      decimals: 18,
      name: "Mumbai",
      symbol: "MATIC",
    },
    rpcUrls: {
      default: 'https://polygon-mumbai.g.alchemy.com/v2/GuYTGJJ7aZmdEiwTFVUNezcslLTlgg6M',
        
    },
    blockExplorers: {
      default: { name: 'polygonscan', url: 'https://mumbai.polygonscan.com/' },
      etherscan: { name: 'polygonscan', url: 'https://mumbai.polygonscan.com/' },
    },
    testnet: false,
  };  

const { provider, chains } = configureChains(
  [AVAXChainTestnet, PolygonTestnet],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default  }) })]
);

let { connectors } = getDefaultWallets({
  appName: "bridge-demo",
  chains,
});
connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [metaMaskWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function RainbowKit({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}