import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProducts from "./addProducts";
import EditProducts from "./editProduct";
import DeleteProduct from "./deleteProduct";

function Product(props) {
  const { history, location } = props;
  const [products, setProducts] = useState([]);

  const handleBuy = (index) => {
    const pname = products[index].name;
    const pprice = products[index].price;
    const pid = products[index]._id; //here_id is variable and it's name should be same as in schema same for price and name
    const token = location.state.token;
    const state = {
      pname,
      pprice,
      pid,
      token,
    };
    history.push("/orders", state); //we can pass only two parameters in push one is route and other is state.
  }; //here orders and product are sibling so that we can pass data in history.push

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8081/products");
    setProducts(response.data.docs);
  };

  const handleRefresh = () => {
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container-fluid">
      <span>
        <AddProducts {...props} />
      </span>
      <span>
        <button className="btn btn-primary ml-2 mt-2" onClick={handleRefresh}>
          Refresh
        </button>
      </span>
      <div className="d-flex flex-wrap">
        {products.map((product, index) => (
          <div className="card border-primary m-2">
            <div className="card-header">
              {product.name} {""} {product._id}
              {""} {index}
            </div>
            <div className="card-body text-primary">
              <p>{product.price}</p>
              <div>
                <span>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleBuy(index)}
                  >
                    Buy
                  </button>
                </span>
                <span>
                  <EditProducts {...props} products={products} index={index} />
                  {/* here product is parent component and edit product is child 
                  component so when we have to pass data in child component we
                  have pass like we have pass in line 67.we can pass data to
                  sibling and childs to pass sibling use history.push and pass
                  data in state which see line 22 and for paasing data to child
                  see line 67*/}
                </span>
                <span>
                  <DeleteProduct {...props} products={products} index={index} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
