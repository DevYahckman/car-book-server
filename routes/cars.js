const express = require("express");
const router = express.Router();
const { Car, validate } = require("../model/car");
const _ = require("lodash");


router.get("/", async (req, res) => {
  // throw new Error('There is an error')
  const cars = await Car.find();
  res.send(cars);
});

router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(400).send("The given Car is not available");
  res.send(car);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const car = new Car(
    _.pick(req.body, [
      "name",
      "description",
      "dayPrice",
      "weekPrice",
      "monthPrice",
      "carDetails"

    ])
  );

  await car.save();
  res.send(car);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const car = await Car.findByIdAndUpdate(
    req.params.id,
    { $set: _.pick(req.body, ["name", "description"]) },
    { new: true }
  );

  if (!car) return res.status(404).send("The car is not available");

  res.send(car);
});

router.delete("/:id", async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);
  if (!car) return res.status(404).send("The car is not available");
  res.send(car);
});

module.exports = router;
