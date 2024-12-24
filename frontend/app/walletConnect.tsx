'use client';

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'

import { WagmiProvider } from 'wagmi';

interface ProvidersProps {
  children: React.ReactNode; // Type children as React.ReactNode
}

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'NEXT_PUBLIC_RAINBOW_KIT',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps){
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};