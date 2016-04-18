/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  // Import methods that your schema can use to interact with your database
  Sondage,
  Vote,
  getVote,
  getSondage,
  incrementVote,
  addVote,
  removeVote
} from './database';

import {findIdFromUrl, People, peopleDataFetcher, Film, filmDataFetcher} from './api';

const peopleType = new GraphQLObjectType({
  name: 'People',
  description: 'star wars character',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    swapiId: {
      type: GraphQLInt,
      description: 'star wars api id'
    },
    name: {
      type: GraphQLString,
      description: 'name of the character'
    },
    gender: {
      type: GraphQLString,
      description: 'gender of the character'
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: parent => {
        return parent.films.map((id) => {
          return filmDataFetcher(id)
        })
      }
    },
  })
});

const filmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    characters: {
      type: new GraphQLList(peopleType),
      resolve: parent => {
        return parent.characters.map((id) => {
          return peopleDataFetcher(id);
        })
      }
    }
  })
});

const sondageType = new GraphQLObjectType({
    name: 'Sondage',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        titre: { type: GraphQLString },
        votes: {
            type: new GraphQLList(voteType),
            resolve: parent => {
                return parent.votes.map(element => {
                   return getVote(element); 
                });
            }
        }
    })
});

const voteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    people: {
      type: peopleType,
      resolve: parent => {
        return peopleDataFetcher(parent.id);
      }
    },
    count: { type: GraphQLInt }
  })
});



/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    people: {
      type: peopleType,
      description: 'can retrieve a sw characters from his id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, {id}) => {
        return peopleDataFetcher(id);
      }
    },
    film: {
      type: filmType,
      description: 'can retrieve a movie by its id',
      args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
      resolve: (parent, {id}) => {
        return filmDataFetcher(id);
      }
    },
    sondage: {
      type: sondageType,
      description: 'a pool about your favorites sw characters',
      args: {id: {type: new GraphQLNonNull(GraphQLString)}},
      resolve: (parent, {id}) => {
        return getSondage(id);
      }
    }
  }),
});


const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    incrementVote: {
      type: voteType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (parent, {id}) => {
        return incrementVote(id);
      }
    },
    addVote: {
      type: voteType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        },
        sondageId: {
          name: 'sondageId',
          type: new GraphQLNonNull(GraphQLString)
        },
        peopleId: {
          name: 'peopleId',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (parent, {sondageId, id, peopleId}) => {
        return addVote(sondageId, id, peopleId);
      }
    },
    removeVote: {
      type: GraphQLString,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        },
        sondageId: {
          name: 'sondageId',
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (parent, {sondageId, id}) => {
        return removeVote(sondageId, id);
      }
    }
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  mutation: mutationType
});
