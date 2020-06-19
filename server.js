//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connection;
const session = require('express-session')
require('dotenv').config()


//Database

const PROJECT3_DB = process.env.PROJECT3_DB;
const SECRET = process.env.SECRET;

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(session({
    secret:'localsonly',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('hello');
})

//Listener
app.listen(3000, () => {
    console.log('listening...');
})
