'use client';

import { useAaveOraclePrice } from "./aavePriceOracle";

export default function TestUSDC() {
  const usdcAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
  const usdcPrice = useAaveOraclePrice(usdcAddress);

  return (
    <div>
      USDC Price: {usdcPrice ? `$${usdcPrice}` : "Loading..."}
    </div>
  );
}
