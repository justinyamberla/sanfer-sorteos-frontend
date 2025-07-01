import { BASE_URL_API } from "@/lib/baseUrl";

export async function getActividadActual() {
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

export async function createActividad(formData) {
    try {
        const form = new FormData();

        // Campos básicos
        form.append('nombre', formData.nombre);
        form.append('titulo', formData.titulo);
        form.append('descripcion', formData.descripcion);
        form.append('fecha_inicio', formData.fecha_inicio);
        form.append('boletos_generados', formData.boletos_generados.toString());
        form.append('boletos_ganadores', formData.boletos_ganadores.toString());
        form.append('precio_boleto', formData.precio_boleto.toString());

        if (formData.url_live_sorteo) {
            form.append('url_live_sorteo', formData.url_live_sorteo);
        }

        // Imágenes (manejadas por FilePond)
        formData.imagenes.forEach((file) => {
            form.append('imagenes[]', file);
        });

        const res = await fetch(`${BASE_URL_API}/actividades`, {
            method: 'POST',
            body: form
        });

        const data = await res.json();

        return {
            success: data.success ?? res.ok,
            data: data.data ?? null,
            message: data.message ?? 'Actividad creada correctamente.',
        };
    } catch (error: any) {
        console.error('Error en createActividad:', error);
        return {
            success: false,
            data: null,
            message: error.message || 'Error inesperado al crear actividad',
        };
    }
}
