'use client';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function CreateActivityModal({ show, onClose }: { show: boolean; onClose: () => void; }) {

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha_sorteo: '',
        url_live_sorteo: '',
        boletos_generados: '',
        boletos_ganadores: '',
        precio_boleto: '',
        imagenes: [] as File[],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData((prev) => ({ ...prev, imagenes: files }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // enviar datos al backend
        console.log('Datos del formulario:', formData);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 fw-semibold">Crear nueva actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white small rounded">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="titulo">
                                <Form.Label className="fw-semibold">Título</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    maxLength={100}
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="descripcion">
                                <Form.Label className="fw-semibold">Descripción</Form.Label>
                                <Form.Control
                                    size="sm"
                                    as="textarea"
                                    maxLength={500}
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="boletos_generados">
                                <Form.Label className="fw-semibold">
                                    Total de boletos generados
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="number"
                                    value={formData.boletos_generados}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="boletos_ganadores">
                                <Form.Label className="fw-semibold">
                                    Total de boletos ganadores
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="number"
                                    value={formData.boletos_ganadores}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="precio_boleto">
                                <Form.Label className="fw-semibold">Precio por boleto</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="number"
                                    step="0.01"
                                    value={formData.precio_boleto}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={12}>
                            <Form.Group controlId="imagenes">
                                <Form.Label className="fw-semibold">Imágenes</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="me-2"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button size="sm" variant="primary" type="submit" className="text-white">
                            Crear actividad
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
