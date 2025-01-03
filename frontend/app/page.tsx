import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DisplayBalance from "./ethLogic/displayBalance";
import GetAaveWeth from "./ethLogic/getAaveWeth";
import GetBalance from "./getBalance";
// import CyberpunkTerminalWallet from './strategyDialog'
// import DepositModal from './depositModal'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import USDCInfo from "./USDC/usdcInfo";
import WethArbDeposit from "./ethLogic/wethStyling";

// import ProtocolSection from './protocolSection'

export default function Home() {
  return (
    <div>
      <div className="flex justify-end p-4">
        <ConnectButton />
      </div>
      <div className="border-b-2 border-primary text-primary font-medium text-center py-4 text-5xl">
        Defi Dashboard Terminal
        <div className="text-2xl text-secondary py-2">Your Defi Interface</div>
      </div>
      <div className="grid grid-cols-1 gap-6 p-8 bg-black text-primary">
        <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
          <div className="w-full max-w-4xl mx-auto">
          </div>
          <div className="flex flex-row">
            <div className="mr-24">Asset</div>
            <div className="mr-24">Deposit APY</div>
            <div className="mr-24">Current Deposit</div>
            <div className="mr-24">Current Collateral</div>
          </div>
          <div className="w-full bg-black p-6 rounded-md border border-green-500 max-w-5xl mx-auto">
            <WethArbDeposit />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
          <div className="w-full max-w-5xl mx-auto">
            {/* <h2 className="text-4xl font-semibold text-green-500 mb-4 text-center  border-primary">
              Aave
            </h2> */}
          </div>
          <div className="w-full max-w-4xl mx-auto">
          </div>
          <div className="flex flex-row">
            <div className="mr-24">Asset</div>
            <div className="mr-24">Deposit APY</div>
            <div className="mr-24">Current Deposit</div>
            <div className="mr-24">Current Collateral</div>
          </div>
          <div className="w-full bg-black p-6 rounded-md border border-primary max-w-5xl mx-auto">
            <USDCInfo/>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-4xl font-semibold text-green-500 mb-4 text-center border-b-2 border-primary pb-2">
              Uniswap
            </h2>
          </div>
          <div className="w-full bg-black p-6 rounded-md border border-primary max-w-5xl mx-auto">
            <div>Additional content goes here</div>
          </div>
        </div>
      </div>
    </div>
  );
}
