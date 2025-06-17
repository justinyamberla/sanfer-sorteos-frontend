'use client';

export const AwardsSection = () => {
    const ticketNumbers = [1011, 2012, 3073, 1404, 5445, 6406, 7047, 8048, 3909, 1001]; // ejemplo

    return (
        <section id="awardsSection" className="py-5 text-center">
            <div className="container">
                <h2 className="fw-bold mb-3">PREMIOS INSTANTÁNEOS</h2>
                <p className="mb-5">
                    ¡Hay 10 números bendecidos con premios en efectivo! Realiza tu compra y revisa si tienes uno de los siguientes números
                </p>

                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
                    {ticketNumbers.map((number, index) => (
                        <div className="col" key={index}>
                            <div className="card shadow border-dark text-center p-3 h-100">
                                <div className="card-body d-flex align-items-center justify-content-center">
                                    <span className="fw-bold fs-4 text-dark">{number}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
