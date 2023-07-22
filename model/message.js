const mongoose = require('mongoose')
const Joi = require('joi')

const messageSchema= new mongoose.Schema({
    name:{type:String, required:true, minlength:3},
    email:{type:String, unique:true},
    Date:{ type: Date, default: Date.now },
    message:{type:String, required:true}
})


const Message= mongoose.model('Message', messageSchema)

function validateMessage(message){
    const schema = Joi.object({
        name:Joi.string().required().min(3),
        email: Joi.string().required().email(),
        message: Joi.string().required(),
       
    })

    return schema.validate(message)
}


exports.messageSchema = messageSchema
exports.Message = Message
exports.validate= validateMessage