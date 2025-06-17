'use client';

export const InstructionsSection = () => {
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
                <div className="py-3">
                    <button className="btn btn-dark text-white">
                        Ver tutorial de compra
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InstructionsSection;
