'use client';

export const TicketsSection = () => {
    return (
        <section className="py-5">
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

                {/* Sección personalizada de cantidad */}
                <div className="bg-white p-4 rounded shadow">
                    <h4 className="fw-bold mb-3">¿Más números?</h4>
                    <form className="d-flex align-items-center flex-wrap gap-3">
                        <label className="mb-0">Agrega la cantidad de boletos que deseas comprar:</label>
                        <input
                            type="number"
                            className="form-control w-50"
                            min="1"
                            placeholder="Ej. 45"
                        />
                        <button className="btn btn-success text-white">Comprar</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default TicketsSection;
