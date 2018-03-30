import express from 'express'
var routes = express.Router()
import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql'
import schema from '../graphql/Schema/playerSchema'
import populate from './populate'


routes.get('/', (req,res)=>{
 res.send('This is NBA-stats-api')
})

routes.use('/graphql', graphqlHTTP (req => ({
 schema
 //,graphiql:true
})))

routes.use('/populate', populate)


export default routes;
