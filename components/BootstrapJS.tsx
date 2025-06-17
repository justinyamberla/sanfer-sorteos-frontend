'use client'

import {useEffect} from "react";

const BootstrapJS = () => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle");
    }, []);

    return (
        <>
        </>
    );
}

export default BootstrapJS;