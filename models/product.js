const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  brand: { type: Object, index: true },
  article: String,
  title: { type: String, index: true },
  images: Array,
  price: Number,
  highlighted: { type: Number, index: true },
  saleoff: { type: Number, index: true },
  unites: Number,
  description: Array,
  specifications: Array,
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id), delete returnedObject._id;
  },
});

const Product = new model("product", productSchema);

module.exports = Product;
