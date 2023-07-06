const express = require('express')
const app= express()
const mongoose= require('mongoose')
const users=require('./routes/users')
const auth = require('./routes/auth')
const cars = require('./routes/cars')


app.use(express.json())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/cars', cars)










mongoose
  .connect("mongodb://127.0.0.1:27017/car-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to MongoDB"))
  .catch((err) => console.log("Could not connect", err));




const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})