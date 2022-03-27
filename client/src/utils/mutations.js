import { gql } from '@apollo/client';

//~~~~~~~~~~USER~~~~~~~~~~~

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!, $userType: String) {
    createUser(username: $username, email: $email, password: $password, userType: $userType) {
      token
      user {
        _id
        username
        userType
        email
        password
      }
    }
  }
`;

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
  mutation removeUser($password: String) {
    removeUser(password: $password) {
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


//~~~~~~~~~~HUNT~~~~~~~~~~~~~
export const CREATE_HUNT = gql`
mutation createHunt($name: String!, $description: String!, $points: Int!, $city: String!, $huntItems: [ID], $rewards: [ID], $image: String){
  createHunt(name: $name, description: $description, points: $points, city: $city, huntItems: $huntItems, rewards: $rewards, image: $image){
    _id
    name
    description
    image
    points
    city
    description
    huntItems{
      __typename
      _id
      name
      qrId
      qrCode
      city
      hint1
      hint2
      hint3
      solutionLocation
      solutionDescription
      solutionImg
      points
      hint2DisplayedTo{
        __typename
      	_id
        username
      }
      hint3DisplayedTo{
        __typename
        _id
        username
      }
      solutionDisplayedTo{
        __typename
        _id
        username
      }
			rewards{
        name
        icon
        description
        points
      }
    }
    rewards{
      name
      icon
      description
      points
    }
  }
}
`

// updateHunt( huntId: ID! newName: String newDescription: String newPoints: Int): Hunt! -- is this going to work?

export const UPDATE_HUNT = gql`
mutation updateHunt($huntId: ID!, $name: String, $city: String $description: String, $points: Int, $huntItems: [ID], $rewards: [ID], $image: String){
  updateHunt(huntId: $huntId, name: $name, city: $city, description: $description, points: $points, huntItems: $huntItems, rewards: $rewards, image: $image){
    _id
    name
    description
    image
    points
    city
    description
    huntItems{
      __typename
      _id
      name
      qrId
      qrCode
      city
      hint1
      hint2
      hint3
      solutionLocation
      solutionDescription
      solutionImg
      points
      hint2DisplayedTo{
        __typename
        _id
        username
      }
      hint3DisplayedTo{
        __typename
        _id
        username
      }
      solutionDisplayedTo{
        __typename
        _id
        username
      }
      rewards{
        name
        icon
        description
        points
      }
    }
    rewards{
      name
      icon
      description
      points
    }
  }
}
`

export const REMOVE_HUNT = gql`
mutation removeHunt($huntId: ID!){
  removeHunt(huntId: $huntId){
    _id
    name
  }
}
`

//~~~~~~~~~~~~~~~HUNT ITEM~~~~~~~~~~~~~~~

export const CREATE_HUNT_ITEM = gql`
mutation createHuntItem($name: String!,
    $hint1: String!,
    $hint2: String!,
    $hint3: String!,
    $solutionLocation: String!,
    $solutionDescription: String!,
    $solutionImg: String,
    $points: Int!,
    $city: String!,
    $category :String!,
    $qrId: String,
    $hint2DisplayedTo: [ID],
    $hint3DisplayedTo: [ID],
    $rewards: [ID]){
      createHuntItem(name: $name, hint1: $hint1, hint2: $hint2, hint3: $hint3, solutionLocation: $solutionLocation, solutionDescription: $solutionDescription, solutionImg: $solutionImg, points: $points, city: $city, category: $category, qrId: $qrId, hint2DisplayedTo: $hint2DisplayedTo, hint3DisplayedTo: $hint3DisplayedTo, rewards: $rewards){
          _id
          name
          qrId
          qrCode
          hint1
          hint2
          hint3
          solutionLocation
          solutionDescription
          solutionImg
          points
          city
          hint2DisplayedTo{
            __typename
            _id
            username
          }
          hint3DisplayedTo{
            __typename
            _id
            username
          }
          solutionDisplayedTo{
            __typename
            _id
            username
          }
          rewards{
            name
            icon
            description
            points
          }
      }
    }
`

export const UPDATE_HUNT_ITEM = gql`
mutation updateHuntItem($huntItemId: ID!, $name: String, $hint1: String, $hint2: String, $hint3: String, $solutionLocation: String, $solutionDescription: String, $solutionImg: String, $points: Int, $city:String, $qrId: String, $hint2DisplayedTo: [ID], $hint3DisplayedTo: [ID], $rewards: [ID]){
  updateHuntItem(huntItemId: $huntItemId, name: $name, hint1: $hint1, hint2: $hint2, hint3: $hint3, solutionLocation: $solutionLocation, solutionDescription: $solutionDescription, solutionImg: $solutionImg, points: $points, city: $city, qrId: $qrId, hint2DisplayedTo: $hint2DisplayedTo, hint3DisplayedTo: $hint3DisplayedTo, rewards: $rewards){
      _id
      name
      qrId
      qrCode
      hint1
      hint2
      hint3
      solutionLocation
      solutionDescription
      solutionImg
      points
      city
      hint2DisplayedTo{
        __typename
        _id
        username
      }
      hint3DisplayedTo{
        __typename
        _id
        username
      }
      solutionDisplayedTo{
        __typename
        _id
        username
      }
      rewards{
        name
        icon
        description
        points
      }
  }
}

`

// removeHuntItem(huntItemId: ID!): HuntItem 

export const REMOVE_HUNT_ITEM = gql`
mutation removeHuntItem($huntItemId: ID!){
    removeHuntItem(huntItemId: $huntItemId){
        _id
        name
    }
}
`

export const REMOVE_HUNT_ITEM_FROM_HUNT = gql`
    mutation removeHuntItemFromHunt($huntId: ID!, $huntItemId: ID!){
      removeHuntItemFromHunt(huntId: $huntId, huntItemId: $huntItemId){
        hunt{
          _id
          name
          huntItems{
            _id
            name
          }
        }
      }
    }

`

export const USER_ASKS_FOR_HINT = gql`
    mutation userAsksForHint($huntItemId: ID!, $hint2: Boolean, $hint3: Boolean, $solution: Boolean){
      userAsksForHint(huntItemId: $huntItemId, hint2: $hint2, hint3: $hint3, solution: $solution){
        _id
        hint2
        hint3
        points
        hint2DisplayedTo{
          _id
        }
        hint3DisplayedTo{
          _id
        }
        solutionDisplayedTo{
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
        foundHuntItems{
          _id
        }
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
        completedHunts{
          _id
          name
          image
          points
        }
      }
    }
  }

`

// userAddBadge(badgeId: ID!): Auth
export const USER_ADD_BADGE = gql`
mutation userAwardedBadge($badgeId: ID!) {
    userAddBadge(badgeId: $badgeId) {
        token
        user {
            __typename
            _id
            username
            points
            badges {
                __typename
                _id
                name
                icon
                description
                points
            }
        }
    }
}
`;


//need auth to test
export const CREATE_BADGE = gql`
mutation createNewBadge(
    $name: String!
    $icon: String!
    $description: String!
    $points: Int
    ) {
    createBadge(
        name: $name
        icon: $icon
        description: $description
        points: $points
    ) {
        __typename
        _id
        name
        icon
        description
        points
    }
}`

export const UPDATE_BADGE = gql`
mutation updateThisBadge(
    $badgeId: ID!
    $name: String
    $icon: String
    $description: String
    $points: Int
) {
    updateBadge(
        badgeId: $badgeId
        name: $name
        icon: $icon
        description: $description
        points: $points
    ) {
        __typename
        _id
        name
        icon
        description
        points
    }
}`

export const REMOVE_BADGE = gql`
mutation deleteThisBadge($badgeId: ID!) {
    removeBadge(badgeId: $badgeId) {
        __typename
        _id
        name
        icon
        description
        points
    }
}`

export const SIGN_GUEST_BOOK = gql`
mutation userSignsHuntItemGuestbook($huntItemId: ID!, $message: String!) {
  userSignsHuntItemGuestbook(huntItemId: $huntItemId, message: $message) {
      __typename
      _id
      guestbook
  }
}
`