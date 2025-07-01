import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 9999
            }}
        >
            <Spinner animation="border" variant="primary" />
        </div>
    );
}
