// import {
//   arbitrum,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from 'wagmi/chains';

// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
// import { http } from 'wagmi';

// export const config = getDefaultConfig({
//     appName: 'My RainbowKit App',
//     projectId: 'NEXT_PUBLIC_RAINBOW_KIT',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   transports: {
//       [mainnet.id]: http('https://polygon-mainnet.g.alchemy.com/v2/rfbxy-jkjqus_qmf4XiDDSfaMgCE2jmq')
//     },
//     ssr: true, // If your dApp uses server side rendering (SSR)
// });