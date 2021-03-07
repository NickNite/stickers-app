const express = require("express");
const routerDiet = express.Router();

const Diet = require("../models/Diet");

//Настраиваем end point для Rest API
routerDiet.get("/", async (req, res) => {
  res.status(200).json(await Diet.find());
});

module.exports = routerDiet;
