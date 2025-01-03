"use client";

import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import { formatUnits } from "viem/utils";

Chart.register(ArcElement, Tooltip, Legend);

export default function LoanVisualizer() {
const { address: userAddress } = useAccount();
  const [collateralAmount, setCollateralAmount] = useState<number>(0);
  const [ltv, setLtv] = useState<number>(0); 
  const [healthFactor, setHealthFactor] = useState<number>(0); 

  interface GetUserParameters{
    totalCollateralBase: BigInt
    availableBorrowBase: BigInt
    totalDebtBase: BigInt
    availableBorrowsBase: BigInt
    currentLiquidationThreshold: BigInt
    ltv: BigInt
    healthFactor: BigInt
  }
  
const getUserParameters: GetUserParameters = {
    
}
  async function UserData() {
     const { data, isError} = useReadContract({
        address: poolAddress as `0x${string}`,
        abi: poolAbi,
        functionName: "getUserAccountData",
        args: [userAddress],
    });


    useEffect(() => {
        if (data && !isError) {
            const { 
                totalCollateralBase,
                availableBorrowBase,
                totalDebtBase,
                availableBorrowsBase,
                currentLiquidationThreshold,
                ltv: loanToValue,
                healthFactor: hf,
              }  = data
            
        setCollateralAmount(parseFloat(formatUnits(totalCollateralBase, 18)));
        setLtv(parseFloat(formatUnits(loanToValue, 4)));
        setHealthFactor(parseFloat(formatUnits(hf, 18)));
    }
    }, [data, isError]);
}
  const borrowableAmount = (collateralAmount * ltv) / 100;
  const remainingCollateral = collateralAmount - borrowableAmount;

  const chartData = {
    labels: ["Borrowed Collateral", "Remaining Collateral"],
    datasets: [
      {
        data: [borrowableAmount, remainingCollateral],
        backgroundColor: ["#4CAF50", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Loan Visualizer</h2>

      {/* Pie Chart */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Borrowable vs. Remaining Collateral</h3>
        <Pie data={chartData} />
      </div>

      {/* LTV Progress Bar */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Loan-to-Value (LTV)</h3>
        <div className="w-full bg-gray-600 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${ltv}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">{ltv}%</p>
      </div>

      {/* Health Factor */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Health Factor</h3>
        <p
          className={`text-lg font-bold ${
            healthFactor > 2.5
              ? "text-green-500"
              : healthFactor > 1.5
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {healthFactor.toFixed(2)}
        </p>
        <p className="text-sm">
          {healthFactor > 2.5
            ? "Safe position"
            : healthFactor > 1.5
            ? "Moderate risk"
            : "High risk: close to liquidation"}
        </p>
      </div>

      <Button
        type="button"
        className="bg-green-500 text-black font-bold px-6"
        onClick={() => alert(`You can borrow up to ${borrowableAmount} ETH`)}
      >
        Confirm Borrow
      </Button>
    </div>
  );
}
