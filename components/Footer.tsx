'use client';

export const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container text-md-left">
                <div className="row">

                    {/* Columna 1: Logo y descripción */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <img src="/images/logo.png" alt="Logo" width="30" height="30" className="mb-2" />
                        <h6 className="text-uppercase fw-bold">MiSorteo</h6>
                        <p>
                            Participa y gana premios increíbles. Compra tus boletos en línea de forma segura y rápida.
                        </p>
                    </div>

                    {/* Columna 2: Acerca de */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Acerca de</h6>
                        <p><a href="#" className="text-white text-decoration-none">Política de privacidad</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Términos y condiciones</a></p>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Contacto</h6>
                        <p>📞 +593 99 123 4567</p>
                        <p>✉️ contacto@misorteo.com</p>
                    </div>

                    {/* Columna 4: Redes sociales */}
                    <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Síguenos</h6>
                        <a href="#" className="text-white me-3 fs-5"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-white me-3 fs-5"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="text-white me-3 fs-5"><i className="bi bi-twitter-x"></i></a>
                        <a href="#" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
