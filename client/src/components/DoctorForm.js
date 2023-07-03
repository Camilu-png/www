import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList';
import axios from "axios";

const DoctorForm = () => {
  const [rut, setRut] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [centerName, setCenterName] = useState('');
  const [centerDir, setCenterDir] = useState('');
  const [availability, setAvailability] = useState([]);
  const [doctors, setDoctors] = useState([])

  const handleAddAvailability = () => {
    setAvailability(prevAvailability => [...prevAvailability, { day: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveAvailability = index => {
    setAvailability(prevAvailability => prevAvailability.filter((_, i) => i !== index));
  };

  const handleSubmit = event => {
    event.preventDefault();
    //onSubmit({ rut, speciality, centerName, centerDir, availability });
  };

  useEffect(() => {
    const getDoctors = async() =>{
        await axios
        .get("http://localhost:4000/doctor")
        .then((res) => {
          console.log(res)
          if(res.data){
            setDoctors(res.data)
          }
        })
        .catch((err) => {
        console.log(err);
        });
    }
    getDoctors();
});

  return (
    <div>
      <h2>Asignar Horarios Disponibles</h2>
      <DoctorList doctors={doctors}/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RUT:</label>
          <input type="text" value={rut} onChange={event => setRut(event.target.value)} />
        </div>
        <div>
          <label>Especialidad:</label>
          <input type="text" value={speciality} onChange={event => setSpeciality(event.target.value)} />
        </div>
        <div>
          <label>Nombre del Centro:</label>
          <input type="text" value={centerName} onChange={event => setCenterName(event.target.value)} />
        </div>
        <div>
          <label>Dirección del Centro:</label>
          <input type="text" value={centerDir} onChange={event => setCenterDir(event.target.value)} />
        </div>
        <div>
          <h3>Disponibilidad:</h3>
          {availability.map((item, index) => (
            <div key={index}>
              <label>Día:</label>
              <input
                type="text"
                value={item.day}
                onChange={event =>
                  setAvailability(prevAvailability =>
                    prevAvailability.map((av, i) => (i === index ? { ...av, day: event.target.value } : av))
                  )
                }
              />
              <label>Hora de inicio:</label>
              <input
                type="text"
                value={item.startTime}
                onChange={event =>
                  setAvailability(prevAvailability =>
                    prevAvailability.map((av, i) => (i === index ? { ...av, startTime: event.target.value } : av))
                  )
                }
              />
              <label>Hora de fin:</label>
              <input
                type="text"
                value={item.endTime}
                onChange={event =>
                  setAvailability(prevAvailability =>
                    prevAvailability.map((av, i) => (i === index ? { ...av, endTime: event.target.value } : av))
                  )
                }
              />
              <button type="button" onClick={() => handleRemoveAvailability(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAvailability}>
            Agregar Disponibilidad
          </button>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DoctorForm;
