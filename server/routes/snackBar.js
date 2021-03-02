const express = require("express");
const routerSnackBar = express.Router();

const SnackBar = require("../models/SnackBar");

//Настраиваем end point для Rest API для списка SnackBar
routerSnackBar.get("/", async (req, res) => {
  res.status(200).json(await SnackBar.find());
});

// routerSnackBar.post("/", async (req, res) => {
//   const recordSnackBar = new SnackBar(req.body);
//   await recordSnackBar.save(SnackBar);
//   try {
//     res.json({ state: "success" });
//   } catch {
//     res.json({ state: "error" });
//   }
// });

module.exports = routerSnackBar;
