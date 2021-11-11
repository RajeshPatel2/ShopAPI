import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const { history } = props; //history is property of props we can also write const history = props.history;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailerror, setIsEmailerror] = useState(false);

  const handleEmail = (event) => {
    if (isEmailerror) setIsEmailerror(false);
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  async function fetchData(email, password) {
    const body = { email: email, password: password };
    const header = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "http://localhost:8081/user/login",
      body,
      { header }
    );
    return response.data;
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //this will prevent page from refresh
    if (email.indexOf("@") === -1) setIsEmailerror(true);
    //here .indexof is string property, we can check index characters in string.if index is not found than it will be -1 and setIsEmailerror will become true
    else {
      const data = await fetchData(email, password);
      if (data && data.token) {
        const token = data.token;
        alert("Login Successfully");
        history.push("/products", { token });
      } else if (data && data.message) {
        alert("Invalid Credentials");
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="card border-primary mt-5">
            <div className="card-header">Login</div>
            <div className="card-body text-primary">
              <form>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => handleEmail(event)}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                {isEmailerror && (
                  <div className="text-danger">
                    Please enter proper email address
                  </div>
                )}
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => handlePassword(event)}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <button
                    onClick={(event) => handleSubmit(event)}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <span>
                    <button className="btn" onClick={handleSignup}>
                      New to Shop? Click here to Sign Up
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
