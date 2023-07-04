import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";

import "./ViewPatient.css";
import axios from "axios";

declare global {
  interface Window {
    bootstrap: any;
  }
}



interface Hora {
  fecha: string;
  bloques: {
    inicio: string;
    fin: string;
  }[];
}



function ViewPatient(props: { setLogout: any; setScreen: any; username: any }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idMedico = searchParams.get('id') ?? '';
  const email = searchParams.get('email') ?? '';
  const [horasDisponibles, setHora] = useState<Hora[]>([]);



  useEffect(() => {
    const getDoctorCalendar = async (idMedico: string | null) => {
      try {
        const res = await axios.get(`http://localhost:4000/doctor/${idMedico}/calendar`);
        console.log(res.data)
        const horasData = res.data
        .filter((item: any) => item.free === true)
        .map((item: any) => ({
          fecha: item.date,
          bloques: item.availability.map((bloque: any) => ({
            inicio: bloque.startTime,
            fin: bloque.endTime
          }))
        }));



        // Aquí puedes manejar la respuesta de la consulta
        setHora(horasData);
      } catch (error) {
        // Aquí puedes manejar los errores de la consulta
        console.log(error);
      }
    };

    getDoctorCalendar( idMedico);
  }, [idMedico]);






  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ name: "", rut: "" });
  const [modalData, setModalData] = useState<{
    fecha: string;
    bloques: {
      inicio: string;
      fin: string;
    };
  }>({
    fecha: "",
    bloques: {
      inicio: "",
      fin: "",
    },
    
  });

  const openModal = (data: typeof modalData) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const confirmar = (fechas: string) => {
    // Construir el objeto con los datos a enviar
    const data = {
      email: email,
      emailPaciente:  props.username,
      fecha: fechas,
    };
    console.log("la data es")
    console.log(data)

    // Realizar la llamada POST de Axios
    axios.post("http://localhost:4000/", data)
      .then((response) => {
        // Manejar la respuesta exitosa
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar el error
        console.error(error);
      });

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
  }, [setUser]);

  return (
    <>
      <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
        <Button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Seleccione una hora</h1>
            </div>
          </main>

          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <h4>Paciente {user.name} </h4>
            <h4>Rut: {user.rut}</h4>

            <table className="table table-responsive{-sm|-md|-lg|-xl}">
              <thead className="table align-middle">
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora Inicio</th>
                  <th scope="col">Hora Fin</th>
                  <th scope="col">Agendar</th>
                </tr>
              </thead>
              <tbody>
                {horasDisponibles.map((dato, index) => (
                  <tr role="row" key={index}>
                    <td>{dato.fecha}</td>
                    <td>{dato.bloques[0].inicio}</td>
                    <td>{dato.bloques[0].fin}</td>
                    <td>
                      <Button
                        className="btn-susses"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => openModal({
                          fecha: dato.fecha,
                          bloques: dato.bloques[0]
                        })}
                      >
                        Agendar Hora
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Agendar la siguiente hora</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Hora Inicio: {modalData.bloques.inicio}</p>
                <p>Hora Fin: {modalData.bloques.fin}</p>
                <p>Fecha: {modalData.fecha}</p>
              </Modal.Body>
              <Modal.Footer
                style={{ justifyContent: "space-around", borderTop: 0 }}
              >
                <Button
                  type="button"
                  className="btn btn-default"
                  onClick={closeModal}
                  style={{
                    backgroundColor: "#ff3939",
                    color: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  Agendar
                </Button>
                <Button
                  type="button"
                  className="btn btn-default"
                  onClick={() => confirmar(modalData.fecha)}
                  style={{
                    backgroundColor: "#4376b1",
                    color: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  Confirmar
                </Button>
              </Modal.Footer>
            </Modal>
          </main>
        </div>
      </div>
      <script>
        {`
    console.log("Hola mundo");
  `}
      </script>
    </>
  );
}

export default ViewPatient;
