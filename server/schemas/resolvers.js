const { AuthenticationError } = require('apollo-server-express');
const { Badge, Hunt, HuntItem, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        // Set up mutation so a logged in user can only remove their profile and no one else's
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        // add points to user, `points` can be positive or negative
        changePoints: async (parent, { pointsToChange }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $inc: {
                        points: pointsToChange // what happens if it goes below zero?
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        userFoundHuntItem: async (parent, { huntItem }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { foundHuntItems: huntItem }
                }
            );
        },
        userCompletedHunt: async (parent, { hunt }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { completedHunts: hunt }
                }
            );
        },
        userAddBadge: async (parent, { badge }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { badges: badge },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        // Make it so a logged in user can only remove a skill from their own profile
        // removeSkill: async (parent, { skill }, context) => {
        //     if (context.user) {
        //         return Profile.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { skills: skill } },
        //             { new: true }
        //         );
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },
    },
};

module.exports = resolvers;
