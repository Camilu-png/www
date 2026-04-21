import { Container, Nav } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom"
import './NavBar.css';

function NavBar(props:{type:any}) {
  const getNavLinks = () => {
    if (props.type.type === "doctor") {
      return (
        <>
          <Nav.Link as={Link} to="/esperaDoctor" className="navbar-link">Espera</Nav.Link>
        </>
      );
    } else if (props.type.type === "patient") {
      return (
        <>
          <Nav.Link as={Link} to="/Tomarhoras" className="navbar-link">Tomar hora</Nav.Link>
          <Nav.Link as={Link} to="/HorasReservadas" className="navbar-link">Mis horas</Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/esperaSecretaria" className="navbar-link">Espera</Nav.Link>
          <Nav.Link as={Link} to="/disponibilidad" className="navbar-link">Disponibilidad</Nav.Link>
          <Nav.Link as={Link} to="/HorasSecretaria" className="navbar-link">Horas reservadas</Nav.Link>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="navbar-brand-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
            </div>
            <span className="navbar-brand-text">Centro Médico Galenos</span>
          </Link>
          
          <div className="navbar-nav">
            {getNavLinks()}
          </div>
          
          <div className="navbar-user">
            <div className="navbar-user-info">
              <div className="navbar-user-name">{props.type.name}</div>
              <div className="navbar-user-type">{props.type.type}</div>
            </div>
          </div>
        </div>
      </nav>

      <section className="navbar-content">
        <Outlet></Outlet>
      </section> 
    </>
  );
}

export default NavBar;