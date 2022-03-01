const { gql } = require("apollo-server-express");

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
  }

  type HuntItem {
    _id: ID
    name: String!
    city: String!
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
    ): Hunt!
    updateHunt(
      huntId: ID!
      name: String
      city: String
      description: String
      points: Int
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
    ): HuntItem!
    updateHuntItem(
      huntItemId: ID!
      name: String
      city: String
      hint1: String
      hint2: String
      hint3: String
      solutionLocation: String
      solutionDescription: String
      solutionImg: String
      points: Int
    ): HuntItem!
    removeHuntItem(huntItemId: ID!): HuntItem
    addHuntItemToHunt(huntId: ID!, huntItemId: ID!): Hunt!
    removeHuntItemFromHunt(huntId: ID!, huntItemId: ID!): Hunt!

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
    removeUser: Auth
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