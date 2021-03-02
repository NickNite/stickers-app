const express = require("express");
const routerDietData = express.Router();

const DietData = require("../models/DietData");

//Настраиваем end point для Rest API
routerDietData.get("/", async (req, res) => {
  res.status(200).json(await DietData.find());
});

routerDietData.post("/", async (req, res) => {
  try {
    const record = new DietData(req.body);
    await record.save();
    res.writeHead(201, "OK", { "Content-Type": "text/plain" });
    res.end();
  } catch {
    res.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
    res.end();
  }
});

routerDietData.put("/:id", async (req, res) => {
  try {
    await DietData.findByIdAndUpdate(req.params.id, req.body);
    res.writeHead(200, "Updated", { "Content-Type": "text/plain" });
    res.end();
  } catch {
    res.writeHead(404, "ERROR", { "Content-Type": "text/plain" });
    res.end();
  }
});

module.exports = routerDietData;
