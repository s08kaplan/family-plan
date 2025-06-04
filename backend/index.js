"use strict"
 
const express = require("express")
const app = express()
//  const path = require("path")
const cors = require("cors")

require("dotenv").config()

const HOST = process.env.HOST || "127.0.0.1"
const PORT = process.env.PORT || 8000 

require("express-async-errors")  //* async-errors to errorHandler
// const { connectRabbitMQ } = require("../../shared/utils/rabbitMQClient");
// const { redisClient } = require("../../shared/utils/redisClient");

//* MONGODB Connection
const { dbConnection } = require("./src/configs/dbConnection")
dbConnection()

//* JSON for data interchange
app.use(express.json())
app.use(express.urlencoded({ limit:"50mb",extended:true}))
app.use(cors())

// Call static uploadFile:
app.use('/uploads', express.static('./upload'))
// app.use(express.static(path.join(__dirname, "public")))

// Run Logger:
// app.use(require('./src/middlewares/logger'))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))
app.use(require("./src/middlewares/queryHandler"))

app.all('/', (req, res) => {
 res.send({
     error: false,
     message: 'Welcome to Authentication/Authorization API',
     user: req.user
 })
})

//* Routes:
app.use(require("./src/routes"))

//! Invalid url check
app.all('*', (req, res) => {
    res.status(404).send({
        error: true,
        message: 'Invalid endpoint',
        user: req.user
    })
   })

//    // RabbitMQ Connection
// connectRabbitMQ();

// // Redis Connection
// redisClient.connect().catch(console.error);

//*error handler
app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, () => console.log(`Server is running on http://${process.env.HOST}:${PORT}`))

//  require("./src/helpers/sync")()  //! it clears the whole database
