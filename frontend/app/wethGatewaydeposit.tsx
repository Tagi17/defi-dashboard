'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useEffect, useState } from 'react';
import { wethArbGatewayAddress, wethGatewayAbi } from './wethGatewayAbi'

import { useWriteContract, } from 'wagmi'

//works for any token except eth
export default function WethArbDeposit() {
    const [userInput, setUserInput] = useState("1")
    const [userInputinWei, setUserInputinWei] = useState(BigInt(10 ** 18));
    const { address: userAddress } = useAccount();
    
    
    const { writeContractAsync } = useWriteContract();
    const wethGatewayAddress = wethArbGatewayAddress
    
    useEffect(() => {
        const weiValue = BigInt(Math.floor(Number(userInput) * 10 ** 18));
        setUserInputinWei(weiValue);
    }, [userInput]); 
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
      };

    async function handleAaveArbDeposit() {
        try {
            const result = await writeContractAsync({
                address: wethGatewayAddress as `0x${string}`,
                abi: wethGatewayAbi,
                functionName: "depositETH",
                args: [userAddress, userAddress, 0],
                value: userInputinWei
            });
        }
        catch(error) { 
            console.log(error)
        }
    }

  return (
    <div>
      <input
        type="text"
        className=""
        value={userInput}
        onChange={handleInputChange}
          />
        <button
              className="bg-green-500 px-6 py-3 font-genos hover:bg-green-600 rounded-md"
              onClick={handleAaveArbDeposit}
          >
        </button>
    </div>
  )
}
