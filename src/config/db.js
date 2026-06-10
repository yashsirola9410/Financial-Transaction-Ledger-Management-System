//for connecting database
const mongoose = require('mongoose');

function connectToDB(){

    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Server is connected to the database")
      })
      .catch((err) => {
        console.log("Error in database connection")
      })
}

module.exports  =  connectToDB