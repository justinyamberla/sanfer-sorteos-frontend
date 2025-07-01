'use client';

import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Row, Col } from "react-bootstrap";
import { getActividadActual } from "@/services/ActividadService";
import Loading from "@/components/Loading";
import CreateActivityModal from "@/components/admin/CreateActivityModal";

export const AdminHome = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    async function fetchData() {
        try {
            const res = await getActividadActual();
            console.log(res)
            setData(res.data);
        } catch (err) {
            console.error("Error al cargar actividad:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
      <div>
          <h4 className="fw-bold my-3">Actividad actual</h4>
          <p className="small">Aquí puedes revisar y editar la información de la actividad en curso.</p>
          <div className="bg-white my-4 p-4 rounded small">
              {!data || data.length === 0 ? (
                  <div className="text-center">
                      <p>Aún no se ha creado una actividad.</p>
                      <button
                          className="btn btn-sm btn-dark text-white"
                          onClick={() => setShowModal(true)}
                      >
                          Crear actividad
                      </button>
                  </div>
              ) : (
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

                          <div className="d-flex justify-content-between mt-4">
                              <Button size="sm" variant="danger" className="text-white">Eliminar actividad</Button>
                              <div className="d-flex gap-2">
                                  <Button size="sm" variant="dark">Iniciar sorteo</Button>
                                  <Button size="sm" variant="primary" className="text-white" type="submit">Guardar</Button>
                              </div>
                          </div>
                      </Form>
                  </div>
              )}
          </div>

          <CreateActivityModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchData}
          />
      </div>
    );
}

export default AdminHome;

