import React from "react";

export const ActivitySummary = ({ disponibles, reservados, vendidos }) => {
    return (
        <div className="row small">
            <div className="col-md-6 col-xl-4">
                <div className="card bg-white my-2 p-3 border-0 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="widget-content-left">
                            <div className="widget-heading fw-semibold text-success">Disponibles</div>
                            <div className="widget-subheading opacity-75">Total boletos disponibles</div>
                        </div>
                        <div className="widget-content-right">
                            <div className="widget-numbers text-success h5 fw-semibold">{disponibles}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-4">
                <div className="card bg-white my-2 p-3 border-0 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="widget-content-left">
                            <div className="widget-heading fw-semibold text-primary">Reservados</div>
                            <div className="widget-subheading opacity-75">Total boletos reservados</div>
                        </div>
                        <div className="widget-content-right">
                            <div className="widget-numbers text-primary h5 fw-semibold">{reservados}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-4">
                <div className="card bg-white my-2 p-3 border-0 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="widget-content-left">
                            <div className="widget-heading fw-semibold text-danger">Vendidos</div>
                            <div className="widget-subheading opacity-75">Total boletos vendidos</div>
                        </div>
                        <div className="widget-content-right">
                            <div className="widget-numbers text-danger h5 fw-semibold">{vendidos}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitySummary;