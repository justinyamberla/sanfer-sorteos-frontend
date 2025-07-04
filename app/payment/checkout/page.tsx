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
            setActividadData({
                id: res.data?.id || 0,
                nombre: res.data?.nombre || "",
                titulo: res.data?.titulo || "",
                precio_boleto: Number(res.data?.precio_boleto) || 0,
                boletos_disponibles: res.data?.boletos_disponibles || 0,
            });
            setFormData({
                numeroPedido: 12345,
                fecha: today,
                producto: `Números ${res.data?.nombre} - ${res.data?.titulo}`,
                cantidad: Number(quantity) || 0,
                precio: Number(res.data?.precio_boleto) || 0,
                total: (Number(res.data?.precio_boleto) || 0) * (quantity || 0),
                nombres: "",
                apellidos: "",
                email: "",
                telefono: "",
                direccion: "",
                provincia: "",
                ciudad: "",
                recibirNotificaciones: false,
                metodoPago: "transferencia",
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