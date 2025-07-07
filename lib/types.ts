export type FormData = {
    numero_pedido?: number; // opcional, lo asigna el backend
    actividad_id: number;
    precio: number;
    cantidad_boletos: number;
    total: number;
    metodo_pago: "offline" | "tarjeta" | null;
    fecha_pedido?: string; // opcional, si quieres mostrarla

    // Datos del cliente integrados directamente
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion?: string;
    provincia?: string;
    ciudad?: string;
    recibir_notificaciones: boolean;

    // Extra opcional para mostrar en frontend
    producto?: string;
};

export type ActividadData = {
    id: string;
    nombre: string;
    titulo: string;
    precio_boleto: number;
    boletos_disponibles: number;
}