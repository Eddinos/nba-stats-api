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
      type: (GraphQLString),
      description: 'First name of the player',
    },
    lastName: {
      type: GraphQLString,
      description: 'Family name of the player',
    },
    jersey: {
      type: GraphQLInt,
      description: 'usual jersey number'
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
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {firstName}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise((resolve, reject) => {
              PlayerMongo.find({firstName}, projections,(err, todos) => {
                  err ? reject(err) : resolve(todos)
              })
          })

          return foundItems
        }
      }
    }
  })

});

export default schema;
