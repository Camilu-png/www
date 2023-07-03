import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



import "./ViewPatient.css";


declare global {
  interface Window {
    bootstrap: any;
  }
}




function ViewPatient(props: { setLogout: any; setScreen: any,user: any }) {  
	   const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const modalElement = document.getElementById("exampleModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }, [showModal]);

  const openModal = () => {
    setShowModal(true);
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
        {/*<nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="./tomar_hora.html">
                        <span data-feather="file"></span>
                        Tomar Hora
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        aria-current="page"
                    >
                        <span data-feather="home"></span>
                        Horas reservadas
                    </a>
                </li>

                <li>
                  <div className="logout">
                    <a className="nav-link active"
                    aria-current="page"
                    href="./signin.html"><span data-feather="home"></span>
                    Cerrar Sesión</a>
                    </div>
                </li>
                           
            </ul>
          </div>
        </nav>*/}

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
                  <tr role="row">
                    <td>18-04-2023 9:30 - 10:00</td>
                    <td>Nombre centro</td>
                    <td>Nombre1 Apellido1</td>
                    <td>Nombre especialidad</td>
                    <td>
                      <button className="btn-cancel" data-toggle="modal" data-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr role="row">
                    <td>29-04-2023 13:30 - 14:00</td>
                    <td>Nombre centro</td>
                    <td>Nombre2 Apellido2</td>
                    <td>Nombre especialidad</td>
                    <td>
                      <button className="btn-cancel" data-toggle="modal" data-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr role="row">
                    <td>08-05-2023 9:30 - 10:00</td>
                    <td>Nombre centro</td>
                    <td>Nombre3 Apellido3</td>
                    <td>Nombre especialidad</td>
                    <td>
                      <button className="btn-cancel" data-toggle="modal" data-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr role="row">
                    <td>20-05-2023 11:30 - 12:00</td>
                    <td>Nombre centro</td>
                    <td>Nombre4 Apellido4</td>
                    <td>Nombre especialidad</td>
                    <td>
                      <button className="btn-cancel"  onClick={openModal} data-toggle="modal" data-target="#exampleModal" id="btnOpenModal">
						  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
						    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
						  </svg>
						</button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Modal */}
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" >
              <div className="modal-dialog">
                <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Anular Hora</h5>
                        
                      </div>
                      <div className="modal-body">
                        <p>Centro: Nombre centro</p>
                        <p>Especialidad: Nombre especiabilidad</p>
                        <p>Doctor: Nombre1 Apellido1</p>
                        <p>Fecha: 18-04-2023</p>
                        <p>Hora: 9:30-10:00</p>
                      </div>
                    
                    <div className="modal-footer" style={{ justifyContent: "space-around", borderTop: 0 }}>
                      <button
					  type="button"
					  className="btn btn-default"
					  data-dismiss="modal"
					  style={{
					    backgroundColor: "#ff3939",
					    color: "#fff",
					    borderRadius: "15px"
					  }}
					>
					  Cancelar
                    </button>
                    <button
					  type="button"
					  className="btn btn-default"
					  data-dismiss="modal"
					  style={{
					    backgroundColor: "#4376b1",
					    color: "#fff",
					    borderRadius: "15px"
					  }}
					>
					  Confirmar
                    </button>
                    </div>
                  </div>
                </div>
              </div>

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
