

export const fetchTokenPrice = async (): Promise<string> => {
    const tokenPriceBaseUrl = 'https://api.odos.xyz/pricing/token';

    const chainId = 1; // the chain id the token/asset is from
    const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // the checksummed address of the token/asset to get a price for
    const currencyId = 'USD';

    const queryParams = new URLSearchParams({ currencyId })
   
    const response = await fetch(`${tokenPriceBaseUrl}/${chainId}/${tokenAddress}?${queryParams}`);

    if (response.status === 200) {
       const { price } = await response.json();
       return price.toString();
    } else {
    console.error('Error in Transaction Assembly:', response);
    throw new Error('Failed to fetch token price');
    // handle token price failure cases
    }
};
fetchTokenPrice();