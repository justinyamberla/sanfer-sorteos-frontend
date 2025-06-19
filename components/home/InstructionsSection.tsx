'use client';

import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import actividad from "@/public/images/actividad.png";

export const InstructionsSection = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <section id="instructionsSection" className="py-5">
            <div className="container text-center">
                <h2 className="mb-4 fw-bold">¿CÓMO PARTICIPAR?</h2>
                <div className="row">
                    {/* Paso 1 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body bg-white">
                                <div className="mb-3">
                                    <span className="badge bg-primary fs-5 px-3 py-2">1</span>
                                </div>
                                <p className="card-text">
                                    Selecciona el paquete de números que desees. Recuerda que mientras más números tengas, ¡más oportunidades tendrás de ganar!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body bg-white">
                                <div className="mb-3">
                                    <span className="badge bg-primary fs-5 px-3 py-2">2</span>
                                </div>
                                <p className="card-text">
                                    Serás redirigido a una página donde seleccionarás tu forma de pago y llenarás tus datos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow border-0">
                            <div className="card-body bg-white">
                                <div className="mb-3">
                                    <span className="badge bg-primary fs-5 px-3 py-2">3</span>
                                </div>
                                <p className="card-text">
                                    Una vez realizado el pago, se asignarán automáticamente tus números aleatorios. Los recibirás por correo (revisa spam). También podrás verlos en la sección «Consulta tus números».
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Botón que dispara el modal */}
                <div className="py-3">
                    <button
                        className="btn btn-dark text-white"
                        onClick={() => setShowModal(true)}
                    >
                        Ver tutorial de compra
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold fs-5">Tutorial de pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="text-center">Pago por transferencia</h5>
                    <div className="bg-white shadow border-0 h-100 mb-3 text-center">
                        <Image
                            src={actividad}
                            alt="Actividad"
                            width={500}
                            style={{ height: "auto", maxWidth: "100%" }}
                        />
                    </div>
                    <h5 className="text-center">Pago por tarjeta</h5>
                    <div className="bg-white shadow border-0 h-100 mb-3 text-center">
                        <Image
                            src={actividad}
                            alt="Actividad"
                            width={500}
                            style={{ height: "auto", maxWidth: "100%" }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default InstructionsSection;
