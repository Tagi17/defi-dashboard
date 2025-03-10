"use client";

import { debtTokenAbi, debtTokenAddress } from "../debtTokenUSDCContract";
import { useAccount, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

interface DebtTokenProps {
  assetAddress: string;
  decimals: number;
}

const GetDebtTokenUSDC: React.FC<DebtTokenProps> = ({
  assetAddress,
  decimals,
}) =>{
  const [borrowDebtAmt, setBorrowDebtAmt] = useState<string | null>(null);
  const { address: userAddress } = useAccount();

  const { data, isError } = useReadContract({
    address: assetAddress  as `0x${string}`,
    abi: debtTokenAbi,
    functionName: "balanceOf",
    args: [userAddress],
  });

    useEffect(() => {
        if (data) {
            if (data) {
                const formattedUSDC = formatUnits(data as bigint, 6);
                const roundedUSDC = parseFloat(formattedUSDC).toFixed(2);
                setBorrowDebtAmt(roundedUSDC);
            }
        } else if (isError) {
            console.log("Error getting balance", isError);
        } else {
            console.log('no data fetched, and no errors reported,');
            setBorrowDebtAmt;
        }
  }, [data, isError]);

  return (
    <span>USDC Borrow Balance: {borrowDebtAmt?.toString() || "Loading..."}</span>
  );
}
export default GetDebtTokenUSDC;