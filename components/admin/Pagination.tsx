import { Button, ButtonGroup } from "react-bootstrap";

export default function Pagination({ pagination, onPageChange }) {
    const { current_page, last_page } = pagination;

    return (
        <div className="d-flex justify-content-end align-items-center mt-4 mb-4">
            <ButtonGroup size="sm">
                <Button
                    variant="secondary"
                    onClick={() => onPageChange(current_page - 1)}
                    disabled={current_page <= 1}
                >
                    Anterior
                </Button>

                <Button variant="light" disabled className="fw-semibold text-dark px-3">
                    Página {current_page} de {last_page}
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => onPageChange(current_page + 1)}
                    disabled={current_page >= last_page}
                >
                    Siguiente
                </Button>
            </ButtonGroup>
        </div>
    );
}
