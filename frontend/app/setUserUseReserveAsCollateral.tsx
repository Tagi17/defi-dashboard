import { poolAbi, poolAddress } from "./ethLogic/poolContractAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

interface SetUserReserveCollatProps {
  assetAddress: string;
  // useAsCollateral: boolean;
  initialUseAsCollateral: boolean;
}

const SetUserUseReserveAsCollateral: React.FC<SetUserReserveCollatProps> = ({
  assetAddress,
  initialUseAsCollateral = false,
}) => {
  const { address: userAddress } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [useAsCollateral, setUseAsCollteral] = useState(initialUseAsCollateral);
//how to use useState to set the switch as true or false 
    async function enableCollateral() {
        const result = await writeContractAsync({
            address: poolAddress,
            abi: poolAbi,
            functionName: "setUserUseReserveAsCollateral",
            args: [assetAddress, useAsCollateral],
        });
    }



  return <div></div>;
};
export default SetUserUseReserveAsCollateral;
