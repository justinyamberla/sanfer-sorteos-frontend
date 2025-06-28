export type FormData = {
    numeroPedido: number;
    fecha: string;
    producto: string;
    cantidad: number;
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

export type Actividad = {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: string;
    hora: string;
    ubicacion: string;
    participantes: string[];
}