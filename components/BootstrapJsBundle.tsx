'use client'

import { useEffect } from "react";

const BootstrapJsBundle = () => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle");
    }, []);

    return (
        <>
        </>
    );
}

export default BootstrapJsBundle;