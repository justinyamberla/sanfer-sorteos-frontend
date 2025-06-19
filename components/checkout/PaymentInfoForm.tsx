"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/PaymentContext";
import { locations } from "@/lib/locations";
import type { FormData } from "@/lib/types";

export const PaymentInfoForm = () => {

    const router = useRouter();
    const { setData } = usePayment();

    const [provincia, setProvincia] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("transferencia");

    const selectedProvincia = locations.find((loc) => loc.provincia === provincia);

    const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvincia(e.target.value);
        setCiudad("");
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: FormData = {
            numeroPedido: 12345,
            fecha: "2023-10-01",
            producto: "Números Mitsubishi L200 4x4 + KTM Duke 250 + Honda Navi | Actividad #30",
            cantidad: 20,
            nombres: "Justin Alexis",
            apellidos: "Yamberla Marcillo",
            email: "justin@correo.com",
            telefono: "0987654321",
            direccion: "Iluman, Barrio Sta. Teresita",
            provincia,
            ciudad,
            recibirNotificaciones: true,
            metodoPago: paymentMethod as "transferencia" | "tarjeta",
        };

        setData(formData);

        if (paymentMethod === "transferencia") {
            router.replace("/payment/summary");
        } else {
            // ejemplo: Payphone
            alert("Redirigiendo a Payphone...");
        }
    };

    return (
        <form className="row g-2 p-4 bg-white shadow rounded-4" onSubmit={handleSubmit}>
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
                <select className="form-select" value={provincia} onChange={handleProvinciaChange} required>
                    <option value="">Seleccione una provincia</option>
                    {locations.map((loc) => (
                        <option key={loc.provincia} value={loc.provincia}>
                            {loc.provincia}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">Ciudad</label>
                <select className="form-select" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required>
                    <option value="">Seleccione una ciudad</option>
                    {selectedProvincia?.ciudades.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
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
                    <label className="form-check-label" htmlFor="transferencia">
                        Transferencia bancaria o depósito
                    </label>
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
                    <label className="form-check-label" htmlFor="tarjeta">
                        Tarjeta de crédito Visa o Mastercard
                    </label>
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
