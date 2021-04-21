const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


const SuperheroType = new GraphQLObjectType({
  name: 'Superhero',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    group: { type: GraphQLString }
  })
});

let data = [
  {
    name: "Spider Man",
    group: "Avenger"
  }
];

let group = [
  {
    name: "Avenger Plus"
  }
]

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    superhero: {
      type: new GraphQLList(SuperheroType),
      resolve(parentValue, args) {
        return data;
      }
    },
    group: {
      type: new GraphQLList(SuperheroType),
      resolve(parentValue, args) {
        return group;
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSuperhero: {
      type: SuperheroType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        group: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        data.push({
          name: args.name, 
          group: args.group
        });
        return args;
      }
    },
    addGroup: {
      type: SuperheroType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        group.push({
          name: args.name
        });
        return args;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});