'use client';

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container text-md-left">
                <div className="row">

                    {/* Columna 1: Logo y descripción */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <img src="/images/logo.png" alt="Logo" width="30" height="30" className="mb-2"/>
                        <h6 className="text-uppercase fw-bold">MiSorteo</h6>
                        <p className="fw-light">
                            Participa y gana premios increíbles. Compra tus boletos en línea de forma segura y rápida.
                        </p>
                    </div>

                    {/* Columna 2: Acerca de */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Acerca de</h6>
                        <p>
                            <Link href="#" className="text-white fw-light text-decoration-none link-primary">
                                Política de privacidad
                            </Link>
                        </p>
                        <p>
                            <Link href="#" className="text-white fw-light text-decoration-none link-primary">
                                Términos y condiciones
                            </Link>
                        </p>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Contacto</h6>
                        <p>
                            <a href="tel:+593991234567"
                               className="text-white fw-light text-decoration-none link-primary">
                                <i className="bi bi-telephone"></i> +593 99 999 999
                            </a>
                        </p>
                        <p>
                            <a href="mailto:contacto@misorteo.com"
                               className="text-white fw-light text-decoration-none link-primary">
                                <i className="bi bi-envelope"></i> contacto@misorteo.com
                            </a>
                        </p>
                    </div>

                    {/* Columna 4: Redes sociales */}
                    <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3">Síguenos</h6>
                        <a
                            href="#"
                            className="text-white fw-light text-decoration-none link-primary me-3 fs-5"
                        >
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a
                            href="#"
                            className="text-white fw-light text-decoration-none link-primary me-3 fs-5"
                        >
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a
                            href="#"
                            className="text-white fw-light text-decoration-none link-primary me-3 fs-5"
                        >
                            <i className="bi bi-twitter-x"></i>
                        </a>
                        <a
                            href="#"
                            className="text-white fw-light text-decoration-none link-primary fs-5"
                        >
                            <i className="bi bi-youtube"></i>
                        </a>
                    </div>
                </div>

                {/* Línea divisora */}
                <hr className="my-4 border-light" />

                {/* Copyright */}
                <div className="text-center pb-2">
                    <small>© {new Date().getFullYear()} <strong>FalconFreaks Studios</strong>. Todos los derechos reservados.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
