const express = require('express')

const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')

const app = express();



// so that the server can understand json data coming from the client
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter);

module.exports = app;