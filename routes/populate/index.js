import axios from 'axios'
import express from 'express'
var router = express.Router()
import Player from '../../mongoose/player'

router.get('/', (req, res, next) => {
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
      jersey: player.jersey,
      id: player.personId
    }
  })
}

export default router;
