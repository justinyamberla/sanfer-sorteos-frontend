interface OrderCardProps {
    quantity: string | null;
}

const UNIT_PRICE = 2; // Precio por boleto

export const OrderCard = ({ quantity }: OrderCardProps) => {
    const qty = Number(quantity) || 0;
    const total = qty * UNIT_PRICE;

    return (
        <div className="row g-2 bg-white p-4 shadow-sm rounded-4">
            <div className="card-body">
                <h5 className="fw-semibold mb-3">Resumen del pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">Producto:</span>
                    <span>Sorteo Especial</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">Cantidad:</span>
                    <span>{qty} boleto(s)</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">Precio unitario:</span>
                    <span>${UNIT_PRICE.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${total.toFixed(2)}</strong>
                </div>

                <div className="mt-4">
                    <a href="/" className="btn btn-outline-secondary w-100">
                        Editar cantidad
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
