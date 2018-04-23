import getProjection from './getProjection'
import { querifyArgs } from '../Utils/query'
import PlayerMongo from '../../mongoose/player'


const playerResolver = (root, args, source, fieldASTs) => {
  var projections = getProjection(fieldASTs);
  if (projections.team) projections.teamTricode = projections.team;
  if (projections.height) projections.heightFeet = projections.heightInches = projections.team;
  let query = querifyArgs(args);
  var foundPlayers = new Promise((resolve, reject) => {
      PlayerMongo.find(query, projections,(err, players) => {
          err ? reject(err)
          : resolve(players);
      })
  })

  return foundPlayers
}

export default playerResolver;
