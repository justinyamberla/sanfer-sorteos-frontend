'use client';

import Countdown from 'react-countdown';
import type { CountdownRenderProps } from "react-countdown";
import { useEffect, useState } from "react";
import {isToday} from "date-fns";

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
        return <span className="text-success fw-bold">¡Ha llegado la hora del sorteo!</span>;
    }
    return (
        <span className="fs-4 fw-semibold">
            {days}d {hours}h {minutes}m {seconds}s
        </span>
    );
};

export const SoldoutActivitySection = ({ fecha_sorteo }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true); // Solo renderiza en cliente
    }, []);

    // 🔥 Convierte "2025-07-10 11:44:35" -> "2025-07-10T11:44:35"
    const getLocalDate = (fecha) => {
        if (!fecha) return null;
        return fecha.replace(' ', 'T');
    };

    const targetDate = getLocalDate(fecha_sorteo);

    return (
        <section className="py-5 text-center">
            <div className="container">
                <h2 className="fw-bold mb-3">
                    ¡LO SENTIMOS, LOS NÚMEROS PARA ESTA ACTIVIDAD SE AGOTARON!
                </h2>

                <p className="lead mb-2">
                    Los premios se jugarán en un Live en nuestras cuentas oficiales cuando la cuenta regresiva llegue a cero.
                </p>

                <p className="display-4">{isToday(fecha_sorteo) ? '😊' : '🙁'}</p>

                <p className="fw-semibold mb-4">
                    <strong>Fecha del sorteo:</strong> {fecha_sorteo || "Pendiente"}
                </p>

                {targetDate && show && (
                    <div className="d-inline-block px-4 py-3 bg-white rounded shadow">
                        <Countdown
                            date={targetDate}
                            renderer={renderer}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default SoldoutActivitySection;
