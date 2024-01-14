import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productModel from "./Model/products.js";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/shopify");

app.post("/submit", (req, res) => {
  const product = new productModel(req.body);
  let data = req.body;
  if (
    data.productId === null ||
    data.productName === "" ||
    data.quantity === null ||
    data.status === "" ||
    data.date === ""
  ) {
    return res.status(400).send({
      message: "Please fill the required field",
    });
  }
  console.log(product);
  product
    .save()
    .then((response) => res.json(response))
    .catch((error) =>
      res.status(400).send({
        message: error.message,
      })
    );
});
app.get("/", (req, res) => {
  const { searchData, fromDate, toDate, status, availableStatus } = req.query;
  let query = {};
  if (searchData) {
    query.$or = [
      { productName: { $regex: searchData, $options: "i" } },
      { productId: parseInt(searchData) ? parseInt(searchData) : 0 },
    ];
  }
  if (status) {
    query.status = status;
  }
  if (fromDate && toDate) {
    query.date = { $gt: fromDate, $lt: toDate };
  }
  if (availableStatus === "Available") {
    query.quantity = { $gt: 0 };
  }
  if (availableStatus === "Out of stock") {
    query.quantity = { $eq: 0 };
  }
  productModel
    .find(query)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error));
});
app.get("/getProduct/:id", (req, res) => {
  const id = req.params.id;
  productModel
    .findById(id)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error));
});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  let data = req.body;
  if (
    data.productId === null ||
    data.productName === "" ||
    data.quantity === null ||
    data.status === "" ||
    data.date === ""
  ) {
    return res.status(400).send({
      message: "Field Should not be empty",
    });
  }
  productModel
    .findByIdAndUpdate(id, {
      productId: req.body.productId,
      productName: req.body.productName,
      quantity: req.body.quantity,
      status: req.body.status,
      date: req.body.date,
    })
    .then((response) => res.json(response))
    .catch((error) =>
      res.status(400).send({
        message: error.message,
      })
    );
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  productModel
    .findByIdAndDelete(id)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});
app.listen(port, (req, res) => {
  console.log("server is running on port " + port);
});
