// 'use client';

// import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
// import { createConfig, http } from 'wagmi'

// declare module 'wagmi' {
//     interface Register {
//       config: typeof config
//     }
//   }

// export const config = createConfig({
//   chains: [mainnet, sepolia, arbitrum],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//     [arbitrum.id]: http(),
//   },
// })