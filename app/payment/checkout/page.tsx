"use client";

import { useSearchParams } from "next/navigation";
import PaymentInfoForm from "@/components/checkout/PaymentInfoForm";
import OrderCard from "@/components/checkout/OrderCard";

export const CheckoutPage = () => {

    const searchParams = useSearchParams();
    const quantity = searchParams.get("quantity");

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4 text-center">CHECKOUT</h2>
            <div className="row gy-4 flex-column-reverse flex-lg-row">
                <div className="col-lg-8">
                    <div className="mb-4">
                        <PaymentInfoForm />
                    </div>
                </div>

                <div className="col-lg-4">
                    <OrderCard quantity={quantity} />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;