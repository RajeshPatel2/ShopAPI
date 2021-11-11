import React from "react";
import axios from "axios";

function DeleteProduct({ products, index }) {
  const pid = products[index]._id;
  const deleteProducts = async () => {
    const response = await axios.delete(
      `http://localhost:8081/products/${pid}`
    );
  };
  const handleDelete = () => {
    deleteProducts();
  };
  return (
    <span>
      <button className="btn btn-danger ml-2" onClick={handleDelete}>
        Delete
      </button>
    </span>
  );
}

export default DeleteProduct;
