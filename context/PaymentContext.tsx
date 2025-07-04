"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { FormData, ActividadData } from "@/lib/types";

type PaymentContextType = {
    formData: FormData | null;
    setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
    actividadData: ActividadData | null;
    setActividadData: React.Dispatch<React.SetStateAction<ActividadData | null>>;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
    return context;
};

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [actividadData, setActividadData] = useState<ActividadData | null>(null);

    return (
        <PaymentContext.Provider value={{ formData, setFormData, actividadData, setActividadData }}>
            {children}
        </PaymentContext.Provider>
    );
};
