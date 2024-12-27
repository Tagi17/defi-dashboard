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
import DisplayBalance from "./displayBalance";
import GetAaveWeth from "./getAaveWeth";
import GetBalance from "./getBalance";
// import CyberpunkTerminalWallet from './strategyDialog'
// import DepositModal from './depositModal'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WethArbDeposit from "./wethGatewaydeposit";

// import ProtocolSection from './protocolSection'

export default function Home() {
  return (
    <div>
      <div className="flex justify-end p-4 ">
        <ConnectButton />
      </div>
      <div className="border-b-2 border-primary text-primary font-medium text-center py-4 text-5xl">
        Defi Dashboard Terminal
        <div className="text-2xl text-secondary py-2">Your Defi Interface</div>
      </div>
      {/* <div className="grid grid-cols-3 gap-3 p-8 text-primary font-medium text-2xl min-h-screen">
        <div className="flex flex-col items-center p-4">
          <div className="text-primary font-medium text-center py-4">Aave</div>
          <div className="w-full shadow-sm border-2 rounded-md border-primary p-4">
            <div className="grid grid-rows-2 gap-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col space-y-2">
                  <div className="py-4 px-4 border p-4 rounded-md border-primary inline-block shadow  ">
                    ETH
                  </div>
                  <div className="py-4">Balance</div>
                  <div className="py-4">APY</div> 
                  <div className="py-4">
                    <DisplayBalance /> */}
      <div className="grid grid-cols-3 gap-6 p-8 bg-black text-primary">
        <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
          <div className="text-3xl font-semibold text-green-500 ">Aave</div>
          <div className="w-full p-6 shadow-lg rounded-md border border-green-500">
            <div className="flex justify-between items-start w-full space-x-4">
              <div className="flex flex-col space-y-2 text-lg">
                <button className="py-2 px-4 bg-green-500 text-xl text-white rounded-md shadow flex items-center hover:bg-green-600">
                  ETH{" "}
                  <svg
                    className="ml-2 w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10.707 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
                <div className="text-xl">Balance</div>
                <div className="text-xl">APY</div>

                <div>
                  <DisplayBalance />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="py-2 px-4 bg-green-500 text-xl text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">
                  Deposit
                </button>
                <button className="py-2 px-4 bg-green-500 text-xl text-white rounded-md shadow  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">
                  Borrow
                </button>
              </div>
              {/* <div className="">Switch Network</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="text-primary font-medium text-center py-4">
          Compound
        </div>
        <div className="w-full border-2 rounded-md border-primary p-4">
          <div>Additional content goes here</div>
        </div>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="text-primary font-medium text-center py-4">Uniswap</div>
        <div className="w-full border-2 rounded-md border-primary p-4">
          <div>Additional content goes here</div>
        </div>
      </div>
      <div></div>
      <div>{/* <GetAaveWeth/> */}</div>
      {/* <WethArbDeposit/> */}
    </div>
  );
}
