"use client";

import {DepositProvider, useDeposit} from "./depositContext"
import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";

export default function GetUserDataCollat() {

  const { address: userAddress } = useAccount();
  const [userData, setUserData] = useState<UserAccountData | null>(null);
  const { depositAmount } = useDeposit();
  console.log("Current deposit amount in GetUserDataCollat:", depositAmount.toString());
  type UserAccountDataRaw = [bigint, bigint, bigint, bigint, bigint, bigint];
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
    
    console.log("Fetching user data:", data);
    if (data) {
      console.log("Contract data received:", data);
      const rawData = data as UserAccountDataRaw; // Assert to the expected data type
      const formattedData: UserAccountData = {
        totalCollateralBase: rawData[0],
        totalDebtBase: rawData[1],
        availableBorrowsBase: rawData[2],
        currentLiquidationThreshold: rawData[3],
        ltv: rawData[4],
        healthFactor: rawData[5],
      };
      // setUserData(data as formattedData);
      setUserData(formattedData);
    } else if (isError) {
      console.error("Error fetching user data from contract", isError);
    }
    else {
      console.log("user not connected or no data to fetch");
    }
  }, [data, isError]);
  
  const availableBorrows = userData?.availableBorrowsBase !== undefined
  ? formatUnits(userData.availableBorrowsBase, 18)
    : 'Loading...';
    console.log("Available borrows:", availableBorrows);

  const depositAmountDisplay = depositAmount ? depositAmount.toString() : '0';
  console.log(userData?.availableBorrowsBase);


  console.log("Current user data state in GetUserDataCollat:", userData);

  return (
    <div>
     
          {/* Available to Borrow: {availableBorrows} */}
            <br />
          {/* Deposit Amount: {depositAmountDisplay} ETH */}
          {/* <div>Available to Borrow: {userData ? formatUnits(userData.availableBorrowsBase, 18) : 'Loading...'}</div> */}
          <div>Available to Borrow: {userData ? (userData.availableBorrowsBase / BigInt(10 ** 9)).toString() : 'Loading...'}</div>
          <div>Deposit Amount: {depositAmount.toString()} ETH</div>
          <div>Health Factor: {userData ? userData.healthFactor.toString() : 'N/A'}</div>
      </div>
  );
}