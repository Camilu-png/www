import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ViewSecretary from "./ViewSecretary";
import ViewDoctor from "./ViewDoctor";
import ViewPatient from "./ViewPatient";
import Navbar from "./NavBar";
import Espera from "./Espera";
import ViewTomarHora from "./ViewTomarHora";
import DoctorForm from "./components/DoctorForm";
import ViewHorasReservadas from "./ViewHorasReservadas";
import ViewSeleccionarHora from "./ViewSeleccionarHora";
import ViewElegirMedico from "./ViewElegirMedico";

function Login(props: {
  username: string;
  password: string;
  setScreen: any;
  setUsername: any;
  setPassword: any;
  user: any;
  setUser: any;
}) {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = async () => {
      const data = {
        username: props.username,
        password: props.password,
      };
      await axios
        .post("http://localhost:4000/user/login", data)
        .then((res) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          props.setScreen("view");
          props.setUser(res.data.user);
        })
        .catch((err) => {
          setError("Credenciales inválidas. Por favor intenta de nuevo.");
          setLogin(false);
        });
    };
    if (login) {
      auth();
    }
  }, [login, props]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <h1 className="login-title">Centro Médico Galenos</h1>
          <p className="login-subtitle">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); setLogin(true); }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="tu@email.com"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="login-btn"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className="register-btn"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

function View(props: {
  screen: string;
  setScreen: any;
  user: any;
  setUser: any;
}) {
  return (
    <>
      {props.user.type === "doctor" ? (
        <BrowserRouter>
          <Navigate to="/esperaDoctor" />
        </BrowserRouter>
      ) : props.user.type === "patient" ? (
        <BrowserRouter>
          <Navigate to="/Tomarhoras" />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Navigate to="/esperaSecretaria" />
        </BrowserRouter>
      )}
    </>
  );
}

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [screen, setScreen] = React.useState("auth");
  const [user, setUser] = useState({});
  const [logout, setLogout] = useState(false);

  return (
    <div className="App">
      {screen === "auth" ? (
        <Login
          username={username}
          password={password}
          setScreen={setScreen}
          setUsername={setUsername}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
        />
      ) : (
        <div>
          <View
            screen={screen}
            setScreen={setScreen}
            user={user}
            setUser={setUser}
          />
          {/* Cambiar componentes Esperar por los que correspondan */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar type={user} />}>
                {/* Rutas Doctor */}
                <Route
                  path="esperaDoctor"
                  element={
                    <ViewDoctor
                      setLogout={setLogout}
                      setScreen={setScreen}
                      user={user}
                    />
                  }
                />
                {/* Rutas Paciente */}
                <Route
                  path="Tomarhoras"
                  element={
                    <ViewTomarHora
                      setLogout={setLogout}
                      setScreen={setScreen}
                      username={username}
                    />
                  }
                />
                <Route
                  path="ElegirMedico"
                  element={
                    <ViewElegirMedico
                      setLogout={setLogout}
                      setScreen={setScreen}
                      username={username}
                    />
                  }
                />
                <Route
                  path="MostrarHoras"
                  element={
                    <ViewSeleccionarHora
                      setLogout={setLogout}
                      setScreen={setScreen}
                      username={username}
                    />
                  }
                />
                <Route
                  path="HorasReservadas"
                  element={
                    <ViewPatient
                      setLogout={setLogout}
                      setScreen={setScreen}
                      username={username}
                    />
                  }
                />
                {/* Rutas Secretaria */}
                <Route
                  path="esperaSecretaria"
                  element={
                    <ViewSecretary
                      setLogout={setLogout}
                      setScreen={setScreen}
                      user={user}
                    />
                  }
                />
                <Route path="disponibilidad" element={<DoctorForm />} />
                <Route
                  path="HorasSecretaria"
                  element={<ViewHorasReservadas />}
                />
                <Route path="recaudacion" element={<Espera />} />

                <Route path="*" element={<Navigate replace to="/" />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
