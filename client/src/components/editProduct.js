import axios from "axios";
import React, { useState } from "react";

function EditProducts({ products, index, location }) {
  console.log(index, products[index]);
  const pname = products[index].name;
  const pprice = products[index].price;
  const pid = products[index]._id;
  const [name, setName] = useState(pname);
  const [price, setPrice] = useState(pprice);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const patchRequest = async () => {
    const body = {
      name: name,
      price: price,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };

    const response = await axios.patch(
      `http://localhost:8081/products/${pid}`,
      body,
      {
        headers,
      }
    );
  };
  const handleEdit = async (event) => {
    await patchRequest();
  };
  return (
    <span>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#${pid}`}
      >
        Edit
      </button>
      <div
        class="modal fade"
        id={pid}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Product {pname} {""} {pid} {index}
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
                onClick={handleEdit}
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
export default EditProducts;
