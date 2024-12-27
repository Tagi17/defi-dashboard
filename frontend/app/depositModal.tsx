// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// interface Strategy{
//     name: string;
//     balance: string;
//     apy: string;
// }

// interface DepositModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     strategy: Strategy | null;
// }
// export default function depositModal({
//   isOpen,
//   onClose,
//   strategy,
// }: DepositModalProps) {
//     if (!strategy) return null;
//   const [amount, setAmount] = useState("");

//   const handleDeposit = () => {
//     console.log(`Deposit ${amount} into ${strategy.name}`);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-black border border-primary text-primary">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">
//             Deposit into {strategy.name}
//           </DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <p className="text-secondary">Current Balance: {strategy.balance}</p>
//           <p className="text-secondary">APY: {strategy.apy}</p>
//           <Input
//             type="number"
//             placeholder="Enter deposit amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full bg-black border-primary text-primary placeholder-primary"
//           />
//         </div>
//         <DialogFooter>
//           <Button
//             onClick={onClose}
//             variant="outline"
//             className="border-primary text-secondary"
//           >
//             {"> CANCEL"}
//           </Button>
//           <Button
//             onClick={handleDeposit}
//             className="bg-primary hover:bg-secondary text-black"
//           >
//             {"> CONFIRM"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
