'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface DepositContextType{
    depositAmount: bigint;
    setDepositAmount: (amount: bigint) => void;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export function useDeposit() {
    const context = useContext(DepositContext);
    if (context === undefined) {
        throw new Error('useDeposit must be used within a DepositProvider');
    }
    return context;
}

interface DepositProviderProps{
    children: ReactNode;
}

export const DepositProvider: React.FC<DepositProviderProps> = ({ children }) => {
    const [depositAmount, setDepositAmount] = useState(BigInt(0));

    return (
        <DepositContext.Provider value={{ depositAmount, setDepositAmount }}>
            {children}
        </DepositContext.Provider>
    )
}