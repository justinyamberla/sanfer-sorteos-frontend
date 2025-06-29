'use client';

import React, { useState } from 'react';
import { Collapse, Button, ListGroup } from 'react-bootstrap';
import { useRouter, usePathname } from 'next/navigation';

export const LateralNavbar = () => {
    
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: 'Inicio', path: '/admin' },
        { label: 'Actividad', path: '/admin/actividad' },
        { label: 'Pedidos', path: '/admin/pedidos' },
        { label: 'Contenido del sitio', path: '/admin/contenido' },
        { label: 'Salir', path: '/logout' }
    ];

    return (
        <>
            <p className="fw-semibold fs-6 py-0 mt-3 text-sm-center text-md-start">Administrador</p>

            {/* Botón para móviles */}
            <div className="d-md-none text-center d-grid">
                <Button
                    variant="light"
                    className="mb-3 d-flex align-items-center justify-content-between w-100 fw-semibold opacity-75"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapseAccountMenu"
                    aria-expanded={open}
                >
                    Menú
                    <i className="bi bi-chevron-down"></i>
                </Button>

                <Collapse in={open}>
                    <div id="collapseAccountMenu">
                        <ListGroup>
                            {menuItems.map((item) => (
                                <ListGroup.Item
                                    key={item.path}
                                    action
                                    onClick={() => {
                                        router.push(item.path);
                                        setOpen(false);
                                    }}
                                    active={pathname === item.path}
                                    variant={pathname === item.path ? '' : 'light'}
                                    className="fw-semibold"
                                >
                                    {item.label}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Collapse>
            </div>

            {/* Menú fijo en escritorio */}
            <div className="d-none d-md-block">
                <ListGroup className="bg-primary">
                    {menuItems.map((item) => (
                        <ListGroup.Item
                            key={item.path}
                            action
                            onClick={() => router.push(item.path)}
                            active={pathname === item.path}
                            variant={pathname === item.path ? '' : 'light'}
                            className="fw-semibold"
                        >
                            {item.label}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </>
    );
};

export default LateralNavbar;