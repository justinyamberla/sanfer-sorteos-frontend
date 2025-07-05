import { format } from "date-fns";
import es from "date-fns/locale/es";
import { Badge, Card, Col, Row, Button } from "react-bootstrap";

export default function PedidoCard({ pedido }) {
    const {
        numero_pedido,
        cliente,
        fecha_pedido,
        fecha_pago,
        fecha_expiracion,
        producto,
        metodo_pago,
        total,
        cantidad_boletos,
        estado,
        actividad_id,
    } = pedido;

    const formatDate = (dateString) =>
        dateString ? format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es }) : "N/A";

    const getEstadoVariant = () => {
        switch (estado) {
            case "pendiente":
                return "warning";
            case "aprobado":
                return "success";
            default:
                return "danger";
        }
    };

    return (
        <Card className="mb-4 shadow bg-white border-0">
            <Card.Body>
                <Row className="mb-3">
                    <Col>
                        <Badge bg="dark" className="text-capitalize p-2">Actividad {actividad_id}</Badge>{" "}
                        <Badge bg={getEstadoVariant()} className="text-capitalize text-dark p-2">
                            {estado}
                        </Badge>
                    </Col>
                </Row>

                <Row>
                    <Row>
                        <Col md={5}>
                            <p className="mb-1"><strong>Número de pedido:</strong> <strong className="text-primary">{numero_pedido}</strong></p>
                            <p className="mb-1"><strong>Cliente:</strong> {cliente.nombres} {cliente.apellidos}</p>
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
                    <Button variant="danger" size="sm" className="text-white mx-2">Cancelar</Button>
                    <Button variant="primary" size="sm" className="text-white mx-2">Aprobar</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

