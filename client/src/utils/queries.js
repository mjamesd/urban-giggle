import { gql } from '@apollo/client';

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
  }
}
`

export const GET_USERS = gql`
query user{
  
}
`

export const GET_HUNT_ITEM = gql`
query huntitem($_id: ID!) {
  huntitem(_id: $_id) {
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

export const GET_BADGE = gql`
query badge {
  badges 

}

`

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;



export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

