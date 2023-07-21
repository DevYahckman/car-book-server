const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  dayPrice: { type: String, required: true },
  weekPrice: { type: String, required: true },
  monthPrice: { type: String, required: true },
  carDetails: [
    {
      seat: Number,
      door: Number,
      baggage: Number,
      millage: Number,
      transmission: String,
      luggage: Number,
    },
  ],
});

const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(10),
    dayPrice: Joi.number().required(),
    weekPrice: Joi.number().required(),
    monthPrice: Joi.number().required(),
    carDetails: Joi.array().required(),
  });

  return schema.validate(car);
}

exports.carSchema = carSchema;
exports.Car = Car;
exports.validate = validateCar;
