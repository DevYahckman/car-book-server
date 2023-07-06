const mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
});

const Car = mongoose.model('Car', carSchema)

function validateCar(car){
    const schema = Joi.object({
        name:Joi.string().required().min(3),
        description:Joi.string().required().min(10)
    })

    return Joi
}