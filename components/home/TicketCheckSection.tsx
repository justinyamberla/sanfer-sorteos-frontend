'use client';

import { useState } from "react";
import {getPedidoByMail} from "@/services/PedidoService";
import toast from "react-hot-toast";

export const TicketCheckSection = () => {
    const [correo, setCorreo] = useState("");
    const [resultado, setResultado] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setResultado([]);

        setLoading(true);
        const response = await getPedidoByMail(correo);

        if (response.success) {
            toast.success(response.message || "Pedidos obtenidos exitosamente.");
            setResultado(response.data || []);
        } else {
            toast.error(response.message || "Error al consultar pedidos.");
        }

        setLoading(false);
    };

    return (
        <section id="ticketCheckSection" className="py-5 mb-4 bg-dark text-white rounded-4">
            <div className="container">
                <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold mb-3">CONSULTA TUS NÚMEROS</h2>
                    <p className="mb-4">Ingresa tu correo electrónico para consultar tus números</p>

                    <form className="row w-100 justify-content-center" onSubmit={handleSubmit}>
                        <div className="col-12 col-md-6 mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo electrónico"
                                aria-label="Correo electrónico"
                                required
                                value={correo}
                                onChange={handleCorreoChange}
                            />
                        </div>
                        <div className="col-12 col-md-auto">
                            <button
                                className="btn btn-primary text-white w-100"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Consultando..." : "Consultar"}
                            </button>
                        </div>
                    </form>

                    {resultado.length > 0 && (
                        <div className="mt-4 w-md-75 w-sm-100 small">
                            <h5 className="text-white fw-semibold">Tus pedidos:</h5>
                            {resultado.map((pedido, index) => (
                                <div key={index} className="card my-3 bg-body">
                                    <div className="card-body">
                                        <p className="m-1 p-0"><strong>Pedido:</strong> {pedido.numero_pedido}</p>
                                        <p className="m-1 p-0"><strong>Total pagado:</strong> ${pedido.total}</p>
                                        <p className="m-1 p-0"><strong>Método de pago:</strong> {pedido.metodo_pago === 'offline' ? 'Transferencia o depósito' : 'Tarjeta de crédito/Payphone'}</p>
                                        <p className="m-1 p-0 text-capitalize"><strong>Estado:</strong> {pedido.estado}</p>
                                        <p className="m-1 p-0"><strong>Boletos:</strong></p>
                                        <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                                            {pedido.boletos.map((num: string, i: number) => (
                                                <span key={i} className="badge bg-white border border-1 shadow-sm border-dark text-dark px-3 py-2 fs-6">
                                                    {num}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TicketCheckSection;
