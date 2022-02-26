const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    points: Int
    foundItems: [HuntItem!]!
    completedHunts: [Hunt!]!
    badges: [Badge!]!
    isAdmin: Boolean
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
    huntItems: [HuntItem!]!
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
    user(userId: ID!): User
    me: User
    hunts: [Hunt!]
    hunt(huntId: ID!): Hunt
    huntItems: [HuntItem]
    huntItem(huntItemId: ID!): HuntItem
    badges: [Badge!]
    badge(badgeId: ID!): Badge
  }

  type Mutation {
    createBadge(
      name: String!
      icon: String!
      description: String!
      points: Int!
    ): Badge!
    updateBadge(
      badgeId: ID!
      newName: String
      newIcon: String
      newDescription: String
      newPoints: Int
    ): Badge!
    removeBadge(badgeId: ID!): Badge

    createHunt(name: String!, description: String!, points: Int!): Hunt!
    updateHunt(
      huntId: ID!
      newName: String
      newDescription: String
      newPoints: Int
    ): Hunt!
    removeHunt(huntId: ID!): Hunt

    createHuntItem(
      name: String!
      hint1: String!
      hint2: String!
      hint3: String!
      solutionLocation: String!
      solutionDescription: String!
      solutionImg: String
      points: Int!
    ): HuntItem!
    updateHuntItem(
      huntItemId: ID!
      newName: String
      newHint1: String
      newHint2: String
      newHint3: String
      newSolutionLocation: String
      newSolutionDescription: String
      newSolutionImg: String
      newPoints: Int
    ): HuntItem!
    removeHuntItem(huntItemId: ID!): HuntItem

    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(
      username: String!
      newUsername: String
      email: String!
      newEmail: String
      password: String!
      newPassword: String!
    ): Auth
    removeUser: User
    login(email: String!, password: String!): Auth
    changePoints(pointsToChange: Int): Auth
    userFoundHuntItem(huntItemId: ID!): Auth
    userCompletedHunt(huntId: ID!): Auth
    userAddBadge(badgeId: ID!): Auth
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
