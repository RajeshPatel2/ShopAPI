const express = require("express");
const router = express();
const Product = require("../models/product");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");

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

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs); //here docs will come in form of array
      res.status(200).json({ docs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  async (req, res, next) => {
    /*   let id;
  try {
    var doc = await Product.find();
    console.log(doc);
  } catch (error) {
    console.log(error);
  } */
    /*   Product
    .insertMany(req.body)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    }); */
    console.log(req.file);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Handlig post requests to products",
          createdProduct: product,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From data base", doc);
      if (doc) {
        res.status(200).json({ doc });
      } else {
        res.status(404).json({ message: "no valid entry found for given id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateV = {};
  console.log("body ", req.body);
  for (const v of req.body) {
    updateV[v.propName] = v.value;
  }

  Product.findByIdAndUpdate(id, updateV)
    .exec()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
