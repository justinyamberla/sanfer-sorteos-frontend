'use client';

import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

import {createActividad} from "@/services/ActividadService";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

// Registrar plugins
registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform,
    FilePondPluginImageExifOrientation
);

export default function CreateActivityModal({ show, onClose, onSuccess }: { show: boolean; onClose: () => void; }) {

    const initialFormData = {
        nombre: '',
        titulo: '',
        descripcion: '',
        boletos_generados: '',
        boletos_ganadores: '',
        precio_boleto: '',
        imagenes: [] as File[],
    }

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        console.log("Submitting form data:", formData);
        const response = await createActividad(formData);

        if (response.success) {
            toast.success("Actividad creada exitosamente");
            setFormData(initialFormData);
            onSuccess();
            onClose();
        } else {
            toast.error(response.message || "Error al crear actividad");
        }

        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 fw-semibold">Crear actividad</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white small rounded">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="nombre">
                                <Form.Label className="fw-semibold">Nombre</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    minLength={10}
                                    maxLength={100}
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="titulo">
                                <Form.Label className="fw-semibold">Título</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    minLength={10}
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
                                    minLength={10}
                                    maxLength={500}
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className="mb-3">
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
                        <Col md={4} className="mb-3">
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
                        <Col md={4} className="mb-3">
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
                            <Form.Group controlId="imagenes" className="mb-3">
                                <Form.Label className="fw-semibold">Imágenes</Form.Label>
                                <FilePond
                                    files={formData.imagenes}
                                    onupdatefiles={(fileItems) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            imagenes: fileItems.map((fileItem) => fileItem.file),
                                        }));
                                    }}
                                    allowMultiple={true}
                                    acceptedFileTypes={['image/png', 'image/jpeg']}
                                    maxFiles={8}
                                    labelIdle='Arrastra tus imágenes o <span class="filepond--label-action">explora</span>'
                                    maxFileSize='4MB'
                                    className='file-uploader file-uploader-grid border-light bg-faded-light'
                                    required
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
