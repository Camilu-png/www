import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewDoctor.css';

interface Patient {
  nombre: string;
  hora: string;
  attended: boolean;
}

function ViewDoctor(props: { setLogout: any; setScreen: any, user: any }) {
  const [patients, setPatients] = useState<Patient[]>([{
    nombre: "pepito",
    hora: "9:30",
    attended: false,
  }]);

  const doctor = props.user;

  useEffect(() => {
    const getPatients = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/doctor/${doctor._id}/pacientes-sin-atender`);
        console.log(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    getPatients();
  }, [doctor._id]);

  const handleAtencion = (item: Patient) => {
    const obj = { patient: item };
    axios
      .put("http://localhost:4000/doctor/patientAttended", obj)
      .then(() => {
        setPatients(prev => prev.map(p => 
          p.nombre === item.nombre ? { ...p, attended: true } : p
        ));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="doctor-container">
      <header className="doctor-header">
        <h1 className="doctor-title">Pacientes en espera</h1>
      </header>

      <div className="doctor-table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Hora</th>
              <th>Atención</th>
            </tr>
          </thead>
          <tbody>
            {(patients || []).map((item, id) => (
              <tr key={id}>
                <td className="doctor-patient-name">{item.nombre}</td>
                <td>{item.hora}</td>
                <td>
                  <button 
                    className={`doctor-attend-btn ${item.attended ? 'attended' : ''}`}
                    onClick={() => handleAtencion(item)}
                    disabled={item.attended}
                  >
                    {item.attended ? "Atendido" : "Atender"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewDoctor;