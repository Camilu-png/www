import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import "./TomarHora.css";

interface Especialidad {
  especialidad: string;
  elementos: {
    centro: string;
    direccion: string;
  }[];
}

function ViewTomarHora(props: {
  setLogout: any;
  setScreen: any;
  username: string;
}) {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  useEffect(() => {
    const getPatients = async () => {
      await axios
        .get("http://localhost:4000/speciality")
        .then((res) => {
          const especialidadesData = res.data.map((item: any) => ({
            especialidad: item.name,
            elementos: item.centro.map((centro: any) => ({
              centro: centro.name,
              direccion: centro.dir,
            })),
          }));
          setEspecialidades(especialidadesData);
          console.log(especialidadesData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPatients();
  }, []);

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
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
                    <Nav.Link
                      className="icono buscar"
                      as={Link}
                      to="/ElegirMedico"
                    ></Nav.Link>
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
