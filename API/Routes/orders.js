const express = require("express");
const router = express();
const Order = require("../models/orders");
const mongoose = require("mongoose");
router.get("/", (req, res, next) => {
  Order.find()
    .populate("product") //here this product is same as product in line 5 in orders.js schema file
    .select("quantity")
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "orders were fetched",
        orders: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/", (req, res, next) => {
  var order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productsId, //this productsId is to be passed as variable name in body in postman
    quantity: req.body.quantity,
  });
  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "orders was created",
        order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:ordersId", (req, res, next) => {
  res.status(200).json({
    message: "orders details",
    id: req.params.ordersId,
  });
});

router.delete("/:ordersId", (req, res, next) => {
  const id = req.params.ordersId;
  res.status(200).json({
    message: "orders deleted",
    id: id,
  });
});

module.exports = router;
