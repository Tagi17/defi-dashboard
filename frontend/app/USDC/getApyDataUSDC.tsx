"use client";

import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetApyDataUDSC() {

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
      args: ['0xaf88d065e77c8cC2239327C5EDb3A432268e5831'],
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
