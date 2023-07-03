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
          console.log(err);
        });
    };
    if (login) {
      auth();
    }
  }, [login, props]);

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-5 p-5 d-flex flex-column">
        <form
          data-np-autofill-type="identity"
          data-np-checked="1"
          data-np-watching="1"
        >
          <fieldset>
            <legend>Ingrese sus datos</legend>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                data-np-autofill-type="email"
                data-np-uid="f6e19877-88d4-450a-be5b-b6d4028c3d86"
                onChange={(e) => props.setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </div>
          </fieldset>
        </form>
        <br />
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary w-70 p-3"
              onClick={() => setLogin(true)}
            >
              Iniciar sesión
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary w-70 p-3">
              Registrar
            </button>
          </div>
        </div>
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
