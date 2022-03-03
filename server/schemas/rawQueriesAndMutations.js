/*
===================================================================================================================================
BADGES
--All work, 2/28
======
// WORKS!!!
query getAllBadges {
    badges {
        __typename
        _id
        name
        icon
        description
        points
    }
}
// WORKS!!!
query getOneBadge($badgeId: ID!) {
    badge(badgeId: $badgeId) {
        __typename
        _id
        name
        icon
        description
        points
    }
}
// WORKS, with and without $points
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
}
QUERY VARIABLES:
{
    "name": "The Name",
    "icon": "TheIcon",
    "description": "The description!",
    "points": 999
}
// WORKS!!! all but $badgeId are optional
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
}
QUERY VARIABLES:
{
    "badgeId": "idGoesHere",
    "name": "Updated name",
    "icon": "Updated icon",
    "description": "Updated description",
    "points": 10
}
// WORKS!!!
mutation deleteThisBadge($badgeId: ID!) {
    removeBadge(badgeId: $badgeId) {
        __typename
        _id
        name
        icon
        description
        points
    }
}
QUERY VARIABLES:
{
    "badgeId": "idGoesHere"
}

===================================================================================================================================
HUNTS
--All work, 2/28
=====
// WORKS!!!
query getAllScavengerHunts {
    hunts {
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
// WORKS!!!
query getOneScavengerHunt($huntId: ID!) {
    hunt(huntId: $huntId) {
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
// WORKS!!!
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
QUERY VARIABLES:
{
    "city": "Seattle"
}
// WORKS!!! with or without $points (defaults to 1)
mutation createNewScavengerHunt(
    $name: String!
    $city: String!
    $description: String!
    $points: Int
    $huntItems: [ID]
    $rewards: [ID]
) {
    createHunt(
        name: $name
        city: $city
        description: $description
        points: $points
        huntItems: $huntItems
        rewards: $rewards
    ) {
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
QUERY VARIABLES:
{
    "name": "This hunt title",
    "city": "Seattle",
    "description": "This hunt description",
    # `points` is optional
    "points": 1,
    "huntItems": ["621d60aa25dbfb31fc933171", "621d6946f63c6d139cea0c05"],
    "rewards": ["621db86a433b7e771cd86d50", "621daf2453db385b50f81bc5"]
}
// WORKS!!! all but $huntId are optional
mutation updateThisScavengerHunt(
  $huntId: ID!
  $name: String
  $city: String
  $description: String
  $points: Int
  $huntItems: [ID]
  $rewards: [ID]
) {
  updateHunt(
    huntId: $huntId
    name: $name
    city: $city
    description: $description
    points: $points
    huntItems: $huntItems
    rewards: $rewards
  ) {
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
QUERY VARIABLES:
{
    "huntId": "idGoesHere",
    # all other variables are optional
    "name": "Updated hunt title",
    "city": "Updated city",
    "description": "Updated hunt description",
    "points": 50,
    "huntId": "huntIdGoesHere",
    "rewards": ["oneBadgeIdHere", "anotherBadgeIdHere"]
}
// WORKS!!!
mutation deleteThisScavengerHunt(
    $huntId: ID!
) {
    removeHunt(
        huntId: $huntId
    ) {
        __typename
        _id
        name
        description
        points
    }
}
QUERY VARIABLES:
{
    "huntId": "idGoesHere"
}
===================================================================================================================================
HUNTITEM
--Works?
=======
// WORKS!!!
query getAllScavengerHuntItems {
    huntItems {
        __typename
        _id
        name
        qrId
        city
        category
        hint1
        hint2
        hint2DisplayTo {
            __typename
            _id
            username
        }
        hint3
        hint3DisplayTo {
            __typename
            _id
            username
        }
        solutionLocation
        solutionDescription
        solutionImg
        solutionDisplayTo {
            __typename
            _id
            username
        }
        points
        guestbook
    }
}
// WORKS!!!
query getOneScavengerHuntItem($huntItemId: ID!) {
    huntItem(huntItemId: $huntItemId) {
        __typename
        _id
        name
        qrId
        city
        category
        hint1
        hint2
        hint2DisplayTo {
            __typename
            _id
            username
        }
        hint3
        hint3DisplayTo {
            __typename
            _id
            username
        }
        solutionLocation
        solutionDescription
        solutionImg
        solutionDisplayTo {
            __typename
            _id
            username
        }
        points
        guestbook
    }
}
QUERY VARIABLES:
{
    "huntItemId": "idGoesHere"
}
// WORKS!!!
query getScavengerHuntItemByQrCode($qrId: String!) {
    huntItemByQrCode(qrId: $qrId) {
        __typename
        _id
        name
        qrId
        city
        category
        hint1
        hint2
        hint2DisplayTo {
            __typename
            _id
            username
        }
        hint3
        hint3DisplayTo {
            __typename
            _id
            username
        }
        solutionLocation
        solutionDescription
        solutionImg
        solutionDisplayTo {
            __typename
            _id
            username
        }
        points
        guestbook
    }
}
// WORKS!!!
query getAllScavengerHuntItemsInCity($city: String!) {
    huntItemsByCity(city: $city) {
        __typename
        _id
        name
        qrId
        city
        category
        hint1
        hint2
        hint2DisplayTo {
            __typename
            _id
            username
        }
        hint3
        hint3DisplayTo {
            __typename
            _id
            username
        }
        solutionLocation
        solutionDescription
        solutionImg
        solutionDisplayTo {
            __typename
            _id
            username
        }
        points
        guestbook
    }
}
QUERY VARIABLES:
{
    "city": "Seattle"
}

mutation createNewScavengerHuntItem(
    $name: String!
    $city: String!
    $category: String!
    $hint1: String!
    $hint2: String!
    $hint3: String!
    $solutionLocation: String!
    $solutionDescription: String!
    $solutionImg: String
    $points: Int!
    $rewards: [ID]
) {
    createHuntItem(
        name: $name
        city: $city
        category: $category
        hint1: $hint1
        hint2: $hint2
        hint3: $hint3
        solutionLocation: $solutionLocation
        solutionDescription: $solutionDescription
        solutionImg: $solutionImg
        points: $points
        rewards: $rewards
    ) {
        __typename
        _id
        name
        qrId
        city
        category
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
            icon
            description
            points
        }
        guestbook
    }
}
QUERY VARIABLES:
{
    "name": "Wayward Vegan Café",
    "city": "Seattle",
    "hint1": "Southern cooking for <strong>LOST</strong> vegans.",
    "hint2": "It's in the Ravenna neighborhood of Seattle.",
    "hint3": "...",
    "solutionLocation": "801 NE 65th St Suite C, Seattle, WA 98115",
    "solutionDescription": "...",
    "solutionImg": "http://www.waywardvegancafe.com/img/waywardlogofinal.png",
    "points": 2,
    "rewards": ["oneBadgeIdHere", "anotherBadgeIdHere"]
}
mutation updateThisScavengerHuntItem(
  $huntItemId: ID!
  $name: String
  $city: String
  $category: String
  $hint1: String
  $hint2: String
  $hint2DisplayToUser: [ID]
  $hint3: String
  $hint3DisplayToUser: [ID]
  $solutionLocation: String
  $solutionDescription: String
  $solutionImg: String
  $solutionDisplayToUser: [ID]
  $points: Int
  $rewards: [ID]
) {
  updateHuntItem(
    huntItemId: $huntItemId
    name: $name
    city: $city
    category: $category
    hint1: $hint1
    hint2: $hint2
    hint2DisplayToUser: $hint2DisplayToUser
    hint3: $hint3
    hint3DisplayToUser: $hint3DisplayToUser
    solutionLocation: $solutionLocation
    solutionDescription: $solutionDescription
    solutionImg: $solutionImg
    solutionDisplayToUser: $solutionDisplayToUser
    points: $points
    rewards: $rewards
  ) {
    __typename
    _id
    name
    qrId
    city
    category
    hint1
    hint2
    hint2DisplayedTo {
      __typename
      _id
      username
    }
    hint3
    hint3DisplayedTo {
      __typename
      _id
      username
    }
    solutionLocation
    solutionDescription
    solutionImg
    solutionDisplayedTo {
      __typename
      _id
      username
    }
    points
    rewards {
      __typename
      _id
      name
      points
    }
    guestbook
  }
}
QUERY VARIABLES:
{
  "huntItemId": "idGoesHere",
  "rewards": ["oneBadgeIdHere","anotherBadgeIdHere"]
}
HTTP HEADERS:
{
  "Authorization": "Bearer pasteTokenHere"
}

===================================================================================================================================
USERS
=====
query getAllUsers {
    users {
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
query getThisUser($userId: ID!) {
    user(userId: $userId) {
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
query getCurrentUser {
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
HTTP HEADERS:
{
    "Authorization": "Bearer pasteFullTokenHere"
}
mutation createNewUser(
    $username: String!
    $email: String!
    $password: String!
) {
    createUser(
        username: $username
        email: $email
        password: $password
    ) {
        __typename
        token
        user {
            __typename
            _id
            username
            email
            password
            points
            isAdmin
            createdAt
        }
    }
}
QUERY VARIABLES:
{
    "username": "myusernameissocool",
    "email": "myusernameissocool@email.com",
    "password": "garbagepassword123!"
}
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

QUERY VARIABLES:
{
    "password": "actualCurrentPassword",
    "username": "updatedUserName",
    "email": "newemail@email.com",
    "newPassword": "mynewpassword321"
}
HTTP HEADERS:
{
    "Authorization": "Bearer tokenGoesHere"
}
mutation userFoundHuntItem($huntItemId: ID!) {
  userFoundHuntItem(huntItemId: $huntItemId) {
    __typename
    token
    user {
      __typename
      _id
      username
      points
      foundHuntItems {
        __typename
        _id
        name
        points
      }
      badges {
        __typename
        _id
        name
        points
      }
    }
  }
}
QUERY VARIABLES
{
    "huntItemId" : "idGoesHere"
}
HTTP HEADERS:
{
    "Authorization": "Bearer tokenGoesHere"
}
mutation userAsksForHint($huntItemId: ID!, $hint2: Boolean, $hint3: Boolean, $solution: Boolean) {
  userAsksForHint(huntItemId: $huntItemId, hint2: $hint2, hint3: $hint3, solution: $solution) {
    __typename
    _id
    name
    qrId
    city
    hint1
    hint2
    hint2DisplayedTo {
      __typename
      _id
      username
    }
    hint3
    hint3DisplayedTo {
      __typename
      _id
      username
    }
    solutionLocation
    solutionDescription
    solutionImg
    solutionDisplayedTo {
      __typename
      _id
      username
    }
    points
  }
}
QUERY VARIABLES
{
  "huntItemId": "621d60aa25dbfb31fc933171",
  "hint2": true,
  "hint3": false,
  "solution": false
}
HTTP HEADERS
{
  "Authorization": "Bearer pasteTokenHere"
}
*/