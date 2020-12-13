var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
import routes from './routes'
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.NODE_ENV == 'production' ? `mongodb+srv://${process.env['db-user-name']}:${process.env['db-user-lemonade']}@nba-stats.e68ly.mongodb.net/<dbname>?retryWrites=true&w=majority` : `mongodb://localhost:27017/NBA-stats`

mongoose.connect(DB_CONNECTION);
var db = mongoose.connection;
db.on('error', ()=> {console.log( 'FAILED to connect to mongoose', DB_CONNECTION, process.env)})
db.once('open', () => {
 console.log( 'Connected to mongoose')
})

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') {
		res.end();
	} else {
	next();
	}
});

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// start the server
app.listen(PORT,()=> {console.log(`Running on port ${PORT}`)})
