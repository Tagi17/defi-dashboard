
"use client";

import { useEffect, useState } from "react";

import DialogDepositPopupUSDC from "./dialogPopupUSDC";
import DisplayBalanceUSDC from "./displayBalanceUSDC"
import GetAaveUSDC from "./getAaveUSDC"
import GetApyDataUDSC from "./getApyDataUSDC"
import GetBorrowUSDC from "./borrowUSDC"
import Image from "next/image";

//works for any token except eth
export default function USDCInfo() {
const usdcAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between flex-grow">
        <div className="flex ">
          <Image src="/usdc.png" width={45} height={50} alt="USDC Logo" className="mr-5"/>
          <div className="flex flex-col justify-center ">
            <h3 className="text-4xl font-bold text-green-500">USDC</h3>
            <DisplayBalanceUSDC/>
          </div>
        </div>
        <div className="text-lg">
        <GetApyDataUDSC/>
        </div>
        <div className="text-green-600 text-lg ">
       <GetAaveUSDC/>
        </div>
        <div className="text-green-600 text-lg ">
         <GetBorrowUSDC asset="0xaf88d065e77c8cC2239327C5EDb3A432268e5831" decimals={6}/>
        </div>
        <div className="flex justify-end py-4 px-4">
          <DialogDepositPopupUSDC/>
        </div>
      </div>
    </div>
  );
}
