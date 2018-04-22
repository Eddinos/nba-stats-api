import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import { teamType } from './teamSchema'
import playerResolver from '../Resolvers/playerResolvers'
import { teamPlayerResolver } from '../Resolvers/teamResolvers'

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
      resolve: teamPlayerResolver
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
        resolve: playerResolver
      }
    }
  })

});

export default schema;
