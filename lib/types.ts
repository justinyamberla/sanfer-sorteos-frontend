export type FormData = {
    numeroPedido: number;
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