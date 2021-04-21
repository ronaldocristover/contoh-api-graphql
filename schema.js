const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


const AnimeType = new GraphQLObjectType({
  name: 'Anime',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    director: { type: GraphQLString },
    year: { type: GraphQLInt },
  })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLInt },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
    })
  });



// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args) {
          return axios.get(`${server}/users/`)
            .then(res => res.data);
        }
      }
  }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parentValue, args) {
          // call database
          data -> db mysql / /mongo / sql 
          return res.json(data)
          return axios.post(`${server}/users`, {
            firstName: args.firstName,
            lastName: args.lastName,
          }).then(res => res.data);
        }
      },
      findUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
          return axios.get(`${server}/users/`+ args.id)
            .then(res => res.data);
        }
      },
      updateUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
        },
        resolve(parentValue, args) {
            return axios.patch(`${server}/users/`+args.id, args)
            .then(res => res.data);
        }
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(parentValue, args) {
            return axios.delete(`${server}/users/`+args.id, args )
            .then(res => res.data);
        }
      },
    }
  });
  
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});