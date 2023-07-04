import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList';
import axios from "axios";
import { Form, Button }from 'react-bootstrap';


const DoctorForm = () => {
  const [idDoctor, setIdDoctor] = useState('');
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
    setIdDoctor(event.target[0].value);
    
    const addAvailability = async() =>{
      const obj = {
        availability: availability,
      }
      await axios
      .post(`http://localhost:4000/doctor/${event.target[0].value}/availability`,obj )
      .then((res) => {
        if(res.data){
          console.log(res.data)
        }
      })
      .catch((err) => {
      console.log(err);
      });
  }
  addAvailability();    
  };

  useEffect(() => {
    const getDoctors = async() =>{
        await axios
        .get("http://localhost:4000/doctor")
        .then((res) => {
          if(res.data){
            setDoctors(res.data)
          }
        })
        .catch((err) => {
        console.log(err);
        });
    }
    getDoctors();
},[]);

  return (
    <div>
      <h1 className="d-flex justify-content-start" style={{ color: '#4d76b1', marginLeft: '20px'}}>Asignar Horarios Disponibles</h1>
            
      <hr className="mt-2 mb-3"  style={{ marginLeft: '20px', marginRight:'20px' }}/>
      
      <h3 className="d-flex justify-content-start" style={{ marginLeft: '20px' }}>Médicos</h3>
      
      <form className="search form-inline" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <Form.Select aria-label="Default select example" as="select" onChange={e => setIdDoctor(e)} style={{  marginRight: '20px',  marginLeft: '20px', marginBottom:'20px'}}>
            {(doctors||[]).map((doctor, id) => (
                <option 
                  key={id} 
                  value={doctor.id}
                >
                  {doctor.name}
                </option>
            ))} 
          </Form.Select>
        </div>   
      
        
        <div>
          <h3 className="d-flex justify-content-start" style={{ marginLeft: '20px' }}>Disponibilidad:</h3>

          {availability.map((item, index) => (
            
            <div key={index}>
              <div className="d-flex justify-content-between">
              <Form.Group controlId="duedate" style={{  width: '500px', marginRight: '20px'}}>

              <Form.Control
                  placeholder="Dia"
                  aria-label="dia"
                  className="p-2 form-control mr-sm-2 search-input"
                  name="dia"
                  value={item.day}
                  style={{  width: '500px', marginRight: '20px'}}
                  onChange={event =>
                    setAvailability(prevAvailability =>
                      prevAvailability.map((av, i) => (i === index ? { ...av, day: event.target.value } : av))
                    )
                  }
                />
              </Form.Group>

              <Form.Control
                  placeholder="Hora inicio"
                  aria-label="inicio"
                  className="p-2 form-control mr-sm-2 search-input"
                  name="inicio"
                  value={item.startTime}
                  style={{  width: '500px', marginRight: '20px'}}
                  onChange={event =>
                    setAvailability(prevAvailability =>
                      prevAvailability.map((av, i) => (i === index ? { ...av, startTime: event.target.value } : av))
                    )
                  }
              />
              <Form.Control
                  placeholder="Hora termino"
                  aria-label="termino"
                  className="p-2 form-control mr-sm-2 search-input"
                  name='termino'
                  style={{  width: '500px', marginRight: '20px'}}
                  value={item.endTime}
                  onChange={event =>
                    setAvailability(prevAvailability =>
                      prevAvailability.map((av, i) => (i === index ? { ...av, endTime: event.target.value } : av))
                    )
                  }
              />
              <Button type="button" onClick={() => handleRemoveAvailability(index)}>
                Eliminar
              </Button>
              </div> 
            </div>
          ))}
          <div className='d-flex justify-content-center'>
              <Button type="button" onClick={handleAddAvailability} style={{  width: '200px', marginRight: '20px'}}>
                Agregar Disponibilidad
              </Button>
            
            <Button type="submit" style={{  width: '200px', marginRight: '20px'}}>Guardar</Button>
            </div>
          </div>
          
      </form>
    </div>
  );
};

export default DoctorForm;
