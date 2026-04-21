import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import './ViewSecretary.css';

function ViewSecretary(props: { setLogout: any; setScreen: any, user: any}) {  
  const [patients, setPatients] = useState<{nombre: string; hora: string; dia: string}[]>([]);
  const [doctor, setDoctor] = useState<{nombre: string}>({ nombre: '' });
  const [formSearch, setFormSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const getPatientsDoctor = async () => {
      const obj = { doctor: formSearch };
      try {
        const res = await axios.post("http://localhost:4000/secretary/doctor", obj);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    getPatientsDoctor();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSearch(e.target.value);
  };

  return (
    <div className="secretary-container">
      <header className="secretary-header">
        <h1 className="secretary-title">Lista de espera</h1>
      </header>

      <form className="secretary-search" onSubmit={handleSearch}>
        <input
          type="text"
          className="secretary-search-input"
          placeholder="Buscar médico..."
          aria-label="doctor"
          value={formSearch}
          onChange={handleChange}
        />
        <button type="submit" className="secretary-search-btn">
          Buscar
        </button>               
      </form>
      
      {doctor.nombre && (
        <h2 className="secretary-doctor-name">Dr. {doctor.nombre}</h2>
      )}

      <div className="secretary-table-wrapper">
        <table className="secretary-table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Hora</th>
              <th>Día</th>
            </tr>
          </thead>
          <tbody>
            {(patients || []).map((item, id) => (
              <tr key={id}>
                <td>{item.nombre}</td>
                <td>{item.hora}</td>
                <td>{item.dia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewSecretary;