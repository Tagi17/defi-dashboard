"use client";

import { poolAbi, poolAddress } from "./poolContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetApyData() {

  const [supplyApy, setSupplyApy] = useState<number | null>(null);
  
  interface ReserveData {
    configuration: {
      data: bigint; 
    };
    liquidityIndex: bigint;
    currentLiquidityRate: bigint;
    variableBorrowIndex: bigint;
  }

    const { data, isError } = useReadContract({
      address: poolAddress as `0x${string}`,
      abi: poolAbi,
      functionName: "getReserveData",
      args: ['0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'],
    });
    
    useEffect(() => {
      if (data && !isError) {
        try {
          const reserveData = data as unknown as ReserveData;
          const currentLiquidityRate = reserveData.currentLiquidityRate;
  
          const currentLiquidityRatePercentage = 
          Math.round(parseFloat(formatUnits(currentLiquidityRate, 27)) * 100 * 100) / 100;
         
  
          setSupplyApy(currentLiquidityRatePercentage);
        } catch (error) {
          console.error("Error calculating APY:", error);
        }
      } else if (isError) {
        console.error("Error fetching reserve data");
      }
    }, [data, isError]);
    
    return (
      <div>
        {supplyApy}%
      </div>
    );
}
