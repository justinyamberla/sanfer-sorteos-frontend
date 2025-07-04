"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/PaymentContext";
import { locations } from "@/lib/locations";

export const PaymentInfoForm = () => {
    const router = useRouter();
    const { formData, setFormData } = usePayment();

    const selectedProvincia = locations.find((loc) => loc.provincia === formData?.provincia);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProvincia = e.target.value;
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                provincia: newProvincia,
                ciudad: "", // reseteamos ciudad al cambiar provincia
            };
        });
    };

    const handleCiudadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ciudad = e.target.value;
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                ciudad,
            };
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const metodo = e.target.value as "transferencia" | "tarjeta";
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                metodoPago: metodo,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData?.metodoPago === "transferencia") {
            router.replace("/payment/summary");
        } else {
            alert("Redirigiendo a Payphone...");
        }
    };

    return (
        <form className="row g-2 p-4 bg-white shadow rounded-4" onSubmit={handleSubmit}>
            <h5 className="fw-semibold">Información personal</h5>

            <div className="col-md-6">
                <label className="form-label">Nombres</label>
                <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    value={formData?.nombres}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Apellidos</label>
                <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    value={formData?.apellidos}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    value={formData?.telefono}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="col-12">
                <label className="form-label">Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData?.direccion}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="col-md-4">
                <label className="form-label">País</label>
                <input type="text" className="form-control" value="Ecuador" disabled />
            </div>

            <div className="col-md-4">
                <label className="form-label">Provincia</label>
                <select
                    className="form-select"
                    value={formData?.provincia}
                    onChange={handleProvinciaChange}
                    required
                >
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
                <select
                    className="form-select"
                    value={formData?.ciudad}
                    onChange={handleCiudadChange}
                    required
                >
                    <option value="">Seleccione una ciudad</option>
                    {selectedProvincia?.ciudades.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-12">
                <div className="form-check my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="recibirNotificaciones"
                        checked={formData?.recibirNotificaciones}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="recibirNotificaciones">
                        Deseo recibir notificaciones de próximos sorteos
                    </label>
                </div>
            </div>

            <hr className="mt-4" />

            <h5 className="fw-semibold">Método de pago</h5>

            <div className="col-12">
                <div className="form-check form-check-inline my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="transferencia"
                        value="transferencia"
                        checked={formData?.metodoPago === "transferencia"}
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
                        checked={formData?.metodoPago === "tarjeta"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="tarjeta">
                        Tarjeta de crédito Visa o Mastercard
                    </label>
                </div>
            </div>

            {formData?.metodoPago === "transferencia" && (
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

            {formData?.metodoPago === "tarjeta" && (
                <div className="col-12">
                    <div className="alert alert-secondary">
                        Usa tus tarjetas de crédito y débito Visa o Mastercard.
                    </div>
                </div>
            )}

            <div className="col-12">
                <div className="form-check my-3">
                    <input className="form-check-input" type="checkbox" id="aceptaTerminos" required />
                    <label className="form-check-label" htmlFor="aceptaTerminos">
                        He leído y estoy de acuerdo con los Términos y Condiciones de la web{" "}
                        <span className="text-danger">*</span>
                    </label>
                </div>
            </div>

            <div className="col-12 mt-4">
                <button type="submit" className="btn btn-dark">
                    Continuar con el pago
                </button>
            </div>
        </form>
    );
};

export default PaymentInfoForm;
