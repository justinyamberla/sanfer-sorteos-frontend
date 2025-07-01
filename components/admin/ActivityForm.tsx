"use client";

import React, {useEffect, useState} from "react";
import {Badge, Button, Col, Form, Row} from "react-bootstrap";
import { BASE_URL_STORAGE } from "@/lib/baseUrl";

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

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform,
    FilePondPluginImageExifOrientation
);

export const ActivityForm = ({ data, onSave, onCancel }) => {

    const [imagenes, setImagenes] = useState<FilePondInitialFile[]>([]);

    useEffect(() => {
        if (data && data.imagenes) {
            const files = data.imagenes.map((img) => ({
                source: `${BASE_URL_STORAGE}${img.url}`,
                options: {
                    type: 'local',
                    metadata: {
                        id: img.id
                    }
                }
            }));
            console.log(files)
            setImagenes(files);
        }
    }, [data]);

    return (
        <div>
            <div className="mb-4 d-flex gap-2 align-items-center">
                <Badge bg="dark">{data.nombre}</Badge>
                <Badge bg={data.estado === "activo" ? "primary" : "warning"} className="text-capitalize">{data.estado}</Badge>
            </div>
            <Form>
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="titulo">
                            <Form.Label className="fw-semibold">Título</Form.Label>
                            <Form.Control size="sm" type="text" maxLength={100} defaultValue={data.titulo} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="descripcion">
                            <Form.Label className="fw-semibold">Descripción</Form.Label>
                            <Form.Control size="sm" as="textarea" maxLength={500} defaultValue={data.descripcion} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="fecha_inicio">
                            <Form.Label className="fw-semibold">Fecha de inicio</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={data.fecha_inicio} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="fecha_fin">
                            <Form.Label className="fw-semibold">Fecha fin</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={data.fecha_fin || ""} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="fecha_sorteo">
                            <Form.Label className="fw-semibold">Fecha sorteo</Form.Label>
                            <Form.Control size="sm" type="date" defaultValue={data.fecha_sorteo || ""} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="boletos_generados">
                            <Form.Label className="fw-semibold">Total de boletos generados</Form.Label>
                            <Form.Control size="sm" type="number" defaultValue={data.boletos_generados} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="boletos_ganadores">
                            <Form.Label className="fw-semibold">Toal de boletos ganadores</Form.Label>
                            <Form.Control size="sm" type="number" defaultValue={data.boletos_ganadores} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="precio_boleto">
                            <Form.Label className="fw-semibold">Precio por boleto</Form.Label>
                            <Form.Control size="sm" type="number" step="0.01" defaultValue={data.precio_boleto} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="url_live_sorteo">
                            <Form.Label className="fw-semibold">URL del sorteo en vivo</Form.Label>
                            <Form.Control size="sm" type="url" defaultValue={data.url_live_sorteo || ""} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group controlId="imagenes" className="mb-4">
                            <Form.Label className="fw-semibold">Imágenes</Form.Label>
                            <FilePond
                                files={imagenes}
                                onupdatefiles={setImagenes}
                                maxFiles={10}
                                name="imagenes"
                                allowMultiple={true}
                                acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
                                labelIdle='Arrastra tus imágenes o <span class="filepond--label-action">explora</span>'
                                server={{
                                    load: (source, load, error, progress, abort, headers) => {
                                        const request = new XMLHttpRequest();
                                        request.open('GET', source, true);
                                        request.responseType = 'blob';

                                        request.onload = () => {
                                            if (request.status >= 200 && request.status < 300) {
                                                const blob = request.response;
                                                blob.type = request.getResponseHeader('Content-Type') || 'image/jpeg';
                                                load(blob);
                                            } else {
                                                error('Error al cargar la imagen');
                                            }
                                        };

                                        request.onerror = () => error('Error de red al cargar la imagen');
                                        request.onprogress = (event) => {
                                            if (event.lengthComputable) {
                                                progress(true, event.loaded, event.total);
                                            }
                                        };

                                        request.send();

                                        return {
                                            abort: () => {
                                                request.abort();
                                                abort();
                                            },
                                        };
                                    }
                                }}
                                className='file-uploader file-uploader-grid border-light bg-faded-light'
                            />
                        </Form.Group>

                    </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                    <Button size="sm" variant="danger" className="text-white">Eliminar actividad</Button>
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