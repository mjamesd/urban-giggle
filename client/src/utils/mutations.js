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


// changePoints(pointsToChange: Int): Auth  -- done JM
// userFoundHuntItem(huntItemId: ID!): Auth -- done JM
// userCompletedHunt(huntId: ID!): Auth -- done JM
// userAddBadge(badgeId: ID!): Auth -- done JM
// addHuntItemToHunt(huntId: ID!, huntItemId: ID!): Hunt!

//tested, works
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

//tested, works
export const UPDATE_USER = gql`

mutation updateThisUser(
  $password: String!
  $username: String
  $email: String
  $newPassword: String
) {
  updateUser(
    username: $username
    email: $email
    password: $password
    newPassword: $newPassword
  ) {
    __typename
    token
    user {
      __typename
      _id
      username
      email
      password
    }
  }
}
`;



//works
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

//couldnt test bc of auth
export const REMOVE_USER = gql`
  mutation removeUser($username: String, $email: String, $password: String) {
    removeUser(username: $username) {
      token
      user{
      _id
      username
      email
      password
      }
    }
  }
`;

// createHunt(name: String!, description: String!, points: Int!): Hunt!
//tested in playground, works
export const CREATE_HUNT = gql`
mutation createHunt($name: String!, $description: String!, $points: Int!, $city: String!, $huntItems: [ID], $rewards: [ID]){
  createHunt(name: $name, description: $description, points: $points, city: $city, huntItems: $huntItems, rewards: $rewards){
    _id
    name
    description
    points
    city
    description
    huntItems
    rewards
}
  }

`

// updateHunt( huntId: ID! newName: String newDescription: String newPoints: Int): Hunt! -- is this going to work?

export const UPDATE_HUNT = gql`
  mutation updateHunt($huntId: ID!, $newName: String, $newDescription: String, $newPoints: Int){
    updateHunt(huntId: $huntId, newName: $newName, newDescription: $newDescription, newPoints: $newPoints){
        _id
        newName
        newDescription
        newPoints

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
//tested in playground, works
export const CREATE_HUNT_ITEM = gql`
mutation createHuntItem($name: String!, 
  $hint1: String!, 
  $hint2: String!, 
  $hint3: String!, 
  $solutionLocation: String!, 
  $solutionDescription: String!, 
  $solutionImg: String, 
  $points: Int!,
	$city:String!){
      createHuntItem(name: $name, 
        hint1: $hint1, 
        hint2: $hint2, 
        hint3: $hint3, 
        solutionLocation: $solutionLocation, 
        solutionDescription: $solutionDescription, 
        solutionImg: $solutionImg, 
        points: $points
      	city:$city){
          name
          hint1
          hint2
          hint3
          solutionLocation
          solutionDescription
          solutionImg
          points
          city
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
          newCity
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

export const CHANGE_POINTS = gql`
  mutation changePoints($pointsToChange: Int){
    changePoints(pointsToChange: $pointsToChange){
      token
      user{
        points
      }
    }
  }
`

// userFoundHuntItem(huntItemId: ID!): Auth

export const USER_FOUND_HUNT_ITEM = gql`
  mutation userFoundHuntItem($huntItemId: ID!){
    userFoundHuntItem(huntItemId: $huntItemId){
      token
      user{
        foundItems
      }
    }
  }
`

// userCompletedHunt(huntId: ID!): Auth

export const USER_COMPLETED_HUNT = gql`
  mutation userCompletedHunt($huntId: ID!){
    userCompletedHunt(huntId: $huntId){
      token
      user{
        completedHunts
      }
    }
  }

`

// userAddBadge(badgeId: ID!): Auth
//need auth to test
export const CREATE_BADGE = gql`
  mutation createBadge($badgeId: ID!){
    createBadge(badgeId: $badgeId){
      token
      user{
        badges
      }
    }
  }
`

// addHuntItemToHunt(huntId: ID!, huntItemId: ID!): Hunt!

export const ADD_HUNT_ITEM_TO_HUNT = gql`
  mutation addHuntItemToHunt($huntId: ID!, $huntItemId: ID!){
    addHuntItemToHunt(huntId: $huntId, huntItemId: $huntItemId){
      hunt{
        huntItems
      }
    }
  }
`