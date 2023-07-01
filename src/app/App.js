import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="col-auto p-5 text-center">
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
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
          </fieldset>
        </form>
        <div className="btn-group-vertical">
          <button type="button" className="btn btn-primary">
            Iniciar Sesión
          </button>
          <button type="button" className="btn btn-primary">
            Registrarse
          </button>
        </div>
      </div>
    );
  }
}
export default App;
