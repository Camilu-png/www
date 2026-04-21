import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TomarHora.css";

interface Centro {
  centro: string;
  direccion: string;
}

interface Especialidad {
  id: number;
  name: string;
  centro: Centro[];
}

const specialtyIcons: Record<string, JSX.Element> = {
  cardiologia: (
    <svg viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  dermatologia: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 14v7c0 1.1.9 2 2 2v-9.93zm1.09-10.85c-1.35-.84-2.09-2.37-2.09-4.08 0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.67-.78 3.21-1.91 4.08L13 17v1c0 1.1.9 2 2 2v-11.92z"/>
    </svg>
  ),
  general: (
    <svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  ),
  neurologia: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
};

function getSpecialtyIcon(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, '');
  return specialtyIcons[key] || specialtyIcons.default;
}

function ViewTomarHora(props: {
  setLogout: any;
  setScreen: any;
  username: string;
}) {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const res = await axios.get("http://localhost:4000/speciality");
        setEspecialidades(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSpecialties();
  }, []);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Tomar Hora</h1>
        <p className="page-subtitle">Selecciona una especialidad y centro médico</p>
      </header>

      <div className="specialty-grid">
        {especialidades.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p>Cargando especialidades...</p>
          </div>
        ) : (
          especialidades.map((especialidad, index) => (
            <article 
              key={especialidad.id || index} 
              className="specialty-card"
              style={{ '--index': index } as React.CSSProperties}
            >
              <button
                className="specialty-card-header"
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="specialty-card-title">
                  <span className="specialty-icon">
                    {getSpecialtyIcon(especialidad.name)}
                  </span>
                  {especialidad.name}
                </h2>
                <span className={`specialty-arrow ${expandedIndex === index ? 'expanded' : ''}`}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
                  </svg>
                </span>
              </button>
              
              <div className={`specialty-card-body ${expandedIndex === index ? 'expanded' : ''}`}>
                <div className="specialty-centers">
                  {especialidad.centro && especialidad.centro.map((centro, centroIndex) => (
                    <div key={centroIndex} className="specialty-center">
                      <div className="specialty-center-info">
                        <span className="specialty-center-name">{centro.centro}</span>
                        <span className="specialty-center-address">{centro.direccion}</span>
                      </div>
                      <Link 
                        to="/ElegirMedico" 
                        className="specialty-center-action"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z" fill="currentColor"/>
                        </svg>
                        Buscar
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewTomarHora;