// const express = require("express");

const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const app = require("./app");
require("./routes")(app);

const port = 8080;

// app.get("/");

mongoose
  .connect(
    "mongodb+srv://admin-maharaj:1wRLXo8LtKmgtspu@cluster0.v5ijs0w.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.get("/");

app.listen(port, () => {
  console.log("Listeing: 8080");
});
