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

            <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card bg-white shadow border-0 h-100">
                        <Image
                            src={actividad}
                            height={700}
                            alt={`Actividad`}
                            className="card-img-top"
                        />
                        {/* <iframe className="card-img-top" src="..." /> <-- futuro reemplazo si deseas */}
                        <div className="card-body">
                            <h5 className="card-title">Actividad</h5>
                            <p className="card-text">
                                Descripción breve de la actividad número. Puedes modificar esto con más info.
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className="text-white" onClick={() => setShowModal(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default InstructionsSection;
