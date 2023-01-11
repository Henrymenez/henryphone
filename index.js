const express = require("express");
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get("/ping",(req,res)=>{
    res.status(200).send({message: "Welcome to Ecom App"})
})

app.use("/admin", require("./routes/admin"));

// Not found route - 404
app.use("**", (req, res) => {
    res.status(404).send({ message: "Route not found" })
  })
   
  
  app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to database')
    } catch (error) {
      console.log(" Couldn't connect to database ", error)
    }
  
    console.log(`App is runing on http://localhost:${port}`)
  });