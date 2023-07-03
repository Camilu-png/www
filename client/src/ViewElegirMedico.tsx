import React, { useState } from "react";
import "./ElegirMedico.css";

function ViewElegirMedico(props: {
  setLogout: any;
  setScreen: any;
  username: string;
}) {
  const [lista, setLista] = useState([
    { nombre: "Nombre Apellido Médico 1", direccion: "1asdad" },
    { nombre: "Nombre Apellido Médico 2", direccion: "2" },
    { nombre: "Nombre Apellido Médico 3", direccion: "3" },
    // Agrega más elementos de la lista según tus necesidades
  ]);
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
        <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
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
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Tomar Hora</h1>
              </div>
            </main>
          </div>
        </div>

        <div className="Tabla-doctor-container">
          <h2 style={{ margin: "0", display: "flex" }}>
            <span style={{ margin: "0 5px", flex: 1, maxWidth: "33%" }}>
              Doctor
            </span>
            <span style={{ margin: "0 5px", flex: 1, maxWidth: "33%" }}>
              Box
            </span>
            <span style={{ margin: "0 10px", flex: 1, maxWidth: "33%" }}></span>
          </h2>
          {/* Primer elemento del acordeón */}
          <ul className="lista">
            {lista.map((item, index) => (
              <li key={index}>
                <div className="centro">{item.nombre}</div>
                <div className="direccion">{item.direccion}</div>
                <a href="#" className="icono buscar">
                  <i className="fas fa-search"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <script>
          {`
    var links = document.querySelectorAll(".buscar");

    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "./calendario_hora.html";
      });
    });`}
        </script>
      </body>
    </html>
  );
}

export default ViewElegirMedico;
