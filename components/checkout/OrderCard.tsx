"use client";

import Link from "next/link";
import {usePayment} from "@/context/PaymentContext";

export const OrderCard = () => {

    const { formData } = usePayment();

    if (!formData) return <div>Cargando información del sorteo...</div>;

    return (
        <div className="row g-2 bg-white p-4 shadow rounded-4">
            <div className="card-body">
                <h5 className="fw-semibold mb-3">Resumen del pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold me-2">Producto: </span>
                    <span className="text-end">{formData?.producto}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Cantidad:</span>
                    <span>{formData?.cantidad} boleto(s)</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Precio unitario:</span>
                    <span>${formData?.precio.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-primary">${formData?.total.toFixed(2)}</strong>
                </div>

                <div className="mt-4">
                    <Link href="/#ticketsPurchaseSection" scroll className="btn btn-outline-secondary w-100">
                        Editar cantidad
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
