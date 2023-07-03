import React, { useState } from 'react';

const DoctorList = ({doctors}) => {
  return (
    <div>
      <h2>Lista de Médicos</h2>
      {(doctors||[]).map(doctor => (
        <div key={doctor._id}>
          <h3>{doctor.rut}</h3>
          <p>Especialidad: {doctor.speciality}</p>
          <p>Centro: {doctor.center.name_center}</p>
          <p>Dirección: {doctor.center.dir}</p>
          <h4>Disponibilidad:</h4>
          {doctor.availability.map((item, index) => (
            <div key={index}>
              <p>Día: {item.day}</p>
              <p>Hora de inicio: {item.startTime}</p>
              <p>Hora de fin: {item.endTime}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
