"use client";

import React, {useState} from "react";

export const PaymentInfoForm = () => {
    const [paymentMethod, setPaymentMethod] = useState("transferencia");

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <form className="row g-2 p-4 bg-white shadow rounded-4">
            <h5 className="fw-semibold">Información personal</h5>

            <div className="col-md-6">
                <label className="form-label">Nombres</label>
                <input type="text" className="form-control" required/>
            </div>

            <div className="col-md-6">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" required/>
            </div>

            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required/>
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input type="tel" className="form-control" required/>
            </div>

            <div className="col-12">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" required/>
            </div>

            <div className="col-md-4">
                <label className="form-label">País</label>
                <input type="text" className="form-control" value="Ecuador" disabled/>
            </div>

            <div className="col-md-4">
                <label className="form-label">Provincia</label>
                <input type="text" className="form-control"/>
            </div>

            <div className="col-md-4">
                <label className="form-label">Ciudad</label>
                <input type="text" className="form-control"/>
            </div>

            <div className="col-12">
                <div className="form-check my-3">
                    <input className="form-check-input" type="checkbox" id="notificaciones"/>
                    <label className="form-check-label" htmlFor="notificaciones">
                        Deseo recibir notificaciones de próximos sorteos
                    </label>
                </div>
            </div>

            <hr className="mt-4"/>

            <h5 className="fw-semibold">Método de pago</h5>

            <div className="col-12">
                <div className="form-check form-check-inline my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="transferencia"
                        value="transferencia"
                        checked={paymentMethod === "transferencia"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="transferencia">Transferencia bancaria o
                        depósito</label>
                </div>

                <div className="form-check form-check-inline my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="tarjeta"
                        value="tarjeta"
                        checked={paymentMethod === "tarjeta"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="tarjeta">Tarjeta de crédito Visa o Mastercard</label>
                </div>
            </div>

            {paymentMethod === "transferencia" && (
                <div className="col-12">
                    <div className="alert alert-warning d-flex" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <div>
                            Por favor, NO PROCEDAS SI NO ESTÁS SEGURO de que quieres realizar la compra. Realiza tu pago
                            directamente con transferencia o depósito a nuestra cuenta bancaria. Usa el número del pedido
                            como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en
                            nuestra cuenta.
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === "tarjeta" && (
                <div className="col-12">
                    <div className="alert alert-secondary">
                        Usa tus tarjetas de crédito y débito Visa o Mastercard.
                    </div>
                </div>
            )}

            <div className="col-12">
                <div className="form-check my-3">
                    <input className="form-check-input" type="checkbox" id="notificaciones" required/>
                    <label className="form-check-label" htmlFor="notificaciones">
                        He leído y estoy de acuerdo con los términos y condiciones de la web <span className="text-danger">*</span>
                    </label>
                </div>
            </div>

            <div className="col-12 mt-4">
                <button type="submit" className="btn btn-dark">Continuar con el pago</button>
            </div>
        </form>
    );
};

export default PaymentInfoForm;
