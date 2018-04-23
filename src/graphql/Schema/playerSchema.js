import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql/type';

import { teamType } from './teamSchema'
import playerResolver from '../Resolvers/playerResolvers'
import { heightResolver, weightResolver } from '../Resolvers/playerResolvers'
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
      type: GraphQLString,
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
    isAllStar: {
      type: GraphQLBoolean,
      description: 'whether or not the player was selected to play during the ASG'
    },
    position: {
      type: GraphQLString,
      description: `player's position`
    },
    height: {
      type: GraphQLFloat,
      description: `player's height`,
      args: {
        language: {
          type: GraphQLString,
          description: 'Enable localization of height'
        }
      },
      resolve: heightResolver
    },
    weight: {
      type: GraphQLFloat,
      description: `player's weight`,
      args: {
        language: {
          type: GraphQLString,
          description: 'enable localization of weight'
        }
      },
      resolve: weightResolver
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
            type: GraphQLString
          },
          fullName: {
            name: 'fullName',
            type: GraphQLString
          },
          teamTricode: {
            name: 'teamTricode',
            type: GraphQLString
          },
          isAllStar: {
            name: 'isAllStar',
            type: GraphQLBoolean
          },
          position: {
            name: 'position',
            type: GraphQLString
          }
        },
        resolve: playerResolver
      }
    }
  })

});

export default schema;
