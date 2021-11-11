import axios from "axios";
import React, { useState } from "react";

function AddProducts(props) {
  const { location } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const postRequest = async () => {
    const body = {
      name: name,
      price: price,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };
    const response = await axios.post("http://localhost:8081/products", body, {
      headers,
    });
    console.log(response.data);
  };

  const handleAdd = async () => {
    await postRequest();
  };

  return (
    <span>
      <button
        type="button"
        class="btn btn-primary mt-2"
        data-toggle="modal"
        data-target="#addProduct"
      >
        Add Products
      </button>
      <div
        class="modal fade"
        id="addProduct"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addProductLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Product
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group">
                  <label for="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => handleName(event)}
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="form-group">
                  <label for="price">Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(event) => handlePrice(event)}
                    placeholder="Product Price"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAdd}
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default AddProducts;
