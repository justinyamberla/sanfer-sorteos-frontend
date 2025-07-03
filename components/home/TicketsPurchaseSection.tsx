'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const TicketsPurchaseSection = ({ price }) => {

    const router = useRouter();
    const [customQuantity, setCustomQuantity] = useState<number | string>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customQuantity || customQuantity <= 0) {
            alert("Por favor, ingresa una cantidad válida de boletos.");
            return;
        }

        router.push(`/payment/checkout?quantity=${customQuantity}`);
    };

    return (
        <section id="ticketsPurchaseSection" className="py-5">
            <div className="container">
                <h2 className="text-center fw-bold mb-2">ADQUIERE TUS BOLETOS</h2>
                <p className="text-center mb-5">El valor de cada boleto es de <strong>${price} USD</strong>.</p>

                {/* Cards de boletos */}
                <div className="row justify-content-center mb-3">
                    {/* Card x10 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-dark text-white fw-bold">
                                x10 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">${10 * price} USD</h3>
                                <Link className="btn btn-dark" href={"/payment/checkout?quantity=10"}>Comprar</Link>
                            </div>
                        </div>
                    </div>

                    {/* Card x20 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-primary text-white fw-bold">
                                x20 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">${20 * price} USD</h3>
                                <Link className="btn btn-dark" href={"/payment/checkout?quantity=20"}>Comprar</Link>
                            </div>
                        </div>
                    </div>

                    {/* Card x10 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-dark text-white fw-bold">
                                x30 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">${30 * price} USD</h3>
                                <Link className="btn btn-dark" href={"/payment/checkout?quantity=30"}>Comprar</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded border shadow">
                    <h4 className="fw-bold mb-3">¿Más números?</h4>

                    <form className="row align-items-center" onSubmit={handleSubmit}>
                        <div className="col-12 col-md-auto mb-2 mb-md-0">
                            <label className="form-label mb-0">
                                Agrega la cantidad de boletos que deseas comprar:
                            </label>
                        </div>

                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                placeholder="Ej. 45"
                                onChange={(e) => setCustomQuantity(Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-auto">
                            <button type="submit" className="btn btn-success w-100 text-white">Comprar</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TicketsPurchaseSection;
