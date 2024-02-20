const express = require("express");
const bp = require("body-parser");
const fp = bp.urlencoded();
const app = express();

app.use(fp);
// const path = require("path");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bp.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/rest.html");
});
app.get("/addCar", (req, res) => {
  res.sendFile(__dirname+"/views/addCar.html")
});
app.get("/editCar/", (req, res) => {
  // idEdit =red.query.id;
  res.sendFile(__dirname+"/views/editCar.html")
});
let cars = [
    { id: 1, model: "aaa", licenseNumber: 1 },
    { id: 2, model: "bbb", licenseNumber: 2 },
    { id: 3, model: "ccc", licenseNumber: 3 },
    { id: 4, model: "ddd", licenseNumber: 4 },
    { id: 5, model: "eee", licenseNumber: 5 },
    { id: 6, model: "fff", licenseNumber: 6 },
  ],
  car = {},
  id = 0,
  carIndex = 0,
  count = cars.length;
app.post("/car/add", (req, res) => {
  car = req.body;
  car.id = ++count;
  cars.push(car);
  bodyData = {
    data: car,
  };
  car ? (bodyData.msg = "Success") : (bodyData.msg = "Failed");
  res.send(bodyData);
});
app.get("/car/show", (req, res) => {
  id = req.query.id;
  car = cars.find((car) => car.id == id);
  bodyData = {
    data: car,
  };
  car ? (bodyData.msg = "Success") : (bodyData.msg = "Failed");
  res.send(bodyData);
});
app.get("/car/delete/:id", (req, res) => {
  id = req.params.id;
  carIndex = cars.findIndex((car) => car.id == id);
  carIndex >= 0 ? cars.splice(carIndex, 1) : "";
  bodyData = {
    data: cars,
  };
  carIndex ? (bodyData.msg = "Success") : (bodyData.msg = "Failed");

  res.send(bodyData);
});
app.post("/car/edit", (req, res) => {
  id = req.query.id;
  carIndex = cars.findIndex((car) => car.id == id);
  carIndex >= 0
    ? ((cars[carIndex].model = req.body.model),
      (cars[carIndex].licenseNumber = req.body.licenseNumber))
    : "";
  bodyData = {
    data: cars,
  };
  carIndex ? (bodyData.msg = "Success") : (bodyData.msg = "Failed");

  res.send(bodyData);
  id = req.query.id;
});
app.get("/car/showAll", (req, res) => {
  res.send(cars);
});

app.listen(8088);
