const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Express server
const app = express();

//DB
dbConnection();

//CORS
app.use(cors());

//Public route
app.use( express.static('public') );

//Body parser
app.use( express.json() );

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Listening
app.listen( process.env.PORT, ()=>{
    console.log('server: ', process.env.PORT);
});