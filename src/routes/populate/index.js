import axios from 'axios'
import express from 'express'
var routes = express.Router()
import Player from '../../mongoose/player'
import addPlayer from './addPlayer'
import addTeam from './addTeam'
import simplifyPlayers from '../Utils/simplifyPlayers'
import handleErrors from '../Utils/handleErrors'

routes.use('/player', addPlayer);
routes.use('/team', addTeam);

routes.get('/', (req, res, next) => {
  axios.get('http://www.nba.com/players/active_players.json')
  .then(getSimplePlayers)
  .then(players => {
    Player.insertMany(players)
    .then( () => res.send(JSON.stringify(players)) )
    .catch(handleErrors)
  })
  .catch(handleErrors);
})

export default routes;

const getSimplePlayers = res => (simplifyPlayers(res.data));
