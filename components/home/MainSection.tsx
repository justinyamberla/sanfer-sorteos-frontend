'use client';

import { ProgressBar, Carousel } from "react-bootstrap";
import { use } from "react";
import { BASE_URL_STORAGE } from "@/lib/baseUrl";

export const MainSection = ({ actividad }) => {

    const { data } = use(actividad);

    const vendidos = data.boletos_vendidos;
    const generados = data.boletos_generados;
    const porcentaje = vendidos > 0 ? (vendidos / generados) * 100 : 0;

    return (
        <section id="mainSection" className="pt-4 pb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <span className="badge bg-dark mb-3 py-2">Actividad {data.id}</span>
                        <h5 className="display-6 fw-bold">
                            {data.titulo}
                        </h5>
                        <p className="lead fw-light mb-4">
                            {data.descripcion}
                        </p>

                        <ProgressBar
                            animated
                            now={porcentaje < 5 ? 5 : porcentaje}
                            style={{ height: '25px' }}
                            label={`${Math.round(porcentaje)}% vendido`}
                            visuallyHidden={porcentaje < 5}
                            className="shadow mb-2"
                        />
                        <small className="fw-semibold fs-6">Quedan {data.boletos_disponibles} boletos disponibles</small>

                        <div className="d-flex mt-5 gap-3">
                            <a
                                type="button"
                                href="#instructionsSection"
                                className="btn btn-dark px-4 shadow"
                            >
                                Comprar boletos
                            </a>
                            <button
                                className="btn btn-outline-primary px-4"
                                onClick={() => alert("Aún no se ha iniciado el sorteo")}
                            >
                                Ver sorteo
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6 text-center">
                        <Carousel interval={3000} pause="hover" indicators={false}>
                            {data.imagenes.map((img, index) => (
                                <Carousel.Item key={img.id}>
                                    <img
                                        className="d-block w-100 rounded shadow"
                                        src={BASE_URL_STORAGE + img.url}
                                        alt={img.nombre}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainSection;