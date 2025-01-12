"use client";

import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";

import AssetDeposit from "./assetDeposit";
import { DepositProvider } from "./depositContext";
import DialogDepositPopup from "./depositPopup";
import DisplayBalance from "./displayBalance";
import GetApyData from "./getApyData";
import GetBorrow from "./borrowButton";
import Image from "next/image";

interface AssetCardProps {
  name: string;
  logoSrc: string;
  address: string;
  poolAddress: string;
  poolAbi: any[];
  abi: any[];
  decimals: number;
  depositFunctionName: string;
  borrowFunctionName: string;
}

const AssetCard: React.FC<AssetCardProps> = ({
  name,
  logoSrc,
  address,
  abi,
  decimals,
  depositFunctionName,
  borrowFunctionName,
}) => {
  return (
    <div className="flex flex-row items-center justify-between flex-grow py-4">
      <div className="flex">
        <Image src={logoSrc} width={90} height={80} alt={`${name} Logo`} />
      </div>
      <div className="text-lg">
      </div>
      <div className="text-green-600 text-lg ml-2">
          <AssetDeposit
        name={name}
        address={address}
        poolAddress={poolAddress}
        poolAbi={poolAbi}
        abi={abi}
        decimals={decimals}
        depositFunctionName={depositFunctionName}
        borrowFunctionName={borrowFunctionName}
      />
      </div>
    </div>
  );
};

export default AssetCard;
