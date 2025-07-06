import { BASE_URL_API } from "@/lib/baseUrl";
import { FormData } from "@/lib/types";

export async function getPedidosOfActividadActual(actividadId: string | number, page = 1) {
    try {
        const res = await fetch(`${BASE_URL_API}/actividades/actual/pedidos?page=${page}`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();
        return {
            success: true,
            data: {
                pedidos: data.pedidos ?? [],
                pagination: data.pagination,
            },
            message: "Pedidos obtenidos exitosamente",
        };
    } catch (error: any) {
        console.error("Error en getPedidosOfActividad:", error);
        return {
            success: false,
            data: { pedidos: [], pagination: null },
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function createPedidoOffline(formData: FormData) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/offline`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            cache: "no-store",
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en createPedidoOffline:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function approvePedido(numeroPedido) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/${numeroPedido}/aprobar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || data.success === false) {
            throw new Error(data.message || "No se pudo aprobar el pedido.");
        }

        return {
            success: true,
            data: data.data ?? null,
            message: data.message ?? "Pedido aprobado exitosamente",
        };
    } catch (error: any) {
        console.error("Error en approvePedido:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado al aprobar",
        };
    }
}

export async function cancelPedido(numeroPedido) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/${numeroPedido}/cancelar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || data.success === false) {
            throw new Error(data.message || "No se pudo cancelar el pedido.");
        }

        return {
            success: true,
            data: data.data ?? null,
            message: data.message ?? "Pedido cancelado exitosamente",
        };
    } catch (error: any) {
        console.error("Error en cancelPedido:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado al cancelar",
        };
    }
}