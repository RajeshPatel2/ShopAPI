import React from "react";
import axios from "axios";

function DeleteOrders({ orders, index, location }) {
  const pid = orders[index]._id;
  const deleteOrders = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };
    console.log(pid);
    const response = await axios.delete(`http://localhost:8081/orders/${pid}`, {
      headers,
    });
    console.log(response.data);
  };
  const handleDelete = () => {
    console.log(index);
    console.log(orders[index]);

    deleteOrders();
  };
  return (
    <span>
      <button className="btn btn-danger ml-2" onClick={handleDelete}>
        Delete
      </button>
    </span>
  );
}

export default DeleteOrders;
