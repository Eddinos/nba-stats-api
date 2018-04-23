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
    isAllStar: {
      type: GraphQLBoolean,
      description: 'whether or not the player was selected to play during the ASG'
    },
    position: {
      type: GraphQLString,
      description: `player's position`
    },
    height: {
      type: GraphQLString,
      description: `player's height`,
      args: {
        language: {
          type: GraphQLString,
          description: 'Enable localization of height'
        }
      },
      resolve: (player, args, source, fieldASTs) => {
        let language = args.language || 'en-US'
        switch (language) {
          case 'en-US':
            return `${player.heightFeet}" ${player.heightInches}'`;
          default:
            let feet = player.heightFeet * 30.48;
            let inches = player.heightInches * 2.54;
            return ((feet + inches) / 100).toFixed(2);
        }
      }
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
