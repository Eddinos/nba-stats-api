import express from 'express'
var routes = express.Router()
import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql'
import playerSchema from '../graphql/Schema/playerSchema'
import teamSchema from '../graphql/Schema/teamSchema'
import populate from './populate'


routes.get('/', (req,res)=>{
 res.send('This is NBA-stats-api')
})

routes.use('/player', graphqlHTTP (req => ({
 schema: playerSchema
 //,graphiql:true
})))

routes.use('/team', graphqlHTTP (req => ({
 schema: teamSchema
 //,graphiql:true
})))

routes.use('/populate', populate)


export default routes;
