"use client";

import { useCheckout } from "@/context/CheckoutContext";

export default function SummaryPage() {
    const { data } = useCheckout();

    if (!data) return <p>No hay datos del pedido.</p>;

    return (
        <div>
            <h1>Resumen del pedido</h1>
            <p><strong>Nombre:</strong> {data.nombres} {data.apellidos}</p>
            <p><strong>Dirección:</strong> {data.direccion}, {data.ciudad}, {data.provincia}</p>
            <p><strong>Método de pago:</strong> {data.metodoPago}</p>
            {/* Agrega número de pedido y datos bancarios si es transferencia */}
        </div>
    );
}
