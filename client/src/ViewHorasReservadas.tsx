import React, { useEffect, useState } from "react";
import { Table, InputGroup, Form, Button} from 'react-bootstrap';
import axios from "axios";

function HorasReservadas() {  
    const [horas, setHoras] = useState([{
        "doctor": "pepito",
        "hora": "9:30",
        "dia": "10/04/2023",
    }]);
    const [patient, setPatient] = useState({
        "nombre": "Nombre Apellido",
        "rut":"xx.xxx.xxx-x"
    });
    const [formSearch, setFormSearch] = useState("");

    const handleSearch =(e:any) => {
        const getHoras = async() =>{
            const obj ={
                doctor: formSearch,
            }
            await axios
            /* Lista de horas de paciente */
            .post("http://localhost:4000/secretary/doctor", obj)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
            console.log(err);
            });
        }
        getHoras();
        console.log(e)
    }

    const handleChange = (e:any) => {
        setFormSearch(e.target.value);
    }

    const handleDelete = (e:any, item:any) => {
        console.log("delete " + item);
    }

    return (
        <div>
            <h1 className="d-flex justify-content-start" style={{ color: '#4d76b1', marginLeft: '20px'}}>Espera</h1>
            
            <hr className="mt-2 mb-3"  style={{ marginLeft: '20px', marginRight:'20px' }}/>
            
            <form className="search form-inline">
                <div className="d-flex justify-content-between">
                <Form.Control
                            placeholder="Buscar Paciente"
                            aria-label="paciente"
                            className="p-2 form-control mr-sm-2 search-input"
                            onChange={handleChange} 
                        />
                    <Button className="p-2 btn btn-lg btn-primary" onClick={handleSearch}>Buscar</Button> 
                </div>               
            </form>
            
            <h3 className="d-flex justify-content-start" style={{ marginLeft: '20px' }}>Paciente: {patient.nombre}</h3>
            <h3 className="d-flex justify-content-start" style={{ marginLeft: '20px' }}>Rut: {patient.rut}</h3>

            <Table striped bordered hover style={{ margin: '20px', marginRight:'20px' }}>
                <thead>
                    <tr>
                    <th>Doctor</th>
                    <th>Hora</th>
                    <th>Dia</th>
                    <th>Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                {(horas|| []).map((item, id) => (
                    <tr key={id}>
                        <td>{item.doctor}</td>
                        <td>{item.hora}</td>
                        <td>{item.dia}</td>
                        <td>
                            {
                                <Button onClick={(e) => handleDelete(e, item)}>Eliminar</Button>
                            }
                        </td>
                    </tr>
                ))}
                
                </tbody>
            </Table>
        </div>
    );
  }
  
export default HorasReservadas;


