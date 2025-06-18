"use client";

import React, { useState } from "react";

export const PaymentInfoForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("transferencia");

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <form className="row g-2 p-4 bg-white shadow-sm rounded-4">
            <h5 className="fw-semibold">Información personal</h5>

            <div className="col-md-6">
                <label className="form-label">Nombres</label>
                <input type="text" className="form-control" required />
            </div>

            <div className="col-md-6">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" required />
            </div>

            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input type="tel" className="form-control" required />
            </div>

            <div className="col-12">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" required />
            </div>

            <div className="col-md-4">
                <label className="form-label">País</label>
                <input type="text" className="form-control" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Provincia</label>
                <input type="text" className="form-control" />
            </div>

            <div className="col-md-4">
                <label className="form-label">Ciudad</label>
                <input type="text" className="form-control" />
            </div>

            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="notificaciones" />
                    <label className="form-check-label" htmlFor="notificaciones">
                        Deseo recibir notificaciones de próximos sorteos
                    </label>
                </div>
            </div>

            <hr className="mt-4" />

            <h5 className="fw-semibold">Método de pago</h5>

            <div className="col-12">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="transferencia"
                        value="transferencia"
                        checked={paymentMethod === "transferencia"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="transferencia">Transferencia</label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="tarjeta"
                        value="tarjeta"
                        checked={paymentMethod === "tarjeta"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="tarjeta">Tarjeta</label>
                </div>
            </div>

            {paymentMethod === "transferencia" && (
                <div className="col-12">
                    <div className="alert alert-info">
                        Realiza la transferencia a la cuenta XXXXXXX y sube el comprobante en la página siguiente.
                    </div>
                </div>
            )}

            {paymentMethod === "tarjeta" && (
                <div className="col-12">
                    <button type="button" className="btn btn-primary">
                        Pagar con tarjeta
                    </button>
                </div>
            )}

            <div className="col-12 mt-4">
                <button type="submit" className="btn btn-success w-100">Confirmar compra</button>
            </div>
        </form>
    );
};

export default PaymentInfoForm;
