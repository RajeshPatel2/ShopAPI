const Product = require("../../models/product");

module.exports = (req, res, next) => {
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
};
