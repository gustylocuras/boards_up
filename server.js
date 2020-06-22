//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connection;
const session = require('express-session')
require('dotenv').config()

//API
const API_KEY = process.env.API_KEY;


//Database

const PROJECT3_DB = process.env.PROJECT3_DB;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3000;

mongoose.connect(PROJECT3_DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ',PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(session({
    secret:'localsonly',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
app.use(express.static('public'));

//controllers
const sessionController = require('./controllers/session_controller.js')
app.use('/session', sessionController)
const usersController = require('./controllers/user_controller.js')
app.use('/users', usersController)
const locationController = require('./controllers/locations.js')
app.use('/boards', locationController)


app.get('/', (req, res) => {
  res.send('hello');
})

// mongoose.connect('mongodb://localhost:27017/boardcrud', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//     console.log('connected to mongod...');
// });

//Listener
app.listen(PORT, () => {
    console.log('listening...');
})
