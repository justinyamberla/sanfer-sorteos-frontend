"use client";

import { useSearchParams } from "next/navigation";
import PersonalInfoForm from "@/components/checkout/PersonalInfoForm";

export const CheckoutPage = () => {

    const searchParams = useSearchParams();
    console.log(searchParams.get("quantity"));

    return (
        <div className="min-vh-100 w-100 container">
            {searchParams.get("quantity") ?? "hola mundo"}
            <PersonalInfoForm />
        </div>
    );
}

export default CheckoutPage;