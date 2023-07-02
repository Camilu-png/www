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
  const { setScreen } = props;
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const auth = async () => {
      await axios
        .get("http://localhost:4000/authenticate", {
          auth: { username: props.username, password: props.password },
        })
        .then((res) => {
          props.setScreen(res.data.screen);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (login) {
      auth();
    }
  }, [login]);

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

function View(props: { screen: string; setScreen: any }) {
  const { screen, setScreen } = props;

  const [data, setData] = useState();

  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie"); // FIXME: Not working (change endpoint)
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  // TODO: Get data from server
  const getData = async () => {
    try {
      const res = await axios.get("/graphql"); // FIXME: Not working (change endpoint and add the query)
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>{screen}</p>
      <p>{data}</p>
      <button onClick={getData}>Get Data</button>
      <button onClick={deleteCookie}>Logout</button>
    </div>
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
