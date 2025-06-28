'use client';

import {usePathname} from "next/navigation";
import Link from "next/link";

export const Navbar = () => {

    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand-lg shadow sticky-top bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand fw-bold d-flex justify-content-center align-items-center" href="/">
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
                <div className="collapse navbar-collapse ms-4" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${pathname === '/' && 'active fw-semibold'}`}
                                href="/"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${pathname === '/terms-and-conditions' && 'active fw-semibold'}`}
                                href="/terms-and-conditions"
                            >
                                Términos y Condiciones
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
