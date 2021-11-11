import axios from "axios";
import React, { useState } from "react";

function Signup(props) {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const fetchData = async () => {
    const body = { email: email, password: password };
    const header = { "Content-Type": "application/json" };
    const response = await axios.post(
      "http://localhost:8081/user/signup",
      body,
      { header }
    );
    return response.data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== "" && password === confirmPassword) {
      const data = fetchData();
      console.log(data);
      alert("New User Created Successfully");
      history.push("/");
    } else {
      alert("password and confirmPassword must be same");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="card border-primary mt-5">
            <div className="card-header">Signup</div>
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
                <div className="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => handleConfirmPassword(event)}
                    placeholder="Confirm Password"
                  />
                </div>
                <div>
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
