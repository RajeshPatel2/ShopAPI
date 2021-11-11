import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteOrders from "./deleteOrders";
import EditOrders from "./editOrders";

function AllOrders(props) {
  const { history, location } = props;
  const [orders, setOrders] = useState([]);

  //const handleBuy = (index) => {
  //   const pid = products[index]._id;
  //   const token = location.state.token;
  //   const quantity = products.quantity;
  //   history.push("/orders", { pid, token });
  // }

  const getOrders = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };
    const response = await axios.get(
      "http://localhost:8081/orders/getusersorder",
      {
        headers,
      }
    );
    setOrders(response.data.orders);
    console.log(orders);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const handleRefresh = () => {
    getOrders();
  };

  return (
    <div className="container-fluid">
      <span> </span>
      <span>
        <button className="btn btn-primary ml-2 mt-2" onClick={handleRefresh}>
          Refresh
        </button>
      </span>
      <div className="d-flex flex-wrap">
        {orders.map((order, index) => (
          <div className="card border-primary m-2">
            <div className="card-header">{order._id}</div>
            <div className="card-body text-primary">
              <p>{order.quantity}</p>
              <div>
                <span>
                  {<EditOrders {...props} orders={orders} index={index} />}
                </span>
                <span>
                  <DeleteOrders {...props} orders={orders} index={index} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllOrders;
