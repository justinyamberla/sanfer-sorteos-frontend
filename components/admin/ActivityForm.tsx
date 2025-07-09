"use client";

import React, {useEffect, useState} from "react";
import {Badge, Button, Col, Form, Row} from "react-bootstrap";

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

import {FilePondInitialFile} from "filepond";
import {deleteActividad, updateActividad} from "@/services/ActividadService";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import {filepondLoadHandler} from "@/utils/filepondHandler";

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform,
    FilePondPluginImageExifOrientation
);

export const ActivityForm = ({ data, onSave }) => {

    const initialFormData = {
        id: data.id || 0,
        nombre: data.nombre || "",
        titulo: data.titulo || "",
        descripcion: data.descripcion || "",
        fecha_inicio: data.fecha_inicio.split(' ')[0] || "",
        fecha_agotado: data.fecha_agotado?.split(' ')[0] || "",
        fecha_sorteo: data.fecha_sorteo?.split(' ')[0] || "",
        fecha_fin: data.fecha_fin?.split(' ')[0] || "",
        url_live_sorteo: data.url_live_sorteo || "",
    }

    const [loading, setLoading] = useState(false);
    const [imagenes, setImagenes] = useState<FilePondInitialFile[]>([]);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (data && data.imagenes) {
            const files = data.imagenes.map(img => ({
                source: img.url,
                options: {
                    type: 'local',
                    metadata: {
                        id: img.uuid,
                        name: img.nombre,
                        size: img.tamano,
                        type: `image/${img.formato}`,
                    }
                }
            }));
            console.log("Imagenes iniciales:", files);
            setImagenes(files);
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleUpdateFiles = (fileItems) => {
        const files = fileItems.map(item => item.file).filter(Boolean);
        setImagenes(files); // solo Files (no objects con opciones)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await updateActividad(data.id, {
            ...formData,
            imagenes, // array de File directamente
        });

        if (response.success) {
            toast.success("Actividad actualizada exitosamente");
            onSave(); // Callback para actualizar el estado en el componente padre
        } else {
            toast.error(response.message || "Error al actualizar actividad");
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta actividad? Esta acción no se puede deshacer.");

        if (!confirmDelete) return;

        setLoading(true);
        const response = await deleteActividad(data.id);

        if (response.success) {
            toast.success("Actividad eliminada exitosamente");
            onSave(); // Callback para actualizar el estado en el componente padre
        } else {
            toast.error(response.message || "Error al eliminar actividad");
        }

        setLoading(false);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-white my-1 p-4 rounded shadow-sm small">
            <div className="mb-4 d-flex gap-2 align-items-center">
                <Badge bg="dark" className="p-2">{formData.nombre}</Badge>
                <Badge bg={data.estado === "activo" ? "primary" : "warning"} className="text-capitalize p-2">{data.estado}</Badge>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="nombre">
                            <Form.Label className="fw-semibold">Nombre</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
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
                                maxLength={100}
                                defaultValue={formData.titulo}
                                onChange={handleChange}
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
                                defaultValue={formData.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="imagenes" className="mb-4">
                            <Form.Label className="fw-semibold">Imágenes</Form.Label>
                            <FilePond
                                required
                                files={imagenes}
                                onupdatefiles={handleUpdateFiles}
                                server={{load: filepondLoadHandler}}
                                instantUpload={false}
                                maxFiles={8}
                                name="imagenes"
                                allowMultiple={true}
                                acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
                                maxFileSize='4MB'
                                labelIdle='Arrastra tus imágenes o <span class="filepond--label-action">explora</span>'
                                className='file-uploader file-uploader-grid border-light bg-faded-light'
                            />
                        </Form.Group>

                    </Col>
                </Row>

                <hr />
                <Row className="mb-4">
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="boletos_generados">
                            <Form.Label className="fw-semibold">Total de boletos generados</Form.Label>
                            <Form.Control size="sm" type="number" defaultValue={data.boletos_generados} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="boletos_ganadores">
                            <Form.Label className="fw-semibold">Toal de boletos ganadores</Form.Label>
                            <Form.Control size="sm" type="number" defaultValue={data.boletos_ganadores} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="precio_boleto">
                            <Form.Label className="fw-semibold">Precio por boleto</Form.Label>
                            <Form.Control size="sm" type="number" step="0.01" defaultValue={data.precio_boleto} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />
                <Row className="mb-4">
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="fecha_inicio">
                            <Form.Label className="fw-semibold">Fecha de inicio</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={data.fecha_inicio ? data.fecha_inicio.split(' ')[0] : ''} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="fecha_fin">
                            <Form.Label className="fw-semibold">Fecha agotado</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={data.fecha_fin ? data.fecha_fin.split(' ')[0] : ''} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />
                <Row className="mb-4">
                    <Col md={4} className="mb-2">
                        <Form.Group controlId="fecha_sorteo">
                            <Form.Label className="fw-semibold">Fecha sorteo</Form.Label>
                            <Form.Control
                                size="sm"
                                type="date"
                                defaultValue={formData.fecha_sorteo || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={8} className="mb-2">
                        <Form.Group controlId="url_live_sorteo">
                            <Form.Label className="fw-semibold">URL del sorteo en vivo</Form.Label>
                            <Form.Control
                                size="sm"
                                type="url"
                                defaultValue={formData.url_live_sorteo || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-between mt-5">
                    <Button
                        size="sm"
                        variant="danger"
                        className="text-white"
                        onClick={handleDelete}
                    >
                        Eliminar actividad
                    </Button>
                    <div className="d-flex gap-2">
                        <Button size="sm" variant="dark">Iniciar sorteo</Button>
                        <Button size="sm" variant="primary" className="text-white" type="submit">Guardar</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default ActivityForm;