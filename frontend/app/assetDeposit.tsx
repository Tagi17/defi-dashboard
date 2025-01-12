"use client";

import { DepositProvider, useDeposit } from "./depositContext";
import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useEffect, useState } from "react";

import DialogDepositPopup from "./depositPopup";
import DisplayBalance from "./displayBalance";
import GetAaveWeth from "./ethLogic/getAaveWeth";
import GetApyData from "./getApyData";
import GetBorrow from "./borrowButton";
import GetUserDataCollat from "./getUserDataCollat";
import Image from "next/image";
import { StringToBoolean } from "class-variance-authority/types";
import UseAaveOraclePrice from "./useAaveOraclePrice";

interface AssetDepositProps {
  name: string;
  address: string;
  poolAddress: string;
  poolAbi: any[];
  abi: any[];
  decimals: number;
  depositFunctionName: string;
  borrowFunctionName: string;
}

const AssetDeposit: React.FC<AssetDepositProps> = ({
  name,
  address,
  abi,
  decimals,
  depositFunctionName,
  borrowFunctionName,
}) => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between flex-grow">
        <div className="flex ">
          <div className="flex flex-col justify-center ">
            <h3 className="text-4xl font-bold text-green-500">{name}</h3>
            <DisplayBalance
              assetName={name}
              assetAddress={address}
              decimals={decimals}
              symbol={name}
              chainId={1}
            />
          </div>
        </div>
        <div className="text-lg">
          <GetApyData assetAddress={address} decimals={decimals} />
        </div>
        <div className="text-green-600 text-lg ">
          <GetAaveWeth />
        </div>
        <div className="text-green-600 text-lg ml-2">
          <DepositProvider>
            <GetBorrow
              assetName={name}
              assetAddress={address}
              poolAddress={poolAddress}
              poolAbi={poolAbi}
              assetAbi={abi}
              decimals={decimals}
              borrowFunctionName={borrowFunctionName}
            />
          </DepositProvider>
        </div>
        <div className="flex justify-end py-4 px-4">
          <DialogDepositPopup
            assetName={name}
            assetAddress={address}
            assetAbi={abi}
            decimals={decimals}
            depositFunctionName={depositFunctionName}
          />
        </div>
      </div>
    </div>
  );
};
export default AssetDeposit;
