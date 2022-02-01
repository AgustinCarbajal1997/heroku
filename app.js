const express = require("express");
const session = require("express-session");
const cors = require("cors");
const config = require("./config");
require("dotenv").config();
const app = express();
const products = require("./routes/products");
const auth = require("./routes/auth");
const carts = require("./routes/carts");
const purchases = require("./routes/purchases");

const PORT = process.env.PORT || 3000;

// session setup
app.use(cors());
app.use(express.json());
app.use(session(config.session));
console.log("Se ejecuta")



app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/cart", carts);
app.use("/api/purchase", purchases)
app.use("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});
