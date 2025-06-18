'use client';

export const TicketsSection = () => {
    return (
        <section id="ticketsSection" className="py-5">
            <div className="container">
                <h2 className="text-center fw-bold mb-2">ADQUIERE TUS BOLETOS</h2>
                <p className="text-center mb-5">El valor de cada boleto es de <strong>$1 USD</strong>.</p>

                {/* Cards de boletos */}
                <div className="row justify-content-center mb-3">
                    {/* Card x10 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-dark text-white fw-bold">
                                x10 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">$10 USD</h3>
                                <button className="btn btn-dark">Comprar</button>
                            </div>
                        </div>
                    </div>

                    {/* Card x20 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-primary text-white fw-bold">
                                x20 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">$20 USD</h3>
                                <button className="btn btn-dark text-white">Comprar</button>
                            </div>
                        </div>
                    </div>

                    {/* Card x10 */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-header bg-dark text-white fw-bold">
                                x30 boletos
                            </div>
                            <div className="card-body bg-white">
                                <h3 className="display-6 text-primary fw-bold mb-3">$30 USD</h3>
                                <button className="btn btn-dark">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded border shadow">
                    <h4 className="fw-bold mb-3">¿Más números?</h4>

                    <form className="row align-items-center">
                        <div className="col-12 col-md-auto mb-2 mb-md-0">
                            <label className="form-label mb-0">
                                Agrega la cantidad de boletos que deseas comprar:
                            </label>
                        </div>

                        <div className="col-12 col-md-4 mb-2 mb-md-0">
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                placeholder="Ej. 45"
                            />
                        </div>

                        <div className="col-12 col-md-auto">
                            <button className="btn btn-success w-100 text-white">Comprar</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TicketsSection;
