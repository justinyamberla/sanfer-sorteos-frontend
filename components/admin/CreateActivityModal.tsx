'use client';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function CreateActivityModal({ show, onClose }: { show: boolean; onClose: () => void }) {

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha_sorteo: '',
        url_live_sorteo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // enviar datos al backend aquí
        console.log('Enviar:', formData);
        onClose(); // cerrar modal después de enviar
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear nueva actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="titulo">
                                <Form.Label className="fw-semibold">Título</Form.Label>
                                <Form.Control size="sm" type="text" maxLength={100} value={formData.titulo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="descripcion">
                                <Form.Label className="fw-semibold">Descripción</Form.Label>
                                <Form.Control size="sm" as="textarea" maxLength={500} value={formData.descripcion} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="fecha_sorteo">
                                <Form.Label className="fw-semibold">Fecha sorteo</Form.Label>
                                <Form.Control size="sm" type="date" value={formData.fecha_sorteo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="url_live_sorteo">
                                <Form.Label className="fw-semibold">URL del sorteo en vivo</Form.Label>
                                <Form.Control size="sm" type="url" value={formData.url_live_sorteo} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button size="sm" variant="secondary" className="me-2" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button size="sm" variant="primary" type="submit">
                            Guardar actividad
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
