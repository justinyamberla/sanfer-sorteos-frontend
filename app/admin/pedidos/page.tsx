"use client";

import { useEffect, useState } from "react";
import { getPedidosOfActividadActual } from "@/services/PedidoService";
import Loading from "@/components/Loading";
import PedidoCard from "@/components/admin/PedidoCard";
import Pagination from "@/components/admin/Pagination";
import Link from "next/link";

export default function PedidosPage() {
    const [data, setData] = useState<any>([]);
    const [message, setMessage] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchPedidos = async (pagina = 1) => {
        try {
            setLoading(true);
            const res = await getPedidosOfActividadActual(pagina);
            if (res.success) {
                setMessage(res.message);
                setData(res.data);
                setPagination(res.data.pagination);
            }
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos(page);
    }, [page]);

    if (loading) return <Loading />;

    return (
        <div>
            <h4 className="fw-bold my-3">Pedidos</h4>
            <p className="small">Aquí puedes revisar los pedidos de la actividad en curso.</p>

            {data.pedidos.length === 0 ? (
                <div className="bg-white my-4 p-4 rounded small">
                    <div className="text-center">
                        <p>{message}</p>
                        {!data.actividad && (
                            <Link href="/admin" className="btn btn-sm btn-dark text-white">
                                Crear actividad
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 small">
                        {data.pedidos.map((pedido) => (
                            <PedidoCard key={pedido.id} pedido={pedido} onUpdate={fetchPedidos} />
                        ))}
                    </div>
                    <Pagination pagination={pagination} onPageChange={setPage} />
                </>
            )}
        </div>
    );
}
