import Link from "next/link";

interface OrderCardProps {
    quantity: string | null;
}

const UNIT_PRICE = 1; // Precio por boleto

export const OrderCard = ({ quantity }: OrderCardProps) => {
    const qty = Number(quantity) || 0;
    const total = qty * UNIT_PRICE;

    return (
        <div className="row g-2 bg-white p-4 shadow rounded-4">
            <div className="card-body">
                <h5 className="fw-semibold mb-3">Resumen del pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold me-2">Producto: </span>
                    <span className="text-end">Números Mitsubishi L200 4x4 + KTM Duke 250 + Honda Navi | Actividad #30</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Cantidad:</span>
                    <span>{qty} boleto(s)</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Precio unitario:</span>
                    <span>${UNIT_PRICE.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-primary">${total.toFixed(2)}</strong>
                </div>

                <div className="mt-4">
                    <Link href="/#ticketsPurchaseSection" scroll className="btn btn-outline-secondary w-100">
                        Editar cantidad
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
