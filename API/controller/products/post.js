const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
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
};
