// const express = require("express");

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const app = express();
const port = 8080;
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(
    "mongodb+srv://admin-maharaj:1wRLXo8LtKmgtspu@cluster0.v5ijs0w.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(port))
  .then(() => console.log("Connected to database & server: 8080"))
  .catch((err) => console.log(err));
