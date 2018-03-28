import express from 'express'
var routes = express.Router()
import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql'
import schema from '../graphql/Schema/Schema'
import Player from '../mongoose/player'
import populate from './populate'


routes.get('/', (req,res)=>{
 res.send('This is NBA-stats-api')
})

routes.post('/player', (req, res) => {
 // Insert into TodoList Collection
 var newPlayer = new Player({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  jersey: req.body.jersey
 })
  newPlayer.save((err,result) => {
    if (err) {return res.json({success: false, msg: 'Failure'});}
    res.json({success: true, msg: 'Successfully created new player.'});
  })
})

routes.use('/graphql', graphqlHTTP (req => ({
 schema
 //,graphiql:true
})))

routes.use('/populate', populate)


export default routes;
