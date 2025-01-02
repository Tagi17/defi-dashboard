"use client";

import { poolAbi, poolAddress } from "./poolContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetApyData() {

  const [supplyApy, setSupplyApy] = useState<number | null>(null);
  
  interface ReserveData {
    currentLiquidityRate: bigint;
  }

    const { data, isError } = useReadContract({
      address: poolAddress as `0x${string}`,
      abi: poolAbi,
      functionName: "getReserveData",

    });
    useEffect(() => {
      if (data && !isError) {
        try {
          const currentLiquidityRateRay = data.currentLiquidityRate;
  
          const currentLiquidityRatePercentage = parseFloat(
            formatUnits(currentLiquidityRateRay, 27)
          ) * 100;
  
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
        {supplyApy}
      </div>
    );
}
