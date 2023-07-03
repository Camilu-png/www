import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";



import "./ViewPatient.css";


declare global {
  interface Window {
    bootstrap: any;
  }
}

const tablaDatos = [
  {
    fecha: "18-04-2023 9:30 - 10:00",
    centro: "Nombre centro",
    doctor: "Nombre1 Apellido1",
    especialidad: "Nombre especialidad",
    hora: "9:30-10:00"
  },
  {
    fecha: "29-04-2023 13:30 - 14:00",
    centro: "Nombre centro",
    doctor: "Nombre2 Apellido2",
    especialidad: "Nombre especialidads",
    hora: "11:30-12:00"
  },
  // Agrega más objetos de ejemplo aquí
];


function ViewPatient(props: { setLogout: any; setScreen: any,user: any }) {  

	/*const [patients, setPatients] = useState([{
        "nombre": "pepito",
        "hora": "9:30"
    }]);
    const [doctor, setDoctor] = useState(props.user);

    useEffect(() => {
        const getPatients = async() =>{
            await axios
            .post("http://localhost:4000/doctor/patients", doctor)
            .then((res) => {
            
            })
            .catch((err) => {
            console.log(err);
            });
        }
        getPatients();
    });

    function handleAtencion(e:any, item:any){
        const obj ={
            patient: item,
        };
        const patientsAttended = async(obj:any) =>{
            await axios
            .put("http://localhost:4000/doctor/patientAttended", obj)
            .then((res) => {
            
            })
            .catch((err) => {
            console.log(err);
            });
        }
        patientsAttended(obj);
    }*/


	
  const [showModal, setShowModal] = useState(false);
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
	  hora: ""
	});

	const openModal = (data: typeof modalData) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
    return (

<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <title>Dashboard Template · Bootstrap</title>

    <link href="index.css" rel="stylesheet" />
    <link
      rel="canonical"
      href="https://v5.getbootstrap.com/docs/5.0/examples/dashboard/"
    />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossOrigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossOrigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossOrigin="anonymous"
    ></script>
    
  </head>

  <body>
    <nav
      className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow"
    >
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>

    <div className="container-fluid">
      <div className="row">

        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 className="h2">Horas reservadas</h1>
          </div>
        </main>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

          <h4>Paciente Nombre Apellido</h4>
          <h4>Rut: xx.xxx.xxx-x</h4>

           <table className="table table-responsive{-sm|-md|-lg|-xl}">
                <thead  className="table align-middle">
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Centro</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Especialidad</th>
                    <th scope="col">Cancelar</th>
                  </tr>
                </thead>
                <tbody>
		        {tablaDatos.map((dato, index) => (
		          <tr role="row" key={index}>
		            <td>{dato.fecha}</td>
		            <td>{dato.centro}</td>
		            <td>{dato.doctor}</td>
		            <td>{dato.especialidad}</td>
		            <td>
		              <Button
		                className="btn-cancel"
		                data-toggle="modal"
		                data-target="#exampleModal"
		                onClick={() => openModal(dato)}
		              >
		                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16" >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
		              </Button>
		            </td>
		          </tr>
		        ))}
		      </tbody>
              </table>

              {/* Modal */}
                        <Modal show={showModal} onHide={closeModal}>
		        <Modal.Header closeButton>
		          <Modal.Title>Anular Hora</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		          <p>Centro: {modalData.centro}</p>
		          <p>Especialidad: {modalData.especialidad}</p>
		          <p>Doctor: {modalData.doctor}</p>
		          <p>Fecha: {modalData.fecha}</p>
		          <p>Hora: {modalData.hora}</p>
		        </Modal.Body>
		        <Modal.Footer style={{ justifyContent: "space-around", borderTop: 0 }}>
		          <Button
		            type="button"
		            className="btn btn-default"
		            onClick={closeModal}
		            style={{
		              backgroundColor: "#ff3939",
		              color: "#fff",
		              borderRadius: "15px"
		            }}
		          >
		            Cancelar
		          </Button>
		          <Button
		            type="button"
		            className="btn btn-default"
		            onClick={closeModal}
		            style={{
		              backgroundColor: "#4376b1",
		              color: "#fff",
		              borderRadius: "15px"
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
  </body>

  </html>
    );
  }
  
  export default ViewPatient;
