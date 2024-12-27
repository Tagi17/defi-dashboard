// 'use client'

// import DepositModal from './depositModal'
// import ProtocolSection from './protocolSection'
// import { useState } from 'react';

// const availableCryptos = ['ETH', 'USDC', 'DAI', 'WBTC'];

// interface Strategy {
//     name: string;
//     apy: string;
//     balance: string;
// }

// export default function CyberpunkTerminalWallet() {
//     const [isSignedIn, setIsSignedIn] = useState(false)
//     const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
//     const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  
//     const handleOpenDepositModal = (strategy: Strategy) => {
//         setSelectedStrategy(strategy);
//         setIsDepositModalOpen(true);
//     }
  
//     const handleCloseDepositModal = () => {
//         setIsDepositModalOpen(false);
//         setSelectedStrategy(null);
//     }
  
//     const protocols = [
//         {
//             name: 'AAVE',
//             strategies: [
//                 { name: 'ETH Deposit', balance: '5.23', apy: '3.2%' },
//                 { name: 'USDC Deposit', balance: '1000.00', apy: '8.5%' },
//             ],
//         },
//         {
//             name: 'Compound',
//             strategies: [
//                 { name: 'DAI Lending', balance: '2500.00', apy: '5.7%' },
//                 { name: 'WBTC Deposit', balance: '0.15', apy: '2.1%' },
//             ],
//         },
//         {
//             name: 'Uniswap',
//             strategies: [
//                 { name: 'ETH-USDC LP', balance: '10000.00', apy: '15.3%' },
//                 { name: 'ETH-DAI LP', balance: '5000.00', apy: '12.8%' },
//             ],
//         },
//     ]
//     return (
//         <div>
//         <div className="max-w-4xl mx-auto">
//           <div className="space-y-8">
//             {protocols.map((protocol) => (
//               <ProtocolSection
//                 key={protocol.name}
//                 protocol={protocol.name}
//                 strategies={protocol.strategies}
//                 onDeposit={handleOpenDepositModal}
//               />
//             ))}
//           </div>
//       </div>

//       <DepositModal
//         isOpen={isDepositModalOpen}
//         onClose={handleCloseDepositModal}
//         strategy={selectedStrategy}
//       />
//     </div>
//     )
// }