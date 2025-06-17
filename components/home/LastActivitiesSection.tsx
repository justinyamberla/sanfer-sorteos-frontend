'use client';

import Image from "next/image";
import actividad from '@/public/images/actividad.png';

export const LastActivitiesSection = () => {
    return (
        <section id="lastActivitiesSection" className="py-5">
            <div className="container">
                <h2 className="fw-bold text-center mb-3">ACTIVIDADES ANTERIORES</h2>
                <p className="text-muted text-center mb-5">
                    Revisa nuestras actividades y sorteos anteriores
                </p>

                <div className="row g-5">
                    {[1, 2, 3].map((item) => (
                        <div className="col-md-4" key={item}>
                            <div className="card bg-white shadow border-0 h-100">
                                <Image
                                    src={actividad}
                                    height={700}
                                    alt={`Actividad ${item}`}
                                    className="card-img-top"
                                />
                                {/* <iframe className="card-img-top" src="..." /> <-- futuro reemplazo si deseas */}
                                <div className="card-body">
                                    <h5 className="card-title">Actividad #{item}</h5>
                                    <p className="card-text">
                                        Descripción breve de la actividad número {item}. Puedes modificar esto con más info.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LastActivitiesSection;
