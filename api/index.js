//Imports
require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const todorouter = require("./routes/todoroutes");

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(todorouter);
//Server
const PORT = 8001 || process.env.PORT;
mongoose.connect(process.env.MONGO_URI).then(console.log("connected to db"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
