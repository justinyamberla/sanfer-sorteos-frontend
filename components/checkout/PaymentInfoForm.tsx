"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {usePayment} from "@/context/PaymentContext";
import {locations} from "@/lib/locations";
import {createPedidoOffline, createPedidoOnline, prepareTransaction} from "@/services/PedidoService";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

export const PaymentInfoForm = () => {

    const router = useRouter();
    const {formData, setFormData} = usePayment();

    const [loading, setLoading] = useState(false);
    const selectedProvincia = locations.find((loc) => loc.provincia === formData?.provincia);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const metodo = e.target.value as "offline" | "tarjeta";

        setFormData((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                metodo_pago: metodo,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData) {
            return alert("Por favor, completa el formulario antes de continuar.");
        }

        if (formData.cantidad_boletos <= 0) {
            return alert("Debes seleccionar al menos un boleto.");
        }

        if (formData.metodo_pago === "offline") {
            setLoading(true);
            const res = await createPedidoOffline(formData);

            if (res.success) {
                setFormData((prev) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        numero_pedido: res.data.pedido.numero_pedido,
                    }
                });

                toast.success(res.message);
                router.replace("/payment/summary");
            } else {
                toast.error(res.message || "Error al procesar el pedido");
            }

            setLoading(false);
        } else {
            setLoading(true);
            const res = await prepareTransaction(formData);
            console.log("Respuesta de prepareTransaction:", res);

            if (res.success) {
                const link = res.data?.payphone.payWithCard.replace(/"/g, ""); // Por si llega con comillas

                if (link) {
                    toast.success("Redirigiendo al link de pago...");
                    setTimeout(() => {
                        // Reemplaza la ventana actual y limpia el historial
                        window.location.replace(link);
                    }, 1000);
                } else {
                    toast.error("No se generó el enlace de pago.");
                }
            } else {
                toast.error(res.message || "Error al procesar el pedido en línea");
            }

            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    value={formData?.telefono}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="col-md-4">
                <label className="form-label">País</label>
                <input type="text" className="form-control" value="Ecuador" disabled/>
            </div>

            <div className="col-md-4">
                <label className="form-label">Provincia</label>
                <select
                    name="provincia"
                    className="form-select"
                    value={formData?.provincia}
                    onChange={handleInputChange}
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
                    name="ciudad"
                    className="form-select"
                    value={formData?.ciudad}
                    onChange={handleInputChange}
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
                        name="recibir_notificaciones"
                        checked={formData?.recibir_notificaciones}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="recibirNotificaciones">
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
                        name="metodo_pago"
                        id="offline"
                        value="offline"
                        checked={formData?.metodo_pago === "offline"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="offline">
                        Transferencia bancaria o depósito
                    </label>
                </div>

                <div className="form-check form-check-inline my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="metodo_pago"
                        id="tarjeta"
                        value="tarjeta"
                        checked={formData?.metodo_pago === "tarjeta"}
                        onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="tarjeta">
                        Tarjeta de crédito Visa o Mastercard
                    </label>
                </div>
            </div>

            {formData?.metodo_pago === "offline" && (
                <div className="col-12">
                    <div className="alert alert-warning d-flex" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <div>
                            Por favor, NO PROCEDAS SI NO ESTÁS SEGURO de que quieres realizar la compra. Realiza tu pago
                            directamente con transferencia o depósito a nuestra cuenta bancaria. Usa el número del
                            pedido
                            como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en
                            nuestra cuenta.
                        </div>
                    </div>
                </div>
            )}

            {formData?.metodo_pago === "tarjeta" && (
                <div className="col-12">
                    <div className="alert alert-secondary">
                        Usa tus tarjetas de crédito y débito Visa o Mastercard.
                    </div>
                </div>
            )}

            <div className="col-12">
                <div className="form-check my-3">
                    <input className="form-check-input" type="checkbox" id="aceptaTerminos" required/>
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
