"use client";

import { useSearchParams } from "next/navigation";
import PaymentInfoForm from "@/components/checkout/PaymentInfoForm";
import OrderCard from "@/components/checkout/OrderCard";
import {getActividadActual} from "@/services/ActividadService";
import React, {useEffect, useState} from "react";
import {usePayment} from "@/context/PaymentContext";
import Loading from "@/components/Loading";

export const CheckoutPage = () => {

    const searchParams = useSearchParams();
    const { setFormData, actividadData, setActividadData } = usePayment();

    const quantity = searchParams.get("quantity") || null;
    const today = new Date().toISOString().split("T")[0];

    const [loading, setLoading] = useState(true);

    async function fetchData() {
        try {
            const res = await getActividadActual();

            const actividad = res.data;

            setActividadData({
                id: actividad?.id || 0,
                nombre: actividad?.nombre || "",
                titulo: actividad?.titulo || "",
                precio_boleto: Number(actividad?.precio_boleto) || 0,
                boletos_disponibles: actividad?.boletos_disponibles || 0,
            });

            setFormData({
                numero_pedido: 0,
                actividad_id: actividad?.id || 0,
                precio: Number(actividad?.precio_boleto) || 0,
                cantidad_boletos: Number(quantity) || 0,
                total: Number(actividad?.precio_boleto) * quantity,
                metodo_pago: null,
                fecha_pedido: today,

                // Datos del cliente (nivel raíz ahora)
                nombres: "",
                apellidos: "",
                email: "",
                telefono: "",
                direccion: "",
                provincia: "",
                ciudad: "",
                recibir_notificaciones: false,

                // Extra para mostrar en UI
                producto: `Números ${actividad?.nombre} - ${actividad?.titulo}`,
            });
        } catch (err) {
            console.error("Error al cargar actividad:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [setActividadData]);

    if (loading) {
        return <Loading />;
    }

    if (quantity > actividadData?.boletos_disponibles) {
        return (
            <div className="container py-5">
                <h2 className="fw-bold mb-4 text-center">ERROR</h2>
                <p className="text-center">
                    Actualmente sólo hay {actividadData?.boletos_disponibles} boletos disponibles. Por favor, vuelve a la sección de compra y selecciona una cantidad válida.
                </p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="fw-bold mb-4 text-center">CHECKOUT</h2>
            <div className="row gy-4 flex-column-reverse flex-lg-row">
                <div className="col-lg-8">
                    <div className="mb-4">
                        <PaymentInfoForm />
                    </div>
                </div>

                <div className="col-lg-4">
                    <OrderCard />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;