const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    points: Int
    foundHuntItems: [HuntItem]
    completedHunts: [Hunt]
    badges: [Badge]
    favoriteHunts: [Hunt]
    favoriteHuntItems: [HuntItem]
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
    city: String!
    description: String!
    points: Int
    huntItems: [HuntItem!]!
    rewards: [Badge]
  }

  type HuntItem {
    _id: ID
    name: String!
    city: String!
    qrId: String
    hint1: String!
    hint2: String!
    hint2DisplayedTo: [User]
    hint3: String!
    hint3DisplayedTo: [User]
    solutionLocation: String!
    solutionDescription: String!
    solutionImg: String
    solutionDisplayedTo: [User]
    points: Int
    rewards: [Badge]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]
    user(userId: ID!): User
    me: User
    hunts: [Hunt]
    hunt(huntId: ID!): Hunt
    huntsByCity(city: String!): [Hunt]
    huntItems: [HuntItem]
    huntItem(huntItemId: ID!): HuntItem
    huntItemByQrCode(qrId: String!): HuntItem
    huntItemsByCity(city: String!): [HuntItem]
    badges: [Badge!]
    badge(badgeId: ID!): Badge
  }

  type Mutation {
    createBadge(
      name: String!
      icon: String!
      description: String!
      points: Int
    ): Badge!
    updateBadge(
      badgeId: ID!
      name: String
      icon: String
      description: String
      points: Int
    ): Badge!
    removeBadge(badgeId: ID!): Badge

    createHunt(
      name: String!
      city: String!
      description: String!
      points: Int
      huntItems: [ID]
      rewards: [ID]
    ): Hunt!
    updateHunt(
      huntId: ID!
      name: String
      city: String
      description: String
      points: Int
      huntItems: [ID]
      rewards: [ID]
    ): Hunt!
    removeHunt(huntId: ID!): Hunt

    createHuntItem(
      name: String!
      city: String!
      hint1: String!
      hint2: String!
      hint3: String!
      solutionLocation: String!
      solutionDescription: String!
      solutionImg: String
      points: Int!
      rewards: [ID]
    ): HuntItem!
    updateHuntItem(
      huntItemId: ID!
      name: String
      city: String
      hint1: String
      hint2: String
      hint2DisplayToUser: [ID]
      hint3: String
      hint3DisplayToUser: [ID]
      solutionLocation: String
      solutionDescription: String
      solutionImg: String
      solutionDisplayToUser: [ID]
      points: Int
      rewards: [ID]
    ): HuntItem!
    removeHuntItem(huntItemId: ID!): HuntItem

    removeHuntItemFromHunt(huntId: ID!, huntItemId: ID!): Hunt!
    userAsksForHint(huntItemId: ID!, hint2: Boolean, hint3: Boolean, solution: Boolean): HuntItem!

    createUser(
        username: String!
        email: String!
        password: String!
    ): Auth
    updateUser(
      password: String!
      username: String
      email: String
      newPassword: String
    ): Auth
    removeUser(
      username: String
      email: String
      password: String
    ): Auth
    login(
        email: String!
        password: String!
    ): Auth
    changePoints(pointsToChange: Int): Auth
    userFoundHuntItem(huntItemId: ID!): Auth
    userCompletedHunt(huntId: ID!): Auth
    userAddBadge(badgeId: ID!): Auth
  }
`;

module.exports = typeDefs;