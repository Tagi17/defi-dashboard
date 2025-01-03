'use client'

import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetUserDataCollat() {

    const { address: userAddress } = useAccount();

    interface UserAccountData {
        totalCollateralBase: bigint;
        totalDebtBase: bigint;
        availableBorrowsBase: bigint;
        currentLiquidationThreshold: bigint;
        ltv: bigint;
        healthFactor: bigint;
      }
    const { data, isError} = useReadContract({
        address: poolAddress as `0x${string}`,
        abi: poolAbi,
        functionName: "getUserAccountData",
        args: [userAddress]
    });

    const userData = data as unknown as UserAccountData;
    
    const availableBorrowsBase = userData?.availableBorrowsBase || BigInt(0);

    console.log("available amount", availableBorrowsBase)
    return (
        <div>
           <p> {formatUnits(availableBorrowsBase, 18)} ETH</p>

        </div>
    )
}