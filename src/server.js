var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
import routes from './routes'
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.NODE_ENV == 'production' ? `mongodb://${process.env['db-user-name']}:${process.env['db-user-lemonade']}@ds139278.mlab.com:39278/nba-stats` : `mongodb://localhost:27017/NBA-stats`

mongoose.connect(DB_CONNECTION);
var db = mongoose.connection;
db.on('error', ()=> {console.log( 'FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( 'Connected to mongoose')
})

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// start the server
app.listen(PORT,()=> {console.log(`Running on port ${PORT}`)})