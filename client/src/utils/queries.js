import { gql } from '@apollo/client';


// type Query {
//   users: [User!] -- done
//   user(userId: ID!): User -- done
//   me: User -- done
//   hunts: [Hunt!] -- done
//   hunt(huntId: ID!): Hunt -- done
//   huntItems: [HuntItem] -- done
//   huntItem(huntItemId: ID!): HuntItem -- done
//   badges: [Badge!] -- done
//   badge(badgeId: ID!): Badge -- done
// }

export const GET_USER = gql`
query user($_id: ID!) {
  user(_id: $_id) {
    _id
    username
    email
    password
    points
    foundItems
    completedHunts
    badges
    createdAt
    isAdmin
  }
}
`

export const GET_USERS = gql`
query users{
  users{
    _id
    username
    email
    password
    points
    foundItems
    completedHunts
    badges
    createdAt
    isAdmin
  }
  
}
`

export const QUERY_ME = gql`
  query me {
    me {
      __typename
      _id
      username
      email
      password
      points
      foundItems {
        __typename
        _id
        name
      }
      completedHunts {
        __typename
        _id
        name
      }
      badges {
        __typename
        _id
        name
        icon
        description
        points
      }
      isAdmin
      createdAt
  }
  }
`
export const GET_HUNT_ITEM = gql`
query huntItem($_id: ID!) {
  huntItem(_id: $_id) {
    _id
    name
    qrId
    hint1
    hint2
    hint3
    solutionLocation
    solutionDescription
    solutionImg
    points
  }
}
`

export const GET_HUNT_ITEMS = gql`
query huntItem{
  huntItems{
    _id
    name
    qrId
    hint1
    hint2
    hint3
    solutionLocation
    solutionDescription
    solutionImg
    points
  }
}

`


export const GET_HUNT = gql`
query hunt($_id: ID!) {
  hunt(_id: $_id) {
    _id
    name
    description
    points
    huntItems
  }
}
`

export const GET_HUNTS = gql`
query hunt{
  hunts{
    _id
    name
    description
    points
    huntItems
  }
}

`


export const GET_BADGES = gql`
query badge {
  badges {
    _id
    name
    icon
    description
    points
  }

}
`

export const GET_BADGE = gql`

query badge($_id: ID!){
  badge(_id: $_id){
    _id
    name
    icon
    description
    points
  }
}
`


