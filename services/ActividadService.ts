import { BASE_URL_API } from "@/lib/baseUrl";

export async function getActividades() {
    try {
        const res = await fetch(`${BASE_URL_API}/actividad/actual`, {cache: "no-store"});
        const data = await res.json();
        console.log("Respuesta de getActividades:", data);

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? "Operación exitosa",
        };
    } catch (error: any) {
        console.error("Error en getActividades:", error);
        return {
            success: false,
            data: null,
            message: error.message || "Ocurrió un error inesperado",
        };
    }
}
