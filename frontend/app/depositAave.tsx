import {erc20Abi} from './ethLogic/abi'
import { useWriteContract, } from 'wagmi'

//works for any token except eth
function App() {
    const { writeContractAsync } = useWriteContract();
    const poolContractAddress = "0x794a61358D6845594F94dc1DB02A252b5b4814aD"
    
    async function handleDeposit() {
        try {
            const result = await writeContractAsync({
                address: poolContractAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: "transmute",
                args: [],
            });
        }
        catch(error) { 
            
        }
    }

  return (
    <div>

    </div>
  )
}
