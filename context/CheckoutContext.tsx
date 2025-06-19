"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { FormData } from "@/lib/types";

type CheckoutContextType = {
    data: FormData | null;
    setData: React.Dispatch<React.SetStateAction<FormData | null>>;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
    return context;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<FormData | null>(null);

    return (
        <CheckoutContext.Provider value={{ data, setData }}>
            {children}
        </CheckoutContext.Provider>
    );
};
