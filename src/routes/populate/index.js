import axios from 'axios'
import express from 'express'
var routes = express.Router()
import Player from '../../mongoose/player'
import addPlayer from './addPlayer'
import addTeam from './addTeam'
import simplifyPlayers from '../Utils/simplifyPlayers'

routes.use('/player', addPlayer);
routes.use('/team', addTeam);

routes.get('/', (req, res, next) => {
  axios.get('http://www.nba.com/players/active_players.json')
  .then(response => {
    let playersToAdd = simplifyPlayers(response.data);
    Player.insertMany(playersToAdd)
    .then(() => {
      res.send(JSON.stringify(playersToAdd));
    })
    .catch(error => {
      res.send(error)
    })

  })
  .catch(err => console.log(err));
})

export default routes;
