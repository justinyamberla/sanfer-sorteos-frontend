'use client';

import React, { useEffect, useState } from "react";
import { getActividadActual } from "@/services/ActividadService";
import Loading from "@/components/Loading";
import CreateActivityModal from "@/components/admin/CreateActivityModal";
import ActivityForm from "@/components/admin/ActivityForm";
import ActivitySummary from "@/components/admin/ActivitySummary";
import {Alert} from "react-bootstrap";

export const AdminHome = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    async function fetchData() {
        try {
            const res = await getActividadActual();
            setData(res.data);
        } catch (err) {
            console.error("Error al cargar actividad:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
      <div>
          <h4 className="fw-bold my-3">Actividad actual</h4>
          <p className="small">Aquí puedes revisar y editar la información de la actividad en curso.</p>
          {!data || data.length === 0 || data.estado === 'eliminado' ? (
              <div className="text-center bg-white my-4 p-4 rounded small">
                  <p>Aún no se ha creado una actividad.</p>
                  <button
                      className="btn btn-sm btn-dark text-white"
                      onClick={() => setShowModal(true)}
                  >
                      Crear actividad
                  </button>
              </div>
          ) : (
              <>
                  {data && data.boletos_vendidos === data.boletos_generados && (
                      <Alert variant="info" dismissible className="small">
                          <i className="bi bi-exclamation-circle-fill me-2 fs-6"></i>
                          ¡Atención! Todos los boletos han sido vendidos, ya puedes proceder a establecer una fecha para realizar el sorteo.
                      </Alert>
                  )}
                  <ActivitySummary
                      disponibles={data.boletos_disponibles}
                      reservados={data.boletos_reservados}
                      vendidos={data.boletos_vendidos}
                  />
                  <ActivityForm data={data} onSave={fetchData} />
              </>
          )}

          <CreateActivityModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchData}
          />
      </div>
    );
}

export default AdminHome;

