const express = require("express");
const routerSnackBarData = express.Router();

const SnackBarData = require("../models/SnackBarData");

//Настраиваем end point для Rest API
routerSnackBarData.get("/", async (req, res) => {
  res.status(200).json(await SnackBarData.find());
});

routerSnackBarData.post("/", async (req, res) => {
  try {
    const record = new SnackBarData(req.body);
    await record.save();
    res.writeHead(201, "OK", { "Content-Type": "text/plain" });
    res.end();
  } catch {
    res.writeHead(404, "Not Found", { "Content-Type": "text/plain" });
    res.end();
  }
});

routerSnackBarData.put("/:id", async (req, res) => {
  try {
    await SnackBarData.findByIdAndUpdate(req.params.id, req.body);
    res.writeHead(200, "Updated", { "Content-Type": "text/plain" });
    res.end();
  } catch {
    res.writeHead(404, "ERROR", { "Content-Type": "text/plain" });
    res.end();
  }
});

// SnackBarData.deleteMany({ dish: "1" }, function(err, result) {
//   if (err) return console.log("ERROR", err);

//   console.log("SUCCESS", result);
// });

module.exports = routerSnackBarData;
