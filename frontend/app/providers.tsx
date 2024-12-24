'use client';

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'

import React from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';

// interface ProvidersProps {
//   children: React.ReactNode; // Type children as React.ReactNode
// }

const queryClient = new QueryClient();

export function Providers({ children }:  { children: React.ReactNode }){
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};