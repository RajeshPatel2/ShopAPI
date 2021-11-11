const express = require("express");
const router = express();
const Order = require("../models/orders");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const getOrders = require("../controller/orders/get");
const deleteOrders = require("../controller/orders/delete");
const postOrders = require("../controller/orders/post");
const getUsersOrder = require("../controller/orders/getUsersOrder");
const patchOrders = require("../controller/orders/patch");

router.get("/", checkAuth, getOrders);

router.post("/", checkAuth, postOrders);

router.get("/:ordersId", checkAuth, getOrders);

router.delete("/:ordersId", checkAuth, deleteOrders);

router.get("/getusersorder", checkAuth, getUsersOrder);

router.patch("/:ordersId", checkAuth, patchOrders);

module.exports = router;
