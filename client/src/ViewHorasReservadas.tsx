import React, { useEffect, useState } from "react";
import { Table, InputGroup, Form, Button, Modal} from 'react-bootstrap';
import axios from "axios";

function HorasReservadas() {  
    const [horas, setHoras] = useState<{centro:string,hora:string,dia:string,doctor:string,especialidad:string}[]>(
        [],
    ); 
    const [patient, setPatient] = useState({
        nombre: "",
        rut:""
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item:any) => {
        setShow(true);
        setHora(item);

    };
    const [formSearch, setFormSearch] = useState("");
    const [hora, setHora] = useState<{centro:string,hora:string,dia:string,doctor:string,especialidad:string}>({
        centro:'',
        hora:'',
        dia:'',
        doctor:'',
        especialidad:''
    });
    

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
                                <Button onClick={(e) => handleShow(item)}>Eliminar</Button>
                            }
                        </td>
                    </tr>
                ))}
                
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Anular Hora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Centro: {hora.centro}</p>
                    <p>Especialidad: {hora.especialidad}</p>
                    <p>Doctor: {hora.doctor}</p>
                    <p>Fecha: {hora.dia}</p>
                    <p>Hora: {hora.hora}</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            style={{ backgroundColor: '#ff3939', color: '#fff' }}
                            onClick={handleClose}>  
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
  }
  
export default HorasReservadas;


