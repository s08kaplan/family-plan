"use strict"

const mongoose = require("mongoose")

const dbConnection = function() {
    mongoose.connect(process.env.MONGODB)
    .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
    .catch(() => console.log("DB NOT connected"))
}

module.exports = {
    mongoose, dbConnection
}