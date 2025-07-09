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
                actividad: data.actividadExists ?? false,
                pedidos: data.pedidos ?? [],
                pagination: data.pagination,
            },
            message: data.message,
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

export async function createPedidoOnline(formData: FormData) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/online`, {
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
        console.error("Error en createPedidoOnline:", error);
        return {
            success: false,
            data: null,
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

export async function prepareTransaction(formData: FormData) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/prepare`, {
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
        console.error("Error en prepareTransaction:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}

export async function confirmTransaction(id: number, clientTxId: string) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                clientTxId,
            }),
            cache: "no-store",
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Confirmación exitosa",
        };
    } catch (error: any) {
        console.error("Error en confirmTransaction:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Error al confirmar transacción",
        };
    }
}

export async function cancelTransaction(clientTxId: string) {
    try {
        const res = await fetch(`${BASE_URL_API}/pedidos/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientTxId,
            }),
            cache: "no-store",
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Cancelación exitosa",
        };
    } catch (error: any) {
        console.error("Error en cancelTransaction:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Error al cancelar transacción",
        };
    }
}



