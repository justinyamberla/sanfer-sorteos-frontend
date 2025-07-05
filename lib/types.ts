export type FormData = {
    cliente: {
        nombres: string;
        apellidos: string;
        email: string;
        telefono: string;
        direccion: string;
        provincia: string;
        ciudad: string;
        recibirNotificaciones: boolean;
    };
    pedido: {
        numeroPedido: number; // opcional, si lo asigna el backend, puedes usar `number | null`
        fecha: string;
        producto: string;
        actividad_id: number; // nuevo, requerido para el POST
        cantidad: number;
        precio: number;
        total: number;
        metodoPago: "offline" | "tarjeta" | null;
    };
};


export type ActividadData = {
    id: string;
    nombre: string;
    titulo: string;
    precio_boleto: number;
    boletos_disponibles: number;
}