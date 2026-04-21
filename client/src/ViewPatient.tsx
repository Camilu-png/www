import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./ViewPatient.css";
import axios from "axios";

const tablaDatos = [
  {
    fecha: "18-04-2023 9:30 - 10:00",
    centro: "Nombre centro",
    doctor: "Nombre1 Apellido1",
    especialidad: "Nombre especialidadsdsda",
    hora: "9:30-10:00",
  },
  {
    fecha: "29-04-2023 13:30 - 14:00",
    centro: "Nombre centro",
    doctor: "Nombre2 Apellido2",
    especialidad: "Nombre especialidads",
    hora: "11:30-12:00",
  },
];

function ViewPatient(props: { setLogout: any; setScreen: any; username: any }) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ name: "", rut: "" });
  const [modalData, setModalData] = useState<{
    centro: string;
    especialidad: string;
    doctor: string;
    fecha: string;
    hora: string;
  }>({
    centro: "",
    especialidad: "",
    doctor: "",
    fecha: "",
    hora: "",
  });

  const openModal = (data: typeof modalData) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/graphql", {
        query: `query {
          patientByEmail(email: "${props.username}") {
            name,
            rut,
          }
        }`,
      })
      .then((res) => {
        console.log(res.data.data);
        setUser({
          name: res.data.data.patientByEmail.name,
          rut: res.data.data.patientByEmail.rut,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.username]);

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <h1 className="appointments-title">Horas reservadas</h1>
      </header>

      <div className="appointments-user-info">
        <div>
          <div className="appointments-user-label">Paciente</div>
          <div className="appointments-user-value">{user.name}</div>
        </div>
        <div>
          <div className="appointments-user-label">RUT</div>
          <div className="appointments-user-value">{user.rut}</div>
        </div>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Centro</th>
              <th>Doctor</th>
              <th>Especialidad</th>
              <th>Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                <td className="appointment-date">{dato.fecha}</td>
                <td>{dato.centro}</td>
                <td>{dato.doctor}</td>
                <td>{dato.especialidad}</td>
                <td>
                  <button
                    className="appointment-action-btn"
                    onClick={() => openModal(dato)}
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

      <Modal show={showModal} onHide={closeModal} centered>
        <div className="modal-content-custom">
          <div className="modal-header-custom">
            <h3 className="modal-title-custom">Anular Hora</h3>
            <button className="modal-close-custom" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="modal-body-custom">
            <div className="modal-detail">
              <span className="modal-detail-label">Centro</span>
              <span className="modal-detail-value">{modalData.centro}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Especialidad</span>
              <span className="modal-detail-value">{modalData.especialidad}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Doctor</span>
              <span className="modal-detail-value">{modalData.doctor}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Fecha</span>
              <span className="modal-detail-value">{modalData.fecha}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Hora</span>
              <span className="modal-detail-value">{modalData.hora}</span>
            </div>
          </div>
          <div className="modal-footer-custom">
            <button className="btn-modal-cancel" onClick={closeModal}>
              Cancelar hora
            </button>
            <button className="btn-modal-confirm" onClick={closeModal}>
              Mantener
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewPatient;