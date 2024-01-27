"use strict";
require("dotenv/config");

function newConnection(uri, options = {}) {
  const mongoose = require("mongoose");
  const connection = mongoose.createConnection(uri, options);
  connection.on("connected", function () {
    console.log(`MongoDB::: connected::: ${this.name}`);
  });
  connection.on("error", function (err) {
    console.log(`MongoDB::: error::: ${this.name} ${JSON.stringify(err)}`);
  });
  connection.on("disconnected", function () {
    console.log(`MongoDB::: disconnected::: ${this.name}`);
  });
  process.on("SIGINT", async () => {
    await connection.close().then(() => {
      console.info(
        "Mongoose primary connection disconnected through app termination!"
      );
      process.exit(0);
    });
  });
  return connection;
}

// create mongodb connection
const options = {
  serverSelectionTimeoutMS: 3000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = newConnection(process.env.MONGO_URI, options);
module.exports = connection;
