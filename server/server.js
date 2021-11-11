const express = require("express");
const port = process.env.PORT || 8081;
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./API/Routes/product");
const orderRoutes = require("./API/Routes/orders");
const userRoutes = require("./API/Routes/user");

mongoose.connect("mongodb://localhost/shop");
mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

// mongoose.connect(
//   "mongodb://localhost:27017/shop",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error) => {
//     if (!error) {
//       console.log("mongo connected");
//     } else {
//       console.log("error");
//     }
//   }
// );

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "origin, X-Requested with,Content-Type, Accept,Authorization"
//   );
//if (method === "OPTIONS") {
//  res.header("Acsess-Controll-Allow-Methods", "PUT ,POST,PATCH,DELETE,GET");
//  return res.status(200).json({});
// }
//});

server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/user", userRoutes);

server.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
server.use((error, req, res, next) => {
  res.status = error.status || 500;
  res.json({
    error: {
      message: error.message,
    },
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
