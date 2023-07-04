import React, { useEffect, useState } from "react";
import { Table, InputGroup, Form, Button} from 'react-bootstrap';
import axios from "axios";

function Espera(props: { setLogout: any; setScreen: any, user: any}) {  
    const [patients, setPatients] = useState<{nombre:string,hora:string,dia:string}[]>(
        [],
    ); 
    
    const [doctor, setDoctor] = useState<{nombre:string}>({
        nombre:''
    });
    
    const [formSearch, setFormSearch] = useState("");

    const handleSearch =(e:any) => {
        const getPatientsDoctor = async() =>{
            const obj ={
                doctor: formSearch,
            }
            await axios
            /* Lista de pacientes por doctor */
            .post("http://localhost:4000/secretary/doctor", obj)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
            console.log(err);
            });
        }
        getPatientsDoctor();
        console.log(e)
    }

    const handleChange = (e:any) => {
        setFormSearch(e.target.value);
    }

    return (
        <div>
            <h1 className="d-flex justify-content-start" style={{ color: '#4d76b1', marginLeft: '20px'}}>Espera</h1>
            
            <hr className="mt-2 mb-3"  style={{ marginLeft: '20px', marginRight:'20px' }}/>
            
            <form className="search form-inline">
                <div className="d-flex justify-content-between">
                <Form.Control
                            placeholder="Buscar Doctor"
                            aria-label="doctor"
                            className="p-2 form-control mr-sm-2 search-input"
                            onChange={handleChange} 
                        />
                    <Button className="p-2 btn btn-lg btn-primary" onClick={handleSearch}>Buscar</Button> 
                </div>               
            </form>
            
            <h3 className="d-flex justify-content-start" style={{ marginLeft: '20px' }}>{doctor.nombre}</h3>
            <Table striped bordered hover style={{ margin: '20px', marginRight:'20px' }}>
                <thead>
                    <tr>
                    <th>Paciente</th>
                    <th>Hora</th>
                    <th>Dia</th>
                    </tr>
                </thead>
                <tbody>
                {(patients|| []).map((item, id) => (
                    <tr key={id}>
                        <td>{item.nombre}</td>
                        <td>{item.hora}</td>
                        <td>{item.dia}</td>
                    </tr>
                ))}
                
                </tbody>
            </Table>
        </div>
    );
  }
  
export default Espera;


