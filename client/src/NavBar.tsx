import {Container, Nav, Navbar, Modal } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom"

function NavBar(props:{type:any}) {
  return (
    <>
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
            
            {props.type.type === "doctor" ? (
                    <Nav className="me-auto">
                        <Navbar.Brand as={Link} to="/esperaDoctor">Centro médico galenos</Navbar.Brand>
                        <Nav.Link as={Link} to="/esperaDoctor">Espera</Nav.Link>
                    </Nav>
                ) : props.type.type === "patient" ? (
                    <Nav className="me-auto">
                        <Navbar.Brand as={Link} to="/Tomarhoras">Centro médico galenos</Navbar.Brand>
                        <Nav.Link as={Link} to="/Tomarhoras">Tomar hora</Nav.Link>
                        <Nav.Link as={Link} to="/HorasReservadas">Horas reservadas</Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="me-auto">
                        <Navbar.Brand as={Link} to="/esperaSecretaria">Centro médico galenos</Navbar.Brand>
                        <Nav.Link as={Link} to="/esperaSecretaria">Espera</Nav.Link>
                        <Nav.Link as={Link} to="/disponibilidad">Disponibilidad</Nav.Link>
                        <Nav.Link as={Link} to="/HorasSecretaria">Horas reservadas</Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>

        <section>
            <Outlet></Outlet>
        </section> 
    </>
  );
}

export default NavBar;