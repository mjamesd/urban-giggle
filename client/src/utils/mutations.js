import { gql } from '@apollo/client';


// createBadge(name: String! icon: String! description: String! points: Int!): Badge!
// updateBadge(badgeId: ID! newName: String newIcon: String newDescription: String newPoints: Int ): Badge!
// removeBadge(badgeId: ID!): Badge

// createHunt(name: String!, description: String!, points: Int!): Hunt! -- done JM
// updateHunt( huntId: ID! newName: String newDescription: String newPoints: Int): Hunt! -- done JM
// removeHunt(huntId: ID!): Hunt -- done JM

// createHuntItem(name: String! hint1: String! hint2: String! hint3: String! solutionLocation: String! solutionDescription: String! solutionImg: String points: Int!): HuntItem! -- done JM
// updateHuntItem(huntItemId: ID! newName: String newHint1: String newHint2: String newHint3: String newSolutionLocation: String newSolutionDescription: String newSolutionImg: String newPoints: Int): HuntItem! -- done JM
// removeHuntItem(huntItemId: ID!): HuntItem  -- done JM

// createUser(username: String!, email: String!, password: String!): Auth  -- done JM
// updateUser(username: String! newUsername: String email: String! newEmail: String password: String! newPassword: String!): Auth - done
// removeUser: User --done JM
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
  mutation updateUser($username: String, $newUsername: String, $email: String, $newEmail: String, $password: String!, $newPassword: String!) {
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
  mutation updateHunt($huntId: ID!, $newName: String, $newDescription: String, $newPoints: Int){
    updateHunt(huntId: $huntId, newName: $newName, newDescription: $newDescription, newPoints: $newPoints){
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

// createHuntItem(name: String! hint1: String! hint2: String! hint3: String! solutionLocation: String! solutionDescription: String! solutionImg: String points: Int!): HuntItem!

export const CREATE_HUNT_ITEM = gql`
    mutation createHuntItem($name: String!, $hint1: String!, $hint2: String, $hint3: String!, $solutionLocation: String!, $solutionDescription: String!, $solutionImg: String, $points: Int!){
      createHuntItem(name: $name, hint1: $hint1, hint2: $hint2, hint3: $hint3, solutionLocation: $solutionLocation, solutionDescription: $solutionDescription, solutionImg: $solutionImg, points: $points){
        huntItem{
          name
          hint1
          hint2
          hint3
          solutionLocation
          solutionDescription
          solutionImg
          points
        }
      }
    }

`

// updateHuntItem(huntItemId: ID! newName: String newHint1: String newHint2: String newHint3: String newSolutionLocation: String newSolutionDescription: String newSolutionImg: String newPoints: Int): HuntItem!

export const UPDATE_HUNT_ITEM = gql`
    mutation updateHuntItem($_id: ID!, $newName: String, $newHint1: String, $newHint2: String, $newHint3: String, $newSolutionLocation: String, $newSolutionDescription: String, $newSolutionImg: String, $newPoints: Int){
      updateHuntItem(_id: $_id, newName: $newName, newHint1: $newHint1, newHint2: $newHint2, newHint3: $newHint3, newSolutionLocation: $newSolutionLocation, newSolutionDescription: $newSolutionDescription, newSolutionImg: $newSolutionImg, newPoints: $newPoints){
        huntItem{
          _id
          newName
          newHint1
          newHint2
          newHint3
          newSolutionLocation
          newSolutionDescription
          newSolutionImg
          newPoints
        }
      }
    }

`

// removeHuntItem(huntItemId: ID!): HuntItem 

export const REMOVE_HUNT_ITEM = gql`
    mutation removeHuntItem($_id: ID!){
      removeHuntItem(_id: $_id){
        huntItem{
          _id
        }
      }
    }

`

// changePoints(pointsToChange: Int): Auth

// export const CHANGE_POINTS = gql`
//   mutation changePoints($pointsToChange: Int){
//     changePoints(pointsToChange: $pointsToChange){

//     }
//   }
// `

// userFoundHuntItem(huntItemId: ID!): Auth

// export const USER_FOUND_HUNT_ITEM = gql`
//   mutation userFoundHuntItem($huntItemId: ID!){
//     userFoundHuntItem(huntItemId: $huntItemId){

//     }
//   }
// `