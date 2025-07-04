export type FormData = {
    numeroPedido: number;
    fecha: string;
    producto: string;
    cantidad: number;
    precio: number;
    total: number;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    provincia: string;
    ciudad: string;
    recibirNotificaciones: boolean;
    metodoPago: "transferencia" | "tarjeta";
};

export type ActividadData = {
    id: string;
    nombre: string;
    titulo: string;
    precio_boleto: number;
    boletos_disponibles: number;
}