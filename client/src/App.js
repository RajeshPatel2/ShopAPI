import Login from "./components/login";
import Signup from "./components/signup";
import Products from "./components/product";
import Orders from "./components/orders/orders";
import AllOrders from "./components/orders/allOrders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/allorders" component={AllOrders} />
      </Switch>
    </Router>
  );
}

export default App;
