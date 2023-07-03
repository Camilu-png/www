import React, { useState } from "react";

import "./TomarHora.css";

const especialidades = [
  {
    especialidad: "Otorrinolaringología",
    elementos: [
      {
        centro: "Centro 1",
        direccion: "Dirección 1",
      },
      {
        centro: "Centro 2",
        direccion: "Dirección 2",
      },
      {
        centro: "Centro 3",
        direccion: "Dirección 3",
      },
    ],
  },
  {
    especialidad: "Medico general",
    elementos: [
      {
        centro: "Centro 6",
        direccion: "Dirección medico 1",
      },
      {
        centro: "Centro 2",
        direccion: "Dirección 2",
      },
      {
        centro: "Centro 3",
        direccion: "Dirección 3",
      },
    ],
  },
  {
    especialidad: "Kine",
    elementos: [
      {
        centro: "Centro 6",
        direccion: "Dirección medico 1",
      },
    ],
  },

  // Otros elementos de especialidades
];

function ViewTomarHora(props: {
  setLogout: any;
  setScreen: any;
  username: string;
}) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = "./elegir_medico.html";
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Tomar Hora</h1>
            </div>
          </main>
        </div>
      </div>

      <main
        className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
        style={{ padding: "20px" }}
      >
        <h2 style={{ margin: 10 }}>
          <span style={{ marginRight: "110px" }}>Especialidad</span>
          Centros
        </h2>
        {/*Primer elemento del acordeón */}
        {especialidades.map((especialidad, index) => (
          <div key={index}>
            <button
              className={`accordion ${
                activeAccordion === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <span className="arrow">
                {activeAccordion === index ? "▼" : "▲"}
              </span>
              {especialidad.especialidad}
              <span className="icono"></span>
            </button>
            <div className={`panel ${activeAccordion === index ? "show" : ""}`}>
              <ul className="lista">
                {especialidad.elementos.map((elemento, subIndex) => (
                  <li key={subIndex}>
                    <div className="centro">{elemento.centro}</div>
                    <div className="direccion">{elemento.direccion}</div>
                    <a
                      href="#"
                      className="icono buscar"
                      onClick={handleSearchClick}
                    >
                      <i className="fas fa-search"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default ViewTomarHora;
