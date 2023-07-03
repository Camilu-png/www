import React, { useEffect, useState } from "react";
import {Button, Table} from 'react-bootstrap';
import axios from "axios";

function EsperaDoctor(props: { setLogout: any; setScreen: any,user: any }) {  

    const [patients, setPatients] = useState([{
        "nombre": "pepito",
        "hora": "9:30"
    }]);
    const [doctor, setDoctor] = useState(props.user);

    useEffect(() => {
        const getPatients = async() =>{
            await axios
            .post("http://localhost:4000/doctor/patients", doctor)
            .then((res) => {
            
            })
            .catch((err) => {
            console.log(err);
            });
        }
        getPatients();
    });

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
            <h1>Pacientes en espera</h1>
            <Table striped bordered hover>
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
                                    <Button onClick={(e) => handleAtencion(e,item)}>Atendido</Button>
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