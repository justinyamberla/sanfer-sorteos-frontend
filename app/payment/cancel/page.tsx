"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {cancelTransaction, confirmTransaction} from "@/services/PedidoService";

export const CancellationPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const clientTxId = searchParams.get("clientTransactionId") || "";

        if (!clientTxId) {
            setError("Parámetros inválidos en la URL.");
            setLoading(false);
            return;
        }

        const confirmar = async () => {
            const result = await cancelTransaction(clientTxId);
            if (result.success) {
                console.log(result.message)
            } else {
                setError(result.message || "Error al confirmar el pago.");
            }
            setLoading(false);
        };

        confirmar();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" />
                <p className="mt-3">Verificando tu pago...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center py-5">
                <h2 className="text-danger mb-3">Error</h2>
                <p>{error || "No se pudo obtener los datos del pedido."}</p>
                <a href="/" className="btn btn-secondary mt-3">Volver al inicio</a>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center my-5">
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <h2 className="fw-bold mb-2 text-center">¡PEDIDO CANCELADO!</h2>
                <p className="text-center mb-3">Tu pedido ha sido cancelado. Si deseas participar vuelve a la página principal
                y genera un nuevo pedido.</p>

                {/* BOTÓN FINAL */}
                <div className="text-center mb-4">
                    <a href="/" className="btn btn-dark px-5">Volver a la página de inicio</a>
                </div>
            </div>
        </div>
    );
}

export default CancellationPage;