import React, { useState } from "react";
import axios from "axios";

function EditOrders({ orders, index, location }) {
  const oquantity = orders[index].quantity;
  const [quantity, setQuantity] = useState(oquantity);
  const oid = orders[index]._id;
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const patchRequest = async () => {
    const body = {
      quantity: quantity,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${location.state.token}`,
    };

    const response = await axios.patch(
      `http://localhost:8081/orders/${oid}`,
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
        data-target={`#${oid}`}
      >
        Edit
      </button>
      <div
        class="modal fade"
        id={oid}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Orders
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
                  <label for="name">Product Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(event) => handleQuantity(event)}
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

export default EditOrders;
