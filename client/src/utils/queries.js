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
        __typename
        _id
        username
        email
        password
        userType
        points
        foundHuntItems {
            __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        foundHuntItemsCount
        completedHunts {
            __typename
            _id
            name
            city
            description
            points
            huntItems {
                __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        completedHuntsCount
        badges {
            __typename
            _id
            name
            icon
            description
            points
        }
        favoriteHunts {
            __typename
            _id
            name
        }
        favoriteHuntItems {
            __typename
            _id
            name
        }
        createdAt
    }
}
`
//tested in playground, works
export const GET_USERS = gql`
query users{
    users {
        __typename
        _id
        username
        email
        password
        userType
        points
        foundHuntItems {
            __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        foundHuntItemsCount
        completedHunts {
            __typename
            _id
            name
            city
            description
            points
            huntItems {
                __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        completedHuntsCount
        badges {
            __typename
            _id
            name
            icon
            description
            points
        }
        favoriteHunts {
            __typename
            _id
            name
        }
        favoriteHuntItems {
            __typename
            _id
            name
        }
        createdAt
    }
}
`
//tested in playground, works
export const QUERY_ME = gql`
  query me {
    me {
        __typename
        _id
        username
        email
        password
        userType
        points
        foundHuntItems {
            __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        foundHuntItemsCount
        completedHunts {
            __typename
            _id
            name
            city
            description
            points
            huntItems {
                __typename
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
            rewards {
                __typename
                _id
                name
                description
                points
            }
        }
        completedHuntsCount
        badges {
            __typename
            _id
            name
            icon
            description
            points
        }
        favoriteHunts {
            __typename
            _id
            name
        }
        favoriteHuntItems {
            __typename
            _id
            name
        }
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
    qrCode
    city
    category
    hint1
    hint2
    hint2DisplayedTo{
      __typename
      _id
      username
    }
    hint3
    hint3DisplayedTo{
      __typename
      _id
      username
    }
    solutionLocation
    solutionDescription
    solutionDisplayedTo{
      __typename
      _id
      username
    }
    solutionImg
    points
    guestbook
    rewards {
        __typename
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
export const GET_HUNT_ITEMS = gql`
query huntItem{
  huntItems{
    _id
    name
    qrId
    qrCode
    city
    category
    hint1
    hint2
    hint2DisplayedTo{
      __typename
      _id
      username
    }
    hint3
    hint3DisplayedTo{
      __typename
      _id
      username
    }
    solutionLocation
    solutionDescription
    solutionDisplayedTo{
      __typename
      _id
      username
    }
    solutionImg
    rewards {
        __typename
        _id
        name
        icon
        description
        points
    }
    points
    guestbook
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
        qrCode
    	hint1
    	hint2
    	hint3
      category
    	solutionLocation
    	solutionDescription
    	solutionImg
    	points
        guestbook
    }
    rewards{
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
export const GET_HUNTS = gql`
query hunt{
  hunts{
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
        qrCode
    	hint1
    	hint2
    	hint3
    	solutionLocation
    	solutionDescription
    	solutionImg
    	points
        guestbook
    }
    rewards{
      _id
      name
      icon
      description
      points
    }
  }
}
`

export const GET_HUNTS_BY_CITY = gql`
query getAllScavengerHuntsInCity($city: String!) {
  huntsByCity(city: $city) {
      __typename
      _id
      name
      city
      description
      points
      huntItems {
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
      }
      rewards {
          __typename
          _id
          name
          icon
          description
          points
      }
  }
}
`

export const GET_HUNT_ITEM_BY_QR_ID = gql`
query huntItemByQrCode($qrId: String!) {
  huntItemByQrCode(qrId: $qrId) {
    _id
    name
    qrId 
    qrCode
    points
    solutionDescription
    rewards{
      _id
      name
      icon
      description
      points
    }
  guestbook
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
