"use client";

import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";
import { wethAddress } from "./ethLogic/wethAddress";

interface GetApyDataProps {
  assetAddress: string;
  decimals: number;
}
const GetApyData: React.FC<GetApyDataProps> = ({ assetAddress, decimals }) => {
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
    args: [assetAddress],
  });

  useEffect(() => {
    if (data && !isError) {
      try {
        const reserveData = data as unknown as ReserveData;
        const currentLiquidityRate = reserveData.currentLiquidityRate;

        const currentLiquidityRatePercentage =
          Math.round(
            parseFloat(formatUnits(currentLiquidityRate, 27)) * 100 * 100
          ) / 100;

        setSupplyApy(currentLiquidityRatePercentage);
      } catch (error) {
        console.error("Error calculating APY:", error);
      }
    } 
  }, [data, isError]);

  return <div>{supplyApy}%</div>;
};
export default GetApyData;
