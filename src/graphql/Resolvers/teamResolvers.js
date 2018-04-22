import getProjection from './getProjection'
import { querifyArgs } from '../Utils/query'
import TeamMongo from '../../mongoose/team'

const teamResolver = (root, args, source, fieldASTs) => {
  var projections = getProjection(fieldASTs);
  let query = querifyArgs(args);
  var foundItems = new Promise((resolve, reject) => {
      TeamMongo.find(query, projections,(err, players) => {
          err ? reject(err) : resolve(players)
      })
  })

  return foundItems;
}

const teamPlayerResolver = (player, args, source, fieldASTs) => {
  var projections = getProjection(fieldASTs);
  args.tricode = player.teamTricode;
  let query = querifyArgs(args);
  var foundItem = new Promise((resolve, reject) => {
      TeamMongo.findOne(query, projections,(err, teams) => {
          err ? reject(err) : resolve(teams)
      })
  })
  return foundItem;
}

export default teamResolver;
export { teamPlayerResolver }
