"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { FormData } from "@/lib/types";

type PaymentContextType = {
    data: FormData | null;
    setData: React.Dispatch<React.SetStateAction<FormData | null>>;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
    return context;
};

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<FormData | null>(null);

    return (
        <PaymentContext.Provider value={{ data, setData }}>
            {children}
        </PaymentContext.Provider>
    );
};
