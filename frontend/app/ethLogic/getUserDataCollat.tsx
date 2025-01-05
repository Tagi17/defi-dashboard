"use client";

import {DepositProvider, useDeposit} from "./depositContext"
import { aaveOracleAbi, aaveOracleAddress } from "./aaveOracleContractAbi";
import { poolAbi, poolAddress } from "../ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { formatUnits } from "viem/utils";
import { wethAddress } from "./wethAddress"

export default function GetUserDataCollat() {

  const { address: userAddress } = useAccount();
  const [userData, setUserData] = useState<UserAccountData | null>(null);
  const { depositAmount } = useDeposit();

  const [ethPrice, setEthPrice] = useState<string | undefined>();
  const [availableToBorrowETH, setAvailableToBorrowETH] = useState<string | undefined>();


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

  const { data: oracleData, isError: oracleIsError, isLoading: oracleIsLoading } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [wethAddress],
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
      setUserData(formattedData);

      console.log("data recieved in wei", data.toString());
      const priceFormattedEth = formatUnits(data as bigint, 8);
      const roundedEth = parseFloat(priceFormattedEth).toFixed(2);
      setEthPrice(`${roundedEth}`);
      
    } else if (isError) {
      console.error("Error fetching user data from contract", isError);
    }
    else {
      console.log("user not connected or no data to fetch");
    }
  }, [data, isError]);

  useEffect(() => {
    if (userData && ethPrice) {
      const price = parseFloat(ethPrice);
      const availableToBorrowEth = Number(userData.availableBorrowsBase) / (price);
      setAvailableToBorrowETH(availableToBorrowEth.toFixed(2));
      console.log(`Available to borrow in ETH: ${availableToBorrowEth}`);
    }
  }, [userData, ethPrice]);
  
  const availableBorrows = userData?.availableBorrowsBase !== undefined
  ? formatUnits(userData.availableBorrowsBase, 18)
    : 'Loading...';
    console.log("Available borrows:", availableBorrows);

  const depositAmountDisplay = depositAmount ? depositAmount.toString() : '0';
  console.log("Current deposit amount in GetUserDataCollat:", depositAmount.toString());

  console.log(userData?.availableBorrowsBase);
  
  // get the amount of eth that you can borrow
  // getUserData.availableBorrowsBase / current price of eth
  // const availableToBorrowUSD = userData?.availableBorrowsBase  || null;
  // const availableToBorrowETH = availableToBorrowUSD / BigInt(ethPrice);

  
  
  // 800 / 1000
  // 0.8 eth

  return (
    <div>
            <br />
          <div>Available to Borrow: {userData ? `${availableToBorrowETH} ETH`: 'Loading...'}</div>
          {/* <div>Deposit Amount: {depositAmount.toString()} ETH</div> */}
           {/* <div>Health Factor: {userData ? userData.healthFactor.toString() : 'N/A'}</div> */}
      </div>
  );
}