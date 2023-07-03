import {Container, Nav, Navbar} from 'react-bootstrap';

function NavBar(props:{type:any}) {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Centro médico galenos</Navbar.Brand>
          {props.type.type === "doctor" ? (
                <Nav className="me-auto">
                    <Nav.Link href="#espera">Espera</Nav.Link>
                </Nav>
            ) : props.type.type === "patient" ? (
                <Nav className="me-auto">
                    <Nav.Link href="#horas">Tomar hora</Nav.Link>
                    <Nav.Link href="#reservada">Horas reservadas</Nav.Link>
                </Nav>
            ) : (
                <Nav className="me-auto">
                    <Nav.Link href="#espera">Espera</Nav.Link>
                    <Nav.Link href="#disponibilidad">Disponibilidad</Nav.Link>
                    <Nav.Link href="#reservadas">Tomar reservadas</Nav.Link>
                    <Nav.Link href="#recaudacion">Recaudación</Nav.Link>
                </Nav>
            )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;