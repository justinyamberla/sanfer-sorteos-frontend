'use client';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg shadow sticky-top bg-body-tertiary">
            <div className="container">
                {/* Logo a la izquierda */}
                <a className="navbar-brand fw-bold d-flex justify-content-center align-items-center" href="#">
                    <img src="/images/logo.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-top me-2" />
                    MiSorteo
                </a>

                {/* Botón de colapso para móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Enlaces centrados */}
                {/*<div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active fw-semibold" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sorteos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Consultar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contacto</a>
                        </li>
                    </ul>
                </div>*/}
            </div>
        </nav>
    );
};

export default Navbar;
