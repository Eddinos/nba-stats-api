import getProjection from './getProjection'
import { querifyArgs } from '../Utils/query'
import PlayerMongo from '../../mongoose/player'
import { feetToMeters, poundsToKg } from '../Utils/conversions'


const playerResolver = (root, args, source, fieldASTs) => {
  var projections = getProjection(fieldASTs);
  if (projections.team) projections.teamTricode = projections.team;
  if (projections.height) projections.heightFeet = projections.heightInches = projections.height;
  let query = querifyArgs(args);
  var foundPlayers = new Promise((resolve, reject) => {
      PlayerMongo.find(query, projections,(err, players) => {
          err ? reject(err)
          : resolve(players);
      })
  })

  return foundPlayers
}

const heightResolver = (player, args) => {
  let language = args.language || 'en-US'
  switch (language) {
    case 'en-US':
      return `${player.heightFeet}" ${player.heightInches}'`;
    default:
      return feetToMeters(player.heightFeet, player.heightInches).toFixed(2);
  }
}

const weightResolver = (player, args) => {
  let language = args.language || 'en-US'
  switch (language) {
    case 'en-US':
      return player.weight;
    default:
      return Math.round(poundsToKg(player.weight));
  }
}

export default playerResolver;
export {heightResolver, weightResolver}
