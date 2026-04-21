import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./ElegirMedico.css";

interface Medico {
  nombre: string;
  direccion: string;
  id: Object;
}

function ViewElegirMedico(props: {
  setLogout: any;
  setScreen: any;
  username: string;
}) {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  const [especialidad] = useState<string | null>(new URLSearchParams(window.location.search).get('especialidad'));
  const [centro] = useState<string | null>(new URLSearchParams(window.location.search).get('centro'));

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:4000/doctor', {
          params: {
            speciality: especialidad,
            center: centro,
          },
        });
        const medicosData = res.data.map((item: any) => ({
          nombre: item.email,
          direccion: item.center,
          id: item.id
        }));
        setMedicos(medicosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDoctors();
  }, [especialidad, centro]);

  return (
    <div className="doctor-select-container">
      <header className="doctor-select-header">
        <h1 className="doctor-select-title">Seleccionar médico</h1>
        <p className="doctor-select-subtitle">Elige un profesional para tu hora médica</p>
      </header>

      <div className="doctor-grid">
        {loading ? (
          <div className="empty-state">
            <p>Cargando médicos...</p>
          </div>
        ) : medicos.length > 0 ? (
          medicos.map((item, index) => (
            <article key={index} className="doctor-card">
              <div className="doctor-info">
                <span className="doctor-name">Dr. {item.nombre}</span>
                <span className="doctor-center">{item.direccion}</span>
              </div>
              <Link 
                className="doctor-action"
                to={`/MostrarHoras?id=${item.id}&email=${item.nombre}`}
              >
                Ver horario
              </Link>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <p>No hay médicos disponibles para esta especialidad</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewElegirMedico;