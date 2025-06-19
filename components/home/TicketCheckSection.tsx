'use client';

export const TicketCheckSection = () => {
    return (
        <section id="ticketCheckSection" className="py-5 mb-4 bg-dark text-white rounded-4">
            <div className="container">
                <div className="p-4 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold mb-3">CONSULTA TUS NÚMEROS</h2>
                    <p className="mb-4">Ingresa tu correo electrónico para consultar tus números</p>

                    <form className="row w-100 justify-content-center">
                        <div className="col-12 col-md-6 mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo electrónico"
                                aria-label="Correo electrónico"
                                required
                            />
                        </div>
                        <div className="col-12 col-md-auto">
                            <button
                                className="btn btn-primary text-white w-100"
                                type="submit"
                            >
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
