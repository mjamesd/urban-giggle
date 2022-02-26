import { gql } from '@apollo/client';

// createBadge(name: String! icon: String! description: String! points: Int!): Badge!
// updateBadge(badgeId: ID! newName: String newIcon: String newDescription: String newPoints: Int ): Badge!
// removeBadge(badgeId: ID!): Badge

// createHunt(name: String!, description: String!, points: Int!): Hunt! -- done JM
// updateHunt( huntId: ID! newName: String newDescription: String newPoints: Int): Hunt! -- done JM
// removeHunt(huntId: ID!): Hunt

// createHuntItem(name: String! hint1: String! hint2: String! hint3: String! solutionLocation: String! solutionDescription: String! solutionImg: String points: Int!): HuntItem!
// updateHuntItem(huntItemId: ID! newName: String newHint1: String newHint2: String newHint3: String newSolutionLocation: String newSolutionDescription: String newSolutionImg: String newPoints: Int): HuntItem!
// removeHuntItem(huntItemId: ID!): HuntItem

// createUser(username: String!, email: String!, password: String!): Auth  -- done JM
// updateUser(username: String! newUsername: String email: String! newEmail: String password: String! newPassword: String!): Auth - done
// removeUser: User
// login(email: String!, password: String!): Auth --done JM


// changePoints(pointsToChange: Int): Auth
// userFoundHuntItem(huntItemId: ID!): Auth
// userCompletedHunt(huntId: ID!): Auth
// userAddBadge(badgeId: ID!): Auth

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $newUsername: String, $email: String!, $newEmail: String, $password: String!, $newPassword: String!) {
    updateUser(username: $username, newUsername: $newUsername, email: $email, newEmail: $newEmail, password: $password, newPassword: $newPassword) {
      _id
      username
      newUsername
      email
      newEmail
      password
      newPassword
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      _id
      username
      email
      password
    }
  }
`;

// createHunt(name: String!, description: String!, points: Int!): Hunt!

export const CREATE_HUNT = gql`
  mutation createHunt($name: String!, $description: String!, $points: Int!){
    createHunt(name: $name, description: $description, points: $points){
     hunt{ 
      _id
      name
      description
      points
     }
    }
  }

`

// updateHunt( huntId: ID! newName: String newDescription: String newPoints: Int): Hunt! -- is this going to work?

export const UPDATE_HUNT = gql`
  mutation updateHunt($_id: ID!, $newName: String, $newDescription: String, $newPoints: Int){
    updateHunt(_id: $_id, newName: $newName, newDescription: $newDescription, newPoints: $newPoints){
      hunt{
        _id
        newName
        newDescription
        newPoints
      }
    }
  }
`

// removeHunt(huntId: ID!): Hunt

export const REMOVE_HUNT = gql`
    mutation removeHunt($_id: ID!){
      removeHunt(_id: $_id){
        hunt{
          _id
        }
      }
    }

`