import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import TeamMongo from '../../mongoose/team'

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
          }
        },
        resolve: (root, {fullName, tricode, city, conference, division}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          let query = querifyArgs({fullName, tricode, city, conference, division});
          var foundItems = new Promise((resolve, reject) => {
              TeamMongo.find(query, projections,(err, players) => {
                  err ? reject(err) : resolve(players)
              })
          })

          return foundItems
        }
      }
    }
  })

});

const querifyArgs = function (args) {
  let query = {};
  for (let key in args) {
    if (args[key] != null) query[key] = args[key]
  }
  return query;
}

export default schema;
export {teamType};
