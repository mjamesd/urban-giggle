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

//tested in playground, works
export const GET_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email
    password
    points
    createdAt
    isAdmin
    foundItems {
    	  _id
    		name
   			city
    		qrId
    		hint1
    		hint2
    		hint3
    		solutionLocation
   			solutionDescription
    		solutionImg
    		points
    }
    completedHunts{
      _id
    	name
      city
    	description
    	points
    	huntItems{
         _id
    		name
   			city
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
    badges{
      _id
    	name
   		icon
    	description
    	points
    }
  }
}
`
//tested in playground, works
export const GET_USERS = gql`
query users{
  users{
    _id
    username
    email
    password
    points
    createdAt
    isAdmin
    foundItems {
    	  _id
    		name
   			city
    		qrId
    		hint1
    		hint2
    		hint3
    		solutionLocation
   			solutionDescription
    		solutionImg
    		points
    }
    completedHunts{
      _id
    	name
      city
    	description
    	points
    	huntItems{
         _id
    		name
   			city
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
    badges{
      _id
    	name
   		icon
    	description
    	points
    }
  }
  
}
`
//need to be able to log in to test this one
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

//tested in playground, works
export const GET_HUNT_ITEM = gql`
query huntItem($huntItemId: ID!) {
  huntItem(huntItemId: $huntItemId) {
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
    city
  }
}
`
//tested in playground, works
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
    city
  }
}

`

//tested in playground, works
export const GET_HUNT = gql`
query hunt($huntId: ID!) {
  hunt(huntId: $huntId) {
    _id
    name
    city
    description
    points
    huntItems{
      _id
    	name
    	city
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
}
`
//tested in playground, works
export const GET_HUNTS = gql`
query hunt{
  hunts{
    _id
    name
    description
    points
   huntItems{
      _id
    	name
    	city
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

query badge($badgeId: ID!){
  badge(badgeId: $badgeId){
    _id
    name
    icon
    description
    points
  }
}
`


