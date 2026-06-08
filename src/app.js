const express = require('express')

const cookieParser = require('cookie-parser')


//route require 
const authRouter = require('./routes/auth.routes')
const accountRouter = require('./routes/account.routes')

const app = express();



// so that the server can understand json data coming from the client
app.use(express.json())
app.use(cookieParser())



//route use 
app.use('/api/accounts' , accountRouter)
app.use('/api/auth', authRouter);

module.exports = app;