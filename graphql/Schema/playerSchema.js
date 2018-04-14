import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import PlayerMongo from '../../mongoose/player'
import TeamMongo from '../../mongoose/team'
import {teamType} from './teamSchema'

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var playerType = new GraphQLObjectType({
  name: 'player',
  description: 'basketball player',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      description: 'First name of the player',
    },
    lastName: {
      type: GraphQLString,
      description: 'Family name of the player',
    },
    jersey: {
      type: GraphQLInt,
      description: 'usual jersey number'
    },
    fullName: {
      type: GraphQLString,
      description: 'first and lastname of a player'
    },
    img: {
      type: GraphQLString,
      description: 'url of player portrait'
    },
    team: {
      type: teamType,
      args: {
        tricode: {
          type: GraphQLString
        }
      },
      resolve: (player, args, source, fieldASTs) => {
        var projections = getProjection(fieldASTs);
        args.tricode = player.teamTricode;
        let query = querifyArgs(args);
        var foundItems = new Promise((resolve, reject) => {
            TeamMongo.findOne(query, projections,(err, teams) => {
                err ? reject(err) : resolve(teams)
            })
        })
        return foundItems
      }
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      player: {
        type: new GraphQLList(playerType),
        args: {
          firstName: {
            name: 'firstName',
            type: GraphQLString
          },
          lastName: {
            name: 'lastName',
            type: GraphQLString
          },
          jersey: {
            name: 'jersey',
            type: GraphQLInt
          },
          fullName: {
            name: 'fullName',
            type: GraphQLString
          },
          teamTricode: {
            name: 'teamTricode',
            type: GraphQLString
          }
        },
        resolve: (root, args = {firstName, lastName, jersey, fullName, img, team}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          projections.teamTricode = projections.team;
          let query = querifyArgs(args);
          var foundPlayers = new Promise((resolve, reject) => {
              PlayerMongo.find(query, projections,(err, players) => {
                  err ? reject(err)
                  : resolve(players);
              })
          })

          return foundPlayers
        }
      }
    }
  })

});

const funktion = function (players, resolve) {
  players.forEach(p => {
    if (p.teamTricode) {
      TeamMongo.find({tricode: p.teamTricode}, (err, teams) => {
        p.team = teams[0]
      })
    }
  }).then(()=>resolve(players))

}

const querifyArgs = function (args) {
  let query = {};
  for (let key in args) {
    if (args[key] != null && typeof args[key] === 'string') query[key] = new RegExp(args[key], 'i')
    else query[key] = args[key]
  }
  return query;
}

export default schema;
