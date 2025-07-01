'use client';

import React, {useEffect, useState} from "react";
import {Badge, Spinner, Button, Form, Row, Col} from "react-bootstrap";
import {getActividadActual} from "@/services/ActividadService";
import Loading from "@/components/Loading";

export const AdminHome = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchData();
    }, []);

    if (loading || !data) {
        return <Loading />;
    }

    return (
      <div>
          <h4 className="fw-bold my-3">Actividad actual</h4>
          <p className="small">Aquí puedes revisar y editar la información de la actividad en curso.</p>
          <button className="btn btn-sm btn-dark text-white">Crear actividad</button>

          <div className="bg-white my-4 p-4 rounded small">
              <div className="mb-4 d-flex gap-2 align-items-center">
                  <Badge bg="dark">Actividad #{data.id}</Badge>
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
                              <Form.Control size="sm" type="date" defaultValue={data.fecha_inicio} />
                          </Form.Group>
                      </Col>
                      <Col md={4}>
                          <Form.Group controlId="fecha_fin">
                              <Form.Label className="fw-semibold">Fecha fin</Form.Label>
                              <Form.Control size="sm" type="date" defaultValue={data.fecha_fin || ""} />
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
                          <Form.Group controlId="precio_boleto">
                              <Form.Label className="fw-semibold">Precio por boleto</Form.Label>
                              <Form.Control size="sm" type="number" step="0.01" defaultValue={data.precio_boleto} />
                          </Form.Group>
                      </Col>
                      <Col md={4}>
                          <Form.Group controlId="boletos_generados">
                              <Form.Label className="fw-semibold">Boletos generados</Form.Label>
                              <Form.Control size="sm" type="number" defaultValue={data.boletos_generados} />
                          </Form.Group>
                      </Col>
                      <Col md={4}>
                          <Form.Group controlId="boletos_ganadores">
                              <Form.Label className="fw-semibold">Número de ganadores</Form.Label>
                              <Form.Control size="sm" type="number" defaultValue={data.boletos_ganadores} />
                          </Form.Group>
                      </Col>
                  </Row>

                  <Row className="mb-3">
                      <Col md={6}>
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
      </div>
    );
}

export default AdminHome;

