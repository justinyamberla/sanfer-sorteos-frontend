'use client';

import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Row, Col } from "react-bootstrap";
import { getActividadActual } from "@/services/ActividadService";
import Loading from "@/components/Loading";
import CreateActivityModal from "@/components/admin/CreateActivityModal";
import ActivityForm from "@/components/admin/ActivityForm";

export const AdminHome = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    async function fetchData() {
        try {
            const res = await getActividadActual();
            console.log(res)
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
          <div className="bg-white my-4 p-4 rounded small">
              {!data || data.length === 0 ? (
                  <div className="text-center">
                      <p>Aún no se ha creado una actividad.</p>
                      <button
                          className="btn btn-sm btn-dark text-white"
                          onClick={() => setShowModal(true)}
                      >
                          Crear actividad
                      </button>
                  </div>
              ) : (
                  <ActivityForm data={data} />
              )}
          </div>

          <CreateActivityModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchData}
          />
      </div>
    );
}

export default AdminHome;

