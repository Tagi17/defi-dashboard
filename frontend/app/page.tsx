import { DepositProvider, useDeposit } from "./depositContext";
import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";

import AssetCard from "./AssetCardProps";
import AssetDeposit from "./assetDeposit";
import { AssetInfo } from "./assetInfo";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TestUSDC from "./testUSDCPrice";
import USDCInfo from "./USDC/usdcInfo";

export default function Home() {
  return (
    <div>
      <DepositProvider>
        <div className="flex justify-end p-4">
          <ConnectButton />
        </div>
        <div className="border-b-2 border-primary text-primary font-medium text-center py-4 text-5xl">
          Defi Dashboard Terminal
          <div className="text-2xl text-secondary py-2">
            Your Defi Interface
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 p-8 bg-black text-primary">
          <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
            <div className="w-full max-w-4xl mx-auto"></div>
            <div className="flex flex-row">
              <div className="mr-24">Asset</div>
              <div className="mr-24">Deposit APY</div>
              <div className="mr-24">Current Deposit</div>
              <div className="mr-24">Current Collateral</div>
            </div>
            {/* console.log("Starting AssetList rendering..."); */}
            {AssetInfo.map((asset) => (
              <div
                key={asset.address}
                className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg"
              >
                  {/* console.log("Asset Name:", asset.name, "Asset Address:", asset.address); */}
                <div className="w-full max-w-5xl mx-auto"></div>
                <div className="w-full max-w-4xl mx-auto"></div>
                <div className="w-full bg-black p-6 rounded-md border border-primary max-w-5xl mx-auto">
                  <AssetCard
                    name={asset.name}
                    logoSrc={asset.logoSrc}
                    address={asset.address}
                    poolAddress={poolAddress}
                    poolAbi={poolAbi}
                    abi={asset.abi}
                    decimals={asset.decimals}
                    depositFunctionName={asset.depositFunctionName}
                    borrowFunctionName={asset.borrowFunctionName}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-4 bg-black p-6 shadow rounded-lg ">
            <div className="w-full max-w-5xl mx-auto"></div>
            <div className="w-full max-w-4xl mx-auto"></div>
            <div className="w-full bg-black p-6 rounded-md border border-primary max-w-5xl mx-auto">
              <USDCInfo />
            </div>
          </div>
        </div>
      </DepositProvider>
    </div>
  );
}
