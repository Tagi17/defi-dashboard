// import { Button } from '@/components/ui/button'

// interface Strategy{
//     name: string;
//     balance: string;
//     apy: string;
// }
// interface ProtocolSectionProps {
//     protocol: string;
//     strategies: Strategy[];
//     onDeposit: (strategy: Strategy) => void;
//   }
// export default function ProtocolSection({ protocol, strategies, onDeposit, }: ProtocolSectionProps) {
//     return (
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold border-b border-primary text-primary pb-2">{protocol}</h2>
//         <div className="space-y-2">
//           {strategies.map((strategy) => (
//             <div key={strategy.name} className="border border-primary p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-xl font-semibold text-primary">{strategy.name}</h3>
//                 <Button
//                   onClick={() => onDeposit(strategy)}
//                   className="bg-primary hover:bg-secondary text-black"
//                 >
//                   {'> DEPOSIT'}
//                 </Button>
//               </div>
//               <p className="text-secondary">Balance: {strategy.balance}</p>
//               <p className="text-secondary">APY: {strategy.apy}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }