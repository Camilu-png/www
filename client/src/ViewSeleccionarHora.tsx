import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./ViewSeleccionarHora.css";
import axios from "axios";

interface Hora {
  fecha: string;
  bloques: {
    inicio: string;
    fin: string;
  }[];
}

function ViewSeleccionarHora(props: { setLogout: any; setScreen: any; username: any }) {
  const idMedico = new URLSearchParams(window.location.search).get('id') ?? '';
  const email = new URLSearchParams(window.location.search).get('email') ?? '';
  const [horasDisponibles, setHoras] = useState<Hora[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ name: "", rut: "" });
  const [modalData, setModalData] = useState<{
    fecha: string;
    bloques: { inicio: string; fin: string };
  }>({
    fecha: "",
    bloques: { inicio: "", fin: "" },
  });

  useEffect(() => {
    const getDoctorCalendar = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/doctor/${idMedico}/calendar`);
        const horasData = res.data
          .filter((item: any) => item.free === true)
          .map((item: any) => ({
            fecha: item.date,
            bloques: item.availability.map((bloque: any) => ({
              inicio: bloque.startTime,
              fin: bloque.endTime
            }))
          }));
        setHoras(horasData);
      } catch (error) {
        console.error(error);
      }
    };
    getDoctorCalendar();
  }, [idMedico]);

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
        setUser({
          name: res.data.data.patientByEmail.name,
          rut: res.data.data.patientByEmail.rut,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.username]);

  const openModal = (data: typeof modalData) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmar = (fecha: string) => {
    const data = {
      email_paciente: props.username,
      email_doctor: email,
      date: fecha,
    };
    axios.post("http://localhost:4000/agenda", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowModal(false);
  };

  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <h1 className="schedule-title">Seleccionar hora</h1>
        <p className="schedule-subtitle">Elige el horario disponible</p>
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

      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Agendar</th>
            </tr>
          </thead>
          <tbody>
            {horasDisponibles.map((dato, index) => (
              <tr key={index}>
                <td className="schedule-date">{dato.fecha}</td>
                <td>{dato.bloques[0].inicio}</td>
                <td>{dato.bloques[0].fin}</td>
                <td>
                  <button
                    className="schedule-action-btn"
                    onClick={() => openModal({
                      fecha: dato.fecha,
                      bloques: dato.bloques[0]
                    })}
                  >
                    Agendar
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
            <h3 className="modal-title-custom">Confirmar hora</h3>
            <button className="modal-close-custom" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="modal-body-custom">
            <div className="modal-detail">
              <span className="modal-detail-label">Fecha</span>
              <span className="modal-detail-value">{modalData.fecha}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Hora inicio</span>
              <span className="modal-detail-value">{modalData.bloques.inicio}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">Hora fin</span>
              <span className="modal-detail-value">{modalData.bloques.fin}</span>
            </div>
          </div>
          <div className="modal-footer-custom">
            <button className="btn-modal-cancel" onClick={closeModal}>
              Cancelar
            </button>
            <button className="btn-modal-confirm" onClick={() => confirmar(modalData.fecha)}>
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewSeleccionarHora;