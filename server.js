const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const authRoute = require("./routers/authRoute");
const sellerRoute = require("./routers/sellerRoute");

require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = 5500 || process.env.PORT;

app.use("/api/auth", authRoute);
app.use("/api/seller", sellerRoute);

app.use("/hello", (req, res) => {
  res.send("hello");
});

mongoose.connect(process.env.MONGO_URL);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
