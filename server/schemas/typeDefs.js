const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
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