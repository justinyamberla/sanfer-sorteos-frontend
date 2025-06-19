"use client";

import { usePayment } from "@/context/PaymentContext";
import React from "react";

export default function SummaryPage() {
    const { data } = usePayment();

    if (!data) return <p className="text-danger text-center mt-5">No hay datos del pedido.</p>;

    return (
        <div className="container d-flex justify-content-center my-5">
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="fw-bold mb-2 text-center">¡GRACIAS!</h2>
                <p className="text-center mb-3">Tu compra ha sido recibida</p>

                {/* CARD PRINCIPAL */}
                <div className="card mb-4 bg-white shadow border-primary">
                    <div className="card-body text-center">
                        <div className="mb-3 border-bottom pb-2">
                            <small className="fw-bold">Número de pedido:</small>
                            <p className="text-danger fs-5 fw-bold mb-0">{data.numeroPedido}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Fecha:</small>
                            <p className="mb-0">{data.fecha}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Cliente:</small>
                            <p className="mb-0">{data.nombres} {data.apellidos}</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Producto:</small>
                            <p className="mb-0">Sorteo de ejemplo</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Cantidad:</small>
                            <p className="mb-0">1</p>
                        </div>

                        <div className="mb-3">
                            <small className="fw-bold">Método de pago:</small>
                            <p className="mb-0">{data.metodoPago}</p>
                        </div>

                        <div>
                            <small className="fw-bold">Total:</small>
                            <p className="mb-0 text-primary fs-5 fw-bold">$5.00</p>
                        </div>
                    </div>
                </div>

                {/* DATOS DE FACTURACIÓN */}
                <h5 className="fw-semibold mb-3">Datos de Facturación</h5>
                <div className="card bg-white mb-4 shadow border-0">
                    <div className="card-body">

                        <div className="mb-2">
                            <small className="fw-bold">Nombre completo:</small>
                            <p className="mb-0">{data.nombres} {data.apellidos}</p>
                        </div>

                        <div className="mb-2">
                            <small className="fw-bold">Dirección:</small>
                            <p className="mb-0">{data.direccion}</p>
                        </div>

                        <div className="mb-2">
                            <small className="fw-bold">Ciudad:</small>
                            <p className="mb-0">{data.ciudad}</p>
                        </div>

                        <div className="mb-2">
                            <small className="fw-bold">Provincia:</small>
                            <p className="mb-0">{data.provincia}</p>
                        </div>

                        <div className="mb-2">
                            <small className="fw-bold">Teléfono:</small>
                            <p className="mb-0">{data.telefono}</p>
                        </div>

                        <div>
                            <small className="fw-bold">Correo electrónico:</small>
                            <p className="mb-0">{data.email}</p>
                        </div>
                    </div>
                </div>

                {/* INSTRUCCIONES DE PAGO */}
                <h5 className="fw-semibold mb-3">Instrucciones de Pago</h5>
                <div className="card bg-white mb-4 shadow border-0">
                    <div className="card-body">
                        <ol className="ps-3 small">
                            <li>Anota o haz una captura del número de pedido (esquina superior izquierda de esta pantalla).</li>
                            <li>Transfiere o deposita el MONTO TOTAL en menos de 1 hora y envía comprobante y número de pedido a WhatsApp o tu pedido será cancelado. No se hacen reembolsos.</li>
                            <li>Envíanos el comprobante de pago y número de pedido al WhatsApp <strong>+5900000000</strong>.</li>
                            <li>Recibirás tus números por correo una vez verificado el pago. Puede tardar en horas pico o transferencias interbancarias.</li>
                        </ol>

                        <div className="mt-4">
                            <h6 className="fw-bold">Banco Pichincha</h6>
                            <p className="mb-2 small">
                                Cuenta de Ahorros: #00000000<br />
                                Nombre: Nombre Apellido<br />
                                Cédula: 0111111111<br />
                                Correo: sorteos@correo.com
                            </p>

                            <h6 className="fw-bold">Banco Guayaquil</h6>
                            <p className="small">
                                Cuenta de Ahorros: #00000000<br />
                                Nombre: Nombre Apellido<br />
                                Cédula: 0111111111<br />
                                Correo: sorteos@correo.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* ACERCA DE TUS NÚMEROS */}
                <h5 className="fw-semibold mb-3">Acerca de tus números</h5>
                <div className="card bg-white mb-4 shadow border-0">
                    <div className="card-body">
                        <p className="small mb-0">
                            Tus números serán generados una vez que verifiquemos el pago. Este proceso es manual y puede tardar. Por favor, sigue las instrucciones de esta página.
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
}
