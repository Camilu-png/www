import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function Login(props: {
  username: string;
  password: string;
  setScreen: any;
  setUsername: any;
  setPassword: any;
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
          console.log(res.data);
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
        const [data, setData] = useState();
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
        <div className="d-flex flex-column">
          <button
            type="button"
            className="btn btn-primary w-70 p-3"
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button type="button" className="btn btn-primary w-70 p-3">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewDoctor(props: { setLogout: any; setScreen: any }) {
  return (
    <div>
      <p>Doctor</p>
    </div>
  );
}

function ViewPatient(props: { setLogout: any; setScreen: any }) {
  return (
    <div>
      <p>Patient</p>
    </div>
  );
}

function ViewSecretary(props: { setLogout: any; setScreen: any }) {
  return (
    <div>
      <p>Secretary</p>
    </div>
  );
}

function View(props: { screen: string; setScreen: any }) {
  const { screen, setScreen } = props;
  const [logout, setLogout] = useState(false);
  const user_type = "doctor"; // FIXME: Get user type from server

  return (
    <>
      {user_type === "doctor" ? (
        <ViewDoctor setLogout={setLogout} setScreen={setScreen} />
      ) : user_type === "patient" ? (
        <ViewPatient setLogout={setLogout} setScreen={setScreen} />
      ) : (
        <ViewSecretary setLogout={setLogout} setScreen={setScreen} />
      )}
    </>
  );
}

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [screen, setScreen] = React.useState("auth");

  return (
    <div className="App">
      {screen === "auth" ? (
        <Login
          username={username}
          password={password}
          setScreen={setScreen}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;
