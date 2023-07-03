import {Container, Nav, Navbar} from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom"

function NavBar(props:{type:any}) {
  return (
    <>
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">Centro médico galenos</Navbar.Brand>
            {props.type.type === "doctor" ? (
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/esperaDoctor">Espera</Nav.Link>
                    </Nav>
                ) : props.type.type === "patient" ? (
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Tomarhoras">Tomar hora</Nav.Link>
                        <Nav.Link as={Link} to="/HorasReservadas">Horas reservadas</Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/esperaSecretaria">Espera</Nav.Link>
                        <Nav.Link as={Link} to="/disponibilidad">Disponibilidad</Nav.Link>
                        <Nav.Link as={Link} to="/HorasSecretaria">Tomar reservadas</Nav.Link>
                        <Nav.Link as={Link} to="/recaudacion">Recaudación</Nav.Link>
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