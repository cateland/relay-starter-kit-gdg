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
} from './database';

import {findIdFromUrl, People, peopleDataFetcher, getPeoples, Film, filmDataFetcher} from './api';

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
    title: { type: GraphQLString }
    /** CREER LE LIEN ENTRE FILM et CHARACTER */
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
    }
  }),
});


/** /const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    incrementVote: CreateIncrementVoteMutation
  })
}); */

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  //mutation: mutationType
});
