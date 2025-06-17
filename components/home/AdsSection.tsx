'use client';

export const AdsSection = () => {
    return (
        <section id="adsSection" className="py-5">
            <div className="container">
                {/* Bloque Publicitario 1 */}
                <div className="mb-5">
                    <h2 className="fw-bold">¡Aquí va la publicidad!</h2>
                    <p className="text-muted mb-4">
                        Este es el espacio para publicidad.
                    </p>
                    <img
                        src="https://placehold.co/1280x400"
                        alt="Publicidad 1"
                        className="img-fluid rounded shadow"
                    />
                </div>

                {/* Bloque Publicitario 2 */}
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2 className="fw-bold">Publicidad Especial</h2>
                        <p className="text-muted">
                            Únete ahora y recibe contenido exclusivo, promociones y más. Esta es tu oportunidad de destacar.
                        </p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img
                            src="https://placehold.co/800x400"
                            alt="Publicidad 2"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdsSection;
