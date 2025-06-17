'use client';

import Image from 'next/image';
import exampleImg from '@/public/images/mainImage.jpeg';

export const MainSection = ({props}) => {
    return (
        <section id="mainSection" className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* Columna izquierda: texto */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <span className="badge bg-dark mb-3 py-2">Actividad 1</span>
                        <h5 className="display-6 fw-bold">
                            JUEGA MITSUBISHI L200 4X4 + KTM DUKE 250 + HONDA NAVI
                        </h5>
                        <p className="lead fw-light mb-4">
                            ¡Cantidades limitadas!
                        </p>

                        {/* Barra de progreso */}
                        <div className="progress mb-2 shadow" style={{ height: '25px' }}>
                            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{ width: '65%' }}>
                                65% vendidos
                            </div>
                        </div>
                        <small className="fw-semibold fs-6">Quedan 35 boletos disponibles</small>

                        {/* Botones */}
                        <div className="d-flex mt-5 gap-3">
                            <a type="button" href="#ticketsSection" className="btn btn-dark px-4 shadow">Comprar boletos</a>
                            <button className="btn btn-outline-primary px-4">Ver sorteo</button>
                        </div>
                    </div>

                    {/* Columna derecha: imagen o carrusel */}
                    <div className="col-md-6 text-center">
                        {/* Puedes cambiar por un carrusel de Bootstrap si prefieres */}
                        <div id="carouselExample" className="carousel slide shadow">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <Image
                                        src={exampleImg}
                                        alt="Premios del sorteo"
                                        className="img-fluid rounded shadow"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <Image
                                        src={exampleImg}
                                        alt="Premios del sorteo"
                                        className="img-fluid rounded shadow"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <Image
                                        src={exampleImg}
                                        alt="Premios del sorteo"
                                        className="img-fluid rounded shadow"
                                    />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainSection;