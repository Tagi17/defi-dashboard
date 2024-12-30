'use client';

import { Chain, RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'

import React from 'react';

const ArbFork = {
  id: 56007,
  name: 'ArbitrumFork',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://virtual.arbitrum.rpc.tenderly.co/20399f68-2053-4590-879e-6df01a48a5e7'] },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'NEXT_PUBLIC_RAINBOW_KIT',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, ArbFork],
  transports: {
    [mainnet.id]: http('https://arb-mainnet.g.alchemy.com/v2/oKfImgjXE-YSOWwHOmTYcRzxTkPzJ2g2'),
    [ArbFork.id]: http('https://virtual.arbitrum.rpc.tenderly.co/20399f68-2053-4590-879e-6df01a48a5e7')
    },
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }){
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};