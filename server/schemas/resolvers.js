const { AuthenticationError } = require("apollo-server-express");
const { Badge, Hunt, HuntItem, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // BADGE
        /*
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
        */
        badges: async () => {
            return Badge.find();
        },
        /*
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
        */
        badge: async (parent, { badgeId }) => {
            return Badge.findById(badgeId);
        },

        // HUNT
        /*
        query getAllScavengerHunts {
            hunts {
                __typename
                _id
                name
                description
                points
            }
        }
        */
        hunts: async () => {
            return Hunt.find();
        },
        /*
        query getOneScavengerHunt($huntId: ID!) {
            hunt(huntId: $huntId) {
                __typename
                _id
                name
                description
            }
        }
        */
        hunt: async (parent, { huntId }) => {
            return Hunt.findById(huntId);
        },

        // HUNTITEM
        /*
        query getAllScavengerHuntItems {
            huntItems {
                __typename
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
        */
        huntItems: async () => {
            return HuntItem.find();
        },
        /*
        query getOneScavengerHuntItem($huntItemId: ID!) {
            huntItem(huntItemId: $huntItemId) {
                __typename
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
        */
        huntItem: async (parent, { huntItemId }) => {
            return HuntItem.findById(huntItemId);
        },

        // USER
        /*
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
        */
        users: async () => {
            return User.find();
        },
        /*
        query getOneUser($userId: ID!) {
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
        */
        user: async (parent, { userId }) => {
            return User.findById(userId);
        },
        /*
        query getMyUser {
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZGlzaW50ZWdyYXRvckBlbWFpbC5jb20iLCJfaWQiOiI2MjFhOWZmNjM0OGUyMDAyYThiNzVjZWMifSwiaWF0IjoxNjQ1OTEyMDU0LCJleHAiOjE2NDU5MTkyNTR9.Hzpr-EHoqYu0Ewh9T0gNarf8SnK9-QtzQ4aEINmWmAY"
        }
        */
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id);
            }
            throw new AuthenticationError("You need to be logged in! (me)");
        },
    },

    Mutation: {
        // BADGE
        /*
        mutation createNewBadge(
            $name: String!
            $icon: String!
            $description: String!
            $points: Int!
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
    
        */
        createBadge: async (parent, { name, icon, description, points }) => {
            return await Badge.create({
                name,
                icon,
                description,
                points,
            });
        },
        /*
        mutation updateThisBadge(
            $badgeId: ID!
            $newName: String
            $newDescription: String
            $newPoints: Int
        ) {
            updateBadge(
                badgeId: $badgeId
                newName: $newName
                newDescription: $newDescription
                newPoints: $newPoints
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
            "badgeId": "idGoesHere"
            # all other variables are optional
            "name": "Updated name"
            "icon": "Updated icon"
            "description": "Updated description"
            "points": 888
        }
        */
        updateBadge: async (parent, args) => {
            const badge = await Badge.findById(args.badgeId);
            if (!args.newName) args.newName = badge.name;
            if (!args.newIcon) args.newIcon = badge.icon;
            if (!args.newDescription) args.newDescription = badge.description;
            if (!args.newPoints) args.newPoints = badge.points;

            return await Badge.findByIdAndUpdate(
                args.badgeId,
                {
                    name: args.newName,
                    icon: args.newIcon,
                    description: args.newDescription,
                    points: args.newPoints,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        /*
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
        */
        removeBadge: async (parent, { badgeId }) => {
            return await Badge.findByIdAndDelete(badgeId);
        },

        // HUNT
        /*
        mutation createNewScavengerHunt(
            $name: String!
            $description: String!
            $points: Int!
        ) {
            createHunt(
                name: $name
                description: $description
                points: $points
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
            "name": "This hunt title",
            "description": "This hunt description",
            "points": 1 # `points` is optional
        }
        */
        createHunt: async (parent, args) => {
            if (!args.points) args.points = 0;
            return await Hunt.create({
                name: args.name,
                description: args.description,
                points: args.points,
            });
        },
        /*
        mutation updateThisScavengerHunt(
            $huntId: ID!
            $name: String
            $description: String
            $points: Int
        ) {
            updateHunt(
                huntId: $huntId
                name: $name
                description: $description
                points: $points
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
            "huntId": "idGoesHere",
            "name": "Updated hunt title",
            "description": "UPdated hunt description",
            "points": 50 # `points` is optional
        }
        */
        updateHunt: async (parent, { huntId, ...args }) => {
            const hunt = await Hunt.findById(huntId);
            if (!args.newName) args.newName = hunt.name;
            if (!args.newDescription) args.newDescription = hunt.description;
            if (!args.newPoints) args.newPoints = hunt.points;
            return await Hunt.findByIdAndUpdate(
                huntId,
                {
                    name: newName,
                    description: newDescription,
                    points: newPoints,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeHunt: async (parent, { huntId }) => {
            return await Hunt.findByIdAndDelete(huntId);
        },

        // HUNTITEM
        createHuntItem: async (parent, { name, icon, description, points }) => {
            const badge = await Badge.create({
                name,
                icon,
                description,
                points,
            });
            return badge;
        },
        updateHuntItem: async (parent, { huntItemId, ...args }) => {
            const huntItem = await HuntItem.findById(huntItemId);
            if (!args.newName) args.newName = hunt.name;
            if (!args.newDescription) args.newDescription = hunt.description;
            if (!args.newPoints) args.newPoints = hunt.points;
            return await Hunt.findByIdAndUpdate(
                huntId,
                {
                    name: newName,
                    description: newDescription,
                    points: newPoints,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeHuntItem: async (parent, { huntItemId }) => {
            return await HuntItem.findByIdAndDelete(huntItemId);
        },
        addHuntItemToHunt: async (parent, { huntId, huntItemId }) => {
            return await Hunt.findByIdAndUpdate(
                huntId,
                {
                    $addToSet: { huntItems: huntItemId },
                },
                {
                    new: true,
                }
            );
        },

        // USER
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        /*
        mutation updateThisUser(
            $username: String
            $email: String
            $password: String!
            $newPassword: String
        ) {
            updateUser(
                username: $username
                password: 
            ) {
                __typename
                token
                user {
                    __typename
                    _id
                    username
                }
            }
        }
    
        QUERY VARIABLES:
        {
            
        }
        HTTP HEADERS:
        {
            "Authorization": "Bearer tokenGoesHere"
        }
        */
        updateUser: async (
            parent,
            { username, email, password, newPassword },
            context
        ) => {
            if (!context.user)
                throw new AuthenticationError(
                    "You need to be logged in! (updateUser: loggedIn check)"
                );
            const user = await User.findById(context.user._id);
            const correctPwd = await user.isCorrectPassword(password);
            if (!correctPwd)
                throw new AuthenticationError(
                    "You supplied the wrong password. Please try again. (updateUser: pwd check)"
                );
            if (!username) username = context.user.username;
            if (!email) email = context.user.email;
            if (!newPassword) newPassword = password;
            // const updatedUser =
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    username: username,
                    email: email,
                    password: newPassword,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            // const token = signToken(updatedUser);
            // return { token, updatedUser };
        },
        // Logged in user can only remove their profile, no one else's
        removeUser: async (parent, { password }, context) => {
            if (!context.user)
                throw new AuthenticationError(
                    "You need to be logged in! (removeUser: loggedIn check)"
                );
            const user = await User.findById(context.user._id);
            const correctPwd = await user.isCorrectPassword(password);
            if (!correctPwd)
                throw new AuthenticationError(
                    "You supplied the wrong password. Please try again. (removeUser: pwd check)"
                );
            return await User.findByIdAndDelete(context.user._id);
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user with this email found!");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },
        // add points to user, `pointsToChange` can be positive or negative
        changePoints: async (parent, { pointsToChange }, context) => {
            if (!context.user)
                throw new AuthenticationError("You need to be logged in!");
            return await User.findByIdAndUpdate(
                context.user._id,
                {
                    $inc: {
                        points: pointsToChange, // what happens if it goes below zero?
                    },
                },
                {
                    new: true,
                    runValidators: true, // StackOverflow says this doesn't work with `findOneAndUpdate`... let's see.
                }
            );
        },
        userFoundHuntItem: async (parent, { huntItemId }, context) => {
            if (!context.user)
                throw new AuthenticationError("You need to be logged in!");
            const user = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $addToSet: { foundHuntItems: huntItemId },
                },
                {
                    new: true,
                }
            );
            const token = signToken(user);
            return { token, user };
        },
        userCompletedHunt: async (parent, { huntId }, context) => {
            if (!context.user)
                throw new AuthenticationError("You need to be logged in!");
            const user = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $addToSet: { completedHunts: huntId },
                },
                {
                    new: true,
                }
            );
            const token = signToken(user);
            return { token, user };
        },
        userAddBadge: async (parent, { badgeId }, context) => {
            if (!context.user)
                throw new AuthenticationError("You need to be logged in!");
            const user = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $addToSet: { badges: badgeId },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            const token = signToken(user);
            return { token, user };
        },
    },
};

module.exports = resolvers;
