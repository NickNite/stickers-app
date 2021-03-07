const express = require("express");
const routerSnackBar = express.Router();

const SnackBar = require("../models/SnackBar");

//Настраиваем end point для Rest API для списка SnackBar
routerSnackBar.get("/", async (req, res) => {
  res.status(200).json(await SnackBar.find());
});

module.exports = routerSnackBar;
