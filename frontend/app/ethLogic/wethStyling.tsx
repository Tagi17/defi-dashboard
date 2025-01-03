"use client";

import { useEffect, useState } from "react";

import DialogDepositPopup from "./dialogPopup";
import DisplayBalance from "./displayBalance";
import GetAaveWeth from "./getAaveWeth";
import GetApyData from "./getApyData"
import GetBorrow from "./borrow";
import GetUserDataCollat from "./getUserDataCollat"
import Image from "next/image";

//works for any token except eth
export default function WethArbDeposit() {
 const wethAddress = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1';

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserInput(event.target.value);
  // }; if you wanted the input to automatically trigger metamask with every input

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between flex-grow">
        <div className="flex ">
          <Image src="/ethlogo.png" width={90} height={80} alt="Eth Logo" />
          <div className="flex flex-col justify-center ">
            <h3 className="text-4xl font-bold text-green-500">ETH</h3>
            <DisplayBalance />
          </div>
        </div>
        <div className="text-lg">
          <GetApyData/>
        </div>
        <div className="text-green-600 text-lg ">
          <GetAaveWeth />
        </div>
        <div className="text-green-600 text-lg ">
          <GetBorrow asset={wethAddress}/>
        </div>
        <div className="flex justify-end py-4 px-4">
          <DialogDepositPopup/>
        </div>
        <div className="flex justify-end py-4 px-4">
          <GetUserDataCollat/>
        </div>
      </div>
    </div>
  );
}
