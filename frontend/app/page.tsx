import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div>
      <ConnectButton />
      </div>
      <div className="border-b-2 border-primary text-primary font-medium text-center py-4 text-5xl">
        Defi Dashboard Terminal
        <div className="text-2xl text-secondary py-2">Your Defi Interface</div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-8 text-primary font-medium text-2xl">
        <div className="flex flex-col items-center p-4">
          <div className="text-primary font-medium text-center py-4">Aave</div>
          <div className="w-full h-24 border-2 border-primary"></div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="text-primary font-medium text-center py-4">Compound</div>
          <div className="w-full h-24 border-2 border-primary"></div>
          <div>
            
          </div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="text-primary font-medium text-center py-4">Uniswap</div>
          <div className="w-full h-24 border-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
}
