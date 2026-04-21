import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./ViewPatient.css";
import axios from "axios";

interface Agenda {
  _id: string;
  email_paciente: string;
  email_doctor: string;
  date: string;
  atencion: boolean;
}

function ViewPatient(props: { setLogout: any; setScreen: any; username: any }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [modalData, setModalData] = useState<Agenda | null>(null);

  const openModal = (data: Agenda) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const cancelAppointment = async () => {
    if (!modalData) return;
    try {
      await axios.delete(`http://localhost:4000/agenda/${modalData._id}`);
      setAgendas(agendas.filter(a => a._id !== modalData._id));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/agenda/patient/${props.username}`);
        setAgendas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendas();
  }, [props.username]);

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <h1 className="appointments-title">Horas reservadas</h1>
      </header>

      <div className="appointments-user-info">
        <div>
          <div className="appointments-user-label">Paciente</div>
          <div className="appointments-user-value">{props.username}</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : agendas.length === 0 ? (
        <div className="p-4 text-center">
          <p>No tienes horas reservadas</p>
        </div>
      ) : (
        <div className="appointments-table-wrapper">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Doctor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {agendas.map((agenda) => (
                <tr key={agenda._id}>
                  <td className="appointment-date">{agenda.date}</td>
                  <td>{agenda.email_doctor}</td>
                  <td>
                    <span className={`badge ${agenda.atencion ? 'bg-success' : 'bg-warning'}`}>
                      {agenda.atencion ? 'Atendido' : 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="appointment-action-btn"
                      onClick={() => openModal(agenda)}
                      title="Cancelar hora"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Anular Hora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && (
            <div>
              <p><strong>Fecha:</strong> {modalData.date}</p>
              <p><strong>Doctor:</strong> {modalData.email_doctor}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Mantener
          </button>
          <button className="btn btn-danger" onClick={cancelAppointment}>
            Cancelar hora
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewPatient;