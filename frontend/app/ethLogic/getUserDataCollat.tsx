"use client";

import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";
import {useDeposit} from "./depositContext"

export default function GetUserDataCollat() {
  const { address: userAddress } = useAccount();
  const [userData, setUserData] = useState<UserAccountData | null>(null);
  const { depositAmount } = useDeposit();
  
  interface UserAccountData {
    totalCollateralBase: bigint;
    totalDebtBase: bigint;
    availableBorrowsBase: bigint;
    currentLiquidationThreshold: bigint;
    ltv: bigint;
    healthFactor: bigint;
  }
  const { data, isError } = useReadContract({
    address: poolAddress as `0x${string}`,
    abi: poolAbi,
    functionName: "getUserAccountData",
    args: [userAddress],
  });

  useEffect(() => {
    if (data) {
      setUserData(data as UserAccountData);
    }
  }, [data]);
  
  const availableBorrows = userData?.availableBorrowsBase !== undefined
  ? formatUnits(userData.availableBorrowsBase, 18)
  : 'Loading...';


  const depositAmountDisplay = depositAmount ? depositAmount.toString() : '0';
  console.log(userData?.availableBorrowsBase);

  return (
      <div>
         Available to Borrow: {availableBorrows}
          <br />
          Deposit Amount: {depositAmountDisplay } ETH
      </div>
  );
}