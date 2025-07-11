import { format } from "date-fns";
import es from "date-fns/locale/es";
import { Badge, Card, Col, Row, Button, Modal } from "react-bootstrap";
import { approvePedido, cancelPedido } from "@/services/PedidoService";
import toast from "react-hot-toast";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function PedidoCard({ pedido, onUpdate }) {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {
        numero_pedido,
        cliente_nombres,
        cliente_apellidos,
        cliente_email,
        cliente_telefono,
        cliente_direccion,
        cliente_ciudad,
        cliente_provincia,
        fecha_pedido,
        fecha_pago,
        fecha_expiracion,
        producto,
        metodo_pago,
        total,
        cantidad_boletos,
        estado,
        actividad_id,
        actividad_nombre,
        boletos
    } = pedido;

    const formatDate = (dateString) =>
        dateString ? format(new Date(dateString), "dd MMM yyyy, HH:mm:ss", { locale: es }) : "N/A";

    const getEstadoVariant = () => {
        switch (estado) {
            case "pendiente":
                return "warning";
            case "pagado":
                return "success";
            default:
                return "danger";
        }
    };

    const aprobarPedido = async () => {
        confirm("¿Estás seguro de aprobar este pedido?");

        if (!confirm) return;

        setLoading(true);
        const res = await approvePedido(numero_pedido);

        if (res.success) {
            toast.success(res.message);
            onUpdate();
        } else {
            toast.error(res.message || "Error al procesar el pedido");
        }

        setLoading(false);
    }

    const cancelarPedido = async () => {
        if (!confirm("¿Estás seguro de cancelar este pedido?")) return;

        setLoading(true);
        const res = await cancelPedido(numero_pedido);

        if (res.success) {
            toast.success(res.message);
            onUpdate();
        } else {
            toast.error(res.message || "Error al cancelar el pedido");
        }

        setLoading(false);
    }

    if (loading) return <Loading />;

    return (
        <>
            <Card className="mb-4 shadow bg-white border-0">
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <Badge bg="dark" className="text-capitalize p-2">{actividad_nombre}</Badge>{" "}
                            <Badge bg={getEstadoVariant()} className="text-capitalize text-white p-2">
                                {estado}
                            </Badge>
                        </Col>
                    </Row>

                    <Row>
                        <Row>
                            <Col md={5}>
                                <p className="mb-1"><strong>Número de pedido:</strong> <strong className="text-primary">{numero_pedido}</strong></p>
                                <p className="mb-1"><strong>Cliente:</strong> {cliente_nombres} {cliente_apellidos}</p>
                                <p className="mb-1"><strong>Fecha de pedido:</strong> {formatDate(fecha_pedido)}</p>
                                <p className="mb-1"><strong>Fecha de expiración:</strong> {formatDate(fecha_expiracion)}</p>
                                <p className="mb-1"><strong>Fecha de pago:</strong> {formatDate(fecha_pago)}</p>
                            </Col>

                            <Col md={7}>
                                <p className="mb-1"><strong>Producto:</strong> {producto}</p>
                                <p className="mb-1"><strong>Precio unitario:</strong> ${(parseFloat(total) / cantidad_boletos).toFixed(2)}</p>
                                <p className="mb-1"><strong>Cantidad:</strong> {cantidad_boletos}</p>
                                <p className="mb-1"><strong>Total:</strong> <strong className="text-primary">${total}</strong></p>
                                <p className="mb-1"><strong>Método de pago:</strong> <strong className="text-primary text-capitalize">{metodo_pago}</strong></p>
                            </Col>
                        </Row>
                    </Row>

                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            variant="dark"
                            size="sm"
                            className="text-white mx-2"
                            onClick={() => setShowModal(!showModal)}
                        >
                            Ver más detalles
                        </Button>
                        {estado === "pendiente" && (
                            <>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="text-white mx-2"
                                    onClick={cancelarPedido}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="text-white mx-2"
                                    onClick={aprobarPedido}
                                >
                                    Aprobar
                                </Button>
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold fs-6">Detalles del pedido <span className="text-primary">{numero_pedido}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white small">
                    <Row>
                        <Col md={6}>
                            <p className="m-1"><strong>Cliente:</strong> {cliente_nombres} {cliente_apellidos}</p>
                            <p className="m-1"><strong>Teléfono:</strong> {cliente_telefono}</p>
                            <p className="m-1"><strong>Correo:</strong> {cliente_email}</p>
                            <p className="m-1"><strong>Fecha de pedido:</strong> {formatDate(fecha_pedido)}</p>
                            <p className="m-1"><strong>Fecha de expiración:</strong> {formatDate(fecha_expiracion)}</p>
                            <p className="m-1"><strong>Fecha de pago:</strong> {formatDate(fecha_pago)}</p>
                        </Col>
                        <Col md={6}>
                            <p className="m-1"><strong>Producto:</strong> {producto}</p>
                            <p className="m-1"><strong>Precio unitario:</strong> ${(parseFloat(total) / cantidad_boletos).toFixed(2)}</p>
                            <p className="m-1"><strong>Total:</strong> <strong className="text-primary">${total}</strong></p>
                            <p className="m-1"><strong>Método de pago:</strong> <strong className="text-primary text-capitalize">{metodo_pago}</strong></p>
                        </Col>
                    </Row>
                    <hr />
                    <p><strong>Boletos asignados:</strong></p>
                    <div className="d-flex flex-wrap gap-2">
                        {boletos?.map((boleto, i) => (
                            <span key={i} className="badge bg-dark p-2 fs-6">{boleto}</span>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

