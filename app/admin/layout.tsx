import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LateralNavbar from "@/components/admin/LateralNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-vh-100 w-100 container">
            <Row className="h-100">
                <Col md={3} className="py-2">
                    <LateralNavbar />
                </Col>
                <Col md={9} className="py-2">
                    <div className="h-100">
                        {children}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
