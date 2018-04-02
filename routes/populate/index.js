import axios from 'axios'
import express from 'express'
var routes = express.Router()
import Player from '../../mongoose/player'
import addPlayer from './addPlayer'
import addTeam from './addTeam'

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

const simplifyPlayers = function (playersList) {
  return playersList.map(player => {
    return {
      firstName: player.firstName,
      lastName: player.lastName,
      fullName: `${player.firstName} ${player.lastName}`,
      jersey: player.jersey,
      id: player.personId,
      img: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`
    }
  })
}

export default routes;
