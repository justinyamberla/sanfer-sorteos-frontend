export function filepondLoadHandler(source, load, error, progress, abort) {
    // Crear el request para obtener la imagen desde la URL
    const controller = new AbortController();

    fetch(source, {
        method: 'GET',
        signal: controller.signal,
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error al cargar imagen');
            }

            // Para progreso (aunque fijo, FilePond lo necesita)
            const contentLength = res.headers.get('Content-Length') || 1024;
            progress(true, 0, parseInt(contentLength));

            return res.blob();
        })
        .then((blob) => {
            const extension = source.split('.').pop()?.split('?')[0] || 'jpg';
            const filename = source.split('/').pop()?.split('?')[0] || `file.${extension}`;

            const file = new File([blob], filename, { type: blob.type });
            load(file);
        })
        .catch((err) => {
            console.error('Error en FilePond load:', err);
            error('No se pudo cargar la imagen');
        });

    // Exponer método abort para permitir cancelación
    return {
        abort: () => {
            controller.abort(); // Cancela el fetch
            abort(); // Informa a FilePond
        },
    };
}
