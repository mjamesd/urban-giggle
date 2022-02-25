const { gql } = require('apollo-server-express');

//TODOS: Complete  mutations. -JM
//DONE: types and queries. -JM
//NOTE: The queries might not be complete. If there are issues, look here first.

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    points: Int
    foundItems: [HuntItem]
    completedHunts: [Hunt]
    badges: [Badge]
    createdAt: String
  }

  type Badge {
    _id: ID
    name: String!
    icon: String!
    description: String!
    points: Int
  }

  type Hunt {
    _id: ID
    name: String!
    description: String!
    points: Int
    huntItems: [huntItem]
  }

  type HuntItem {
    _id: ID
    name: String! 
    qrId: String
    hint1: String!
    hint2: String!
    hint3: String!
    solutionLocation: String!
    solutionDescription: String!
    solutionImg: String
    points: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]
    user(_id: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    hunts: [Hunt!]
    hunt(_id: ID!): Hunt
    huntItems: [HuntItem]
    huntItem(_id: ID!): HuntItem
    allBadges: [Badge!]
    badge(_id: ID!): Badge


  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(userId: ID!): Auth
    addHunt(_id: ID!): Hunt
    updateHunt(_id: ID!): Hunt
    removeHunt(_id: ID!): Hunt
    addHuntItem(_id: ID!): HuntItem
    removeHuntItem(_id: ID!): HuntItem
    addBadge(_id: ID!): Badge
    updateBadge(_id: ID!): Badge
    removeBadge(_id: ID!): Badge
  }
`;

module.exports = typeDefs;

/*

queries:
  user(userId: ID!): User
  me: User

  hunts: [Hunt]!
  hunt(huntId: ID!): Hunt

  huntItems: [HuntItem]!
  huntItem(huntItemId: ID!): HuntItem

  badges: [Badge]!
  badge(badgeId: ID!): Badge


mutations:
  addUser(username: String!, email: String!, password: String!): Auth
  updateUser(userId: ID!): Auth
  login: Auth

  addHunt: Hunt
  updateHunt: Hunt
  removeHunt: Hunt
  
  addHuntItem: HuntItem
  updateHuntItem: HuntItem
  removeHuntItem: HuntItem
  
  addBadge: Badge
  updateBadge: Badge
  removeBadge: Badge
  

*/