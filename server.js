var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
import bodyParser from 'body-parser';
import Player from './mongoose/player'
import schema from './graphql/Schema/Schema'

import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql';

mongoose.connect('mongodb://localhost:27017/NBA-stats')
var db = mongoose.connection;
db.on('error', ()=> {console.log( 'FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( 'Connected to mongoose')
})

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// start the server
app.listen(3000,()=> {console.log("Running on localhost:3000")})

// bundle our routes
var apiRoutes = express.Router();

app.get('/',(req,res)=>{
 res.send('This is NBA-stats-api')
})

app.post('/player', (req, res) => {
 // Insert into TodoList Collection
 var newPlayer = new Player({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  jersey: req.body.jersey
 })
newPlayer.save((err,result) => {
  if (err) {return res.json({success: false, msg: 'Failure'});}
  res.json({success: true, msg: 'Successful created new player.'});
 })
})

app.use('/graphql', graphqlHTTP (req => ({
 schema
 //,graphiql:true
})))
