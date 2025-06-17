'use client';

export const TicketCheckSection = () => {
    return (
        <section className="py-5 bg-dark text-white rounded-4">
            <div className="container">
                <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold mb-3">CONSULTA TUS NÚMEROS</h2>
                    <p className="mb-4">Ingresa tu correo electrónico para consultar tus números</p>
                    <form className="d-flex flex-wrap align-items-center justify-content-center gap-3 w-75">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo electrónico"
                                aria-label="Recipient’s username"
                                aria-describedby="button-addon2"
                            />
                                <button className="btn btn-primary text-white" type="button" id="button-addon2">
                                    Consultar
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TicketCheckSection;
