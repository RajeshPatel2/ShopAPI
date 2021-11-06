const express = require("express");
const router = express();
const Order = require("../models/orders");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const getOrders = require("../controller/orders/get");
const deleteOrders = require("../controller/orders/delete");
const postOrders = require("../controller/orders/post");

router.get("/", checkAuth, getOrders);

router.post("/", checkAuth, postOrders);

router.get("/:ordersId", checkAuth, getOrders);

router.delete("/:ordersId", checkAuth, deleteOrders);

module.exports = router;
