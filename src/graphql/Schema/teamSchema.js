import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import teamResolver from '../Resolvers/teamResolvers'


const teamType = new GraphQLObjectType({
  name: 'team',
  description: 'NBA team',
  fields: () => ({
    fullName: {
      type: GraphQLString,
      description: 'Full franchise name',
    },
    tricode: {
      type: GraphQLString,
      description: 'three letters code',
      resolve: t => t.tricode
    },
    city: {
      type: GraphQLString,
      description: 'Location of the franchise'
    },
    conference: {
      type: GraphQLString,
      description: 'Conference in which the team plays'
    },
    division: {
      type: GraphQLString,
      description: 'Division of the conference'
    },
    logo: {
      type: GraphQLString,
      description: 'Team logo'
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      team: {
        type: new GraphQLList(teamType),
        args: {
          fullName: {
            name: 'fullName',
            type: GraphQLString
          },
          tricode: {
            name: 'tricode',
            type: GraphQLString
          },
          city: {
            name: 'city',
            type: GraphQLString
          },
          conference: {
            name: 'conference',
            type: GraphQLString
          },
          division: {
            name: 'division',
            type: GraphQLString
          },
          logo: {
            name: 'logo',
            type: GraphQLString
          }
        },
        resolve: teamResolver
      }
    }
  })

});

export default schema;
export {teamType};
