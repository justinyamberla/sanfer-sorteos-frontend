"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmTransaction } from "@/services/PedidoService";

interface Pedido {
    numero_pedido: string;
    actividad_id: number;
    producto: string;
    cliente_nombres: string;
    cliente_apellidos: string;
    cliente_email: string;
    cliente_telefono: string;
    cliente_direccion: string;
    cliente_ciudad: string;
    cliente_provincia: string;
    cantidad_boletos: number;
    total: number;
    metodo_pago: string;
    estado: string;
    fecha_pedido: string;
    fecha_pago: string | null;
    boletos: string []
}

const ConfirmationPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0", 10);
        const clientTxId = searchParams.get("clientTransactionId") || "";

        if (!id || !clientTxId) {
            setError("Parámetros inválidos en la URL.");
            setLoading(false);
            return;
        }

        const confirmar = async () => {
            const result = await confirmTransaction(id, clientTxId);
            if (result.success && result.data) {
                console.log(result.data)
                setPedido(result.data);
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
                <p className="mt-3">Confirmando tu pago...</p>
            </div>
        );
    }

    if (error || !pedido) {
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
                <h2 className="fw-bold mb-2 text-center">¡GRACIAS!</h2>
                <p className="text-center mb-3">Tu compra ha sido recibida</p>

                {/* CARD PRINCIPAL */}
                <div className="mb-5 py-3 bg-white shadow border-primary rounded-4">
                    <div className="card-body text-center">
                        <div className="mb-3 border-bottom pb-2">
                            <small className="fw-bold">Número de pedido:</small>
                            <p className="text-danger fs-5 fw-bold mb-0">{pedido.numero_pedido}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Fecha:</small>
                            <p className="mb-0">{pedido.fecha_pedido}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Cliente:</small>
                            <p className="mb-0">{pedido.cliente_nombres} {pedido.cliente_apellidos}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Producto:</small>
                            <p className="mb-0">{pedido.producto}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Cantidad:</small>
                            <p className="mb-0">{pedido.cantidad_boletos}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Método de pago:</small>
                            <p className="mb-0 text-capitalize">{pedido.metodo_pago} | PayPhone</p>
                        </div>

                        <div>
                            <small className="fw-bold">Total:</small>
                            <p className="mb-0 text-primary fs-5 fw-bold">${pedido.total}</p>
                        </div>
                    </div>
                </div>

                {/* DATOS DE FACTURACIÓN */}
                <h5 className="fw-semibold mb-3">Datos de Facturación</h5>
                <div className="bg-white mb-4 shadow border-0 rounded-4 p-4">
                    <div className="card-body">
                        <div className="mb-2">
                            <small className="fw-bold">Nombre completo:</small>
                            <p className="mb-0">{pedido.cliente_nombres} {pedido.cliente_apellidos}</p>
                        </div>
                        <div className="mb-2">
                            <small className="fw-bold">Dirección:</small>
                            <p className="mb-0">{pedido.cliente_direccion}</p>
                        </div>
                        <div className="mb-2">
                            <small className="fw-bold">Ciudad:</small>
                            <p className="mb-0">{pedido.cliente_ciudad}</p>
                        </div>
                        <div className="mb-2">
                            <small className="fw-bold">Provincia:</small>
                            <p className="mb-0">{pedido.cliente_provincia}</p>
                        </div>
                        <div className="mb-2">
                            <small className="fw-bold">Teléfono:</small>
                            <p className="mb-0">{pedido.cliente_telefono}</p>
                        </div>
                        <div>
                            <small className="fw-bold">Correo electrónico:</small>
                            <p className="mb-0">{pedido.cliente_email}</p>
                        </div>
                    </div>
                </div>

                {/* ACERCA DE TUS NÚMEROS */}
                <h5 className="fw-semibold mb-3">Acerca de tus números</h5>
                <div className="bg-white mb-4 shadow border-0 rounded-4 p-4">
                    <div className="card-body">
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4 mb-4">
                            {pedido.boletos.map((number, index) => (
                                <div className="col" key={index}>
                                    <div className="card bg-white shadow border-dark text-center p-3 h-100">
                                        <div className="card-body d-flex align-items-center justify-content-center">
                                            <span className="fw-bold fs-4 text-dark">{number}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="small fw-bold">
                            ¡Gracias por participar en nuestra actividad!
                        </p>
                        <p className="small mb-0">
                            Tus número también fueron enviados a tu correo electrónico (revisa la carpeta de spam o correo no deseado).
                            Los premios mayores se jugarán cuando se vendan todos los boletos y anunciaremos el ganador mediante un live en nuestras cuentas de Instagram. ¡Síguenos para no perdertelo!
                        </p>
                    </div>
                </div>

                {/* BOTÓN FINAL */}
                <div className="text-center mb-4">
                    <a href="/" className="btn btn-dark px-5">Volver a la página de inicio</a>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
