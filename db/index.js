const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { urlDb } = require("../config");

mongoose.connect(urlDb, {
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
