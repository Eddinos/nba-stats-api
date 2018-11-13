import axios from 'axios'
import express from 'express'
var routes = express.Router()
import Player from '../../mongoose/player'
import Team from '../../mongoose/team'
import addPlayer from './addPlayer'
import addTeam from './addTeam'
import simplifyPlayers from '../Utils/simplifyPlayers'
import simplifyTeams from '../Utils/simplifyTeams'
import handleErrors from '../Utils/handleErrors'

routes.use('/player', addPlayer);
routes.use('/team', addTeam);

routes.get('/', (req, res, next) => {
  const playersFetch = axios.get('http://www.nba.com/players/active_players.json')
  .then(getSimplePlayers)
  .then(players => {
    return Player.insertMany(players)
    .catch(handleErrors)
  })
  .catch(handleErrors);

  const teamsFetch = axios.get('http://fr.global.nba.com/stats2/season/conferencestanding.json?locale=en')
  .then(getSimpleTeams)
  .then(teams => {
    return Team.insertMany(teams)
    .catch(handleErrors)
  })
  .catch(handleErrors);

  Promise.all([playersFetch, teamsFetch]).then(d => res.send(JSON.stringify(d)))
})

export default routes;

const getSimplePlayers = res => (simplifyPlayers(res.data));
const getSimpleTeams = res => (simplifyTeams(res.data.payload.standingGroups));
