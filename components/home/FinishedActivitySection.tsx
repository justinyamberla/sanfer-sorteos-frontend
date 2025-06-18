'use client';

import Countdown from 'react-countdown';
import type { CountdownRenderProps } from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
        return <span className="text-success fw-bold">¡El sorteo ha comenzado!</span>;
    }
    return (
        <span className="fs-4 fw-semibold">
            {days}d {hours}h {minutes}m {seconds}s
        </span>
    );
};

export const FinishedActivitySection = () => {

    const targetDate = new Date("2025-06-18T20:00:00");

    return (
        <section className="py-5 text-center">
            <div className="container">
                <div className="mb-3">
                    <i className="bi bi-emoji-frown display-4 text-danger"></i>
                </div>

                <h2 className="fw-bold mb-3">
                    ¡LO SENTIMOS, LOS NÚMEROS PARA ESTA ACTIVIDAD SE AGOTARON!
                </h2>

                <p className="lead mb-2">
                    Los premios se jugarán en un Live en nuestras cuentas oficiales cuando la cuenta regresiva llegue a cero.
                </p>

                <p className="fw-semibold mb-4">
                    <strong>Fecha del sorteo:</strong> Miércoles 18 de Junio | 8:00 PM
                </p>

                <div className="d-inline-block px-4 py-3 bg-white rounded shadow">
                    <Countdown
                        date={targetDate}
                        renderer={renderer}
                    />
                </div>
            </div>
        </section>
    );
};

export default FinishedActivitySection;
