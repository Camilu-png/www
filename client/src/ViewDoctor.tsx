import React, { useEffect, useState } from "react";
import {Button, Table} from 'react-bootstrap';
import axios from "axios";

function EsperaDoctor(props: { setLogout: any; setScreen: any,user: any }) {  

    const [patients, setPatients] = useState([{
        "nombre": "pepito",
        "hora": "9:30",
        "attended": false,
    }]);

    const [doctor, setDoctor] = useState(props.user);
    const [doctor_id, setDoctor_id] = useState("");
    console.log(doctor_id);
    useEffect(() => {

        const getdoctorid = async() => {
            await axios
            .get(`http://localhost:4000/doctor/${doctor._id}/obtener-id-doc`)
            .then((res) => {
                setDoctor_id(res.data.doctorId);
            })
            .catch((err) => {
                console.log(err);
            })
        } 
        getdoctorid();

        const getPatients = async() =>{
            await axios
            .get(`http://localhost:4000/doctor/${doctor_id}/pacientes-sin-atender`)
            .then((res) => {
                console.log(res.data.results);
            })
            .catch((err) => {
            console.log(err);
            });
        }
        getPatients();
    },[]);

    function handleAtencion(e:any, item:any){
        const obj ={
            patient: item,
        };
        const patientsAttended = async(obj:any) =>{
            await axios
            .put("http://localhost:4000/doctor/patientAttended", obj)
            .then((res) => {
                
            })
            .catch((err) => {
            console.log(err);
            });
        }
        patientsAttended(obj);
    }

    return (
        <div>
            <h1 className="d-flex justify-content-start" style={{ color: '#4d76b1', marginLeft: '20px'}}>Pacientes en espera</h1>
            
            <hr className="mt-2 mb-3"  style={{ marginLeft: '20px', marginRight:'20px' }}/>
            <Table striped bordered hover style={{ marginLeft: '20px', marginRight:'20px' }}>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Hora</th>
                        <th>Atención</th>
                    </tr>
                </thead>
                <tbody>
                {(patients|| []).map((item, id) => (
                    <tr key={id}>
                        <td>{item.nombre}</td>
                        <td>{item.hora}</td>
                        <td>
                            {
                                <a>
                                    <Button onClick={(e) => handleAtencion(e,item)}>{(item.attended) ? "Atendido" : "Sin atender"}</Button>
                                </a>
                            }
                        </td>
                    </tr>
                ))}
                
                </tbody>
            </Table>
        </div>
    );
}
  
export default EsperaDoctor;