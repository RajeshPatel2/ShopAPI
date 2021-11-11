import axios from "axios";
import React, { useState } from "react";

function Orders(props) {
  const { location, history } = props;
  const [quantity, setQuantity] = useState(0);

  const handleCancel = () => {
    const token = location.state.token;
    history.push("/products", { token });
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const fetchData = async () => {
    const body = { productsId: location.state.pid, quantity: quantity };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };
    console.log(headers);

    const response = await axios.post("http://localhost:8081/orders", body, {
      headers,
    });
    console.log(response.data);
  };

  const handleCbuy = () => {
    fetchData();
    const token = location.state.token;
    history.push("./allorders", { token });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-6">
          <div className="card border-primary mt-5">
            <div className="card-header">Welcome to Order Page</div>
            <div className="card-body text-primary">
              <div>{location.state.pname}</div>
              <br />
              <p>{location.state.pprice}</p>
              <div>
                <div>
                  <label for="quantity mr-2">
                    Quantity (between 1 and 50):
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(event) => handleQuantity(event)}
                  />
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={handleCbuy}
                  >
                    Confirm Buy
                  </button>
                </div>

                <span>
                  <button className="btn btn-danger" onClick={handleCancel}>
                    cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
