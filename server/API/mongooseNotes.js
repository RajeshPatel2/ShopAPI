//how to define schema
var mongoose = require("mongoose");
const { find } = require("./models/orders");
var mySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: "xyz" },
    email: { type: String, require: true },
    age: { type: Number, min: 18, max: 45 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    createdAt: { type: Date },
  },
  {
    timestamps: true, // will create createdAt and updated at on each collection
  }
);
module.exports = mongoose.model("myCollection", mySchema);

//how to find(get is in different file)
//1>find all
var collection = require("./myCollection"); //Schema is in same folder as get thats why we write ./
collection.find().then().catch();

//2> findById
var id = req.body.Id;
collection.findById(id).then().catch();

//3> find all
//here we are doing find by all but we required only emial and age.
collection.find().select("email age").then().catch();

//4> find all and populate from another collection
//here we are doing find by all but we required only emial and age.
collection.find().populate("product").then().catch(); //this product is in line 9, populate is used to get collection from other table

//5> find all but here we required person whose age is 30
collection.find({ age: 30 }).then().catch();

//6> find all but here we required person whose age is greater than equal 30
collection
  .find({ age: { $gte: 30 } })
  .then()
  .catch(); // $gte means greater than equal to
// $gt means geater than

//7> find all but here we required person whose age is less than 35
collection
  .find({ age: { $lte: 35 } })
  .then()
  .catch(); // $lte means less than equal to
// $lt means less than

//8> find all but here we required person whose age is greater than 30 and  less than 35
collection
  .find({ $and: [{ age: { $gt: 30 } }, { age: { $lt: 35 } }] })
  .then()
  .catch();

//8> find all but here we required person whose age is less than 30 or greater than 35
collection
  .find({ $or: [{ age: { $lt: 30 } }, { age: { $gt: 35 } }] })
  .then()
  .catch();

//Post Method(insert into database)
var documentName = new collection({
  //here collection is kind of class so we are creating new documentName variable in which thsi collection is stored.
  //the documentName is just a name it can be anything.
  _id: new mongoose.Types.ObjectId(),
  name: req.body.Name, //this Name,Age,Email,productId has to pass as variable in body in postman
  age: req.body.Age,
  email: req.body.Email,
  product: req.body.productId, //here productId is just for understabding you can keep any name instaed of productId.
  //but here we are keeping name as productId because this product  will fetch the data from other table, we are not passing any product details
});
documentName.save().then().catch();

//patch methods(update particular collection in data base)
collection.findByIdAndUpdate("id", { email: "xyzgmail.com" }).then().catch(); //this will update particular id's email
collection
  .findOneAndUpdate({ age: 30 }, { email: "xyzgmail.com" })
  .then()
  .catch(); //this will update email of all users whose age is equal to 30

//Delete method

collection
  .deleteOne({ age: { $lte: 18 } })
  .then()
  .catch(); //this will delete first user in the collection whose age is less than 18

//insert multiple collection without loop
collection.insertMany(req.body).then().catch(); //here req.body which is passed in insertMany is array of objects like[{name:"jay",age:30},{name:"vijay",age:40}]

//delete multiple collection from database
collection
  .deleteMany({ age: { $lte: 18 } })
  .then()
  .catch(); //this will delete all users whose age is less than 18

try {
  await collection.find();
} catch (error) {}
