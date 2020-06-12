//* Initialize app
const express = require('express')
const app = express()
const http = require('http').createServer(app)


//* Configure Environment Varables
const dotenv = require('dotenv')
dotenv.config()

//* Configure MongoDB
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
mongoose.connect(process.env.MONGO_URI, opions = { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
mongoose.connection.on('error', err => console.log('Database Error: ', err.message))
autoIncrement.initialize(mongoose.connection)


//* Middlewares
const morgan = require('morgan') //* For logging all the requests made to the server
const questionRoute = require('./routes/QuestionRoute')
const userRoute = require('./routes/UserRoute')
const bodyParser=require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.json()) //* For getting access to req.body 
app.use('/', questionRoute)
app.use('/', userRoute)



//* Setup Sockets
const socket = require('./Socket')
socket.initSockets(http)


//* Start server
http.listen(process.env.PORT)