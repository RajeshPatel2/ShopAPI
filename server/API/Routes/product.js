const express = require("express");
const router = express();
const Product = require("../models/product");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
const getProducts = require("../controller/products/get");
const get_byidProducts = require("../controller/products/get_byid");
const postProducts = require("../controller/products/post");
const patchProducts = require("../controller/products/patch");
const deleteProducts = require("../controller/products/delete");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // /:/g is regular expression
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("/", getProducts);

router.post("/", checkAuth, postProducts);

router.get("/:productId", get_byidProducts);

router.patch("/:productId", patchProducts);

router.delete("/:productId", deleteProducts);

module.exports = router;
