const { AuthenticationError } = require('apollo-server-express');
const { Badge, Hunt, HuntItem, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // BADGE
        badges: async () => {
            return Badge.find();
        },
        badge: async (parent, { badgeId }) => {
            return Badge.findOne({ _id: badgeId });
        },

        // HUNT
        hunts: async () => {
            return Hunt.find();
        },
        hunt: async (parent, { huntId }) => {
            return Hunt.findOne({ _id: huntId });
        },

        // HUNTITEM
        huntItems: async () => {
            return HuntItem.find();
        },
        huntItem: async (parent, { huntItemId }) => {
            return HuntItem.findOne({ _id: huntItemId });
        },

        // USER
        users: async () => {
            return User.find();
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // BADGE
        addBadge: async (parent, {name, icon, description, points}) => {
            return await Badge.create({
                name,
                icon,
                description,
                points
            });
        },
        removeBadge: async (parent, { badgeId }) => {
            return await Badge.findOneAndDelete({ _id: badgeId });
        },
        
        // HUNT
        addHunt: async (parent, {name, description, points}) => {
            return await Badge.create({
                name,
                icon,
                description,
                points
            });
        },
        removeBadge: async (parent, { badgeId }) => {
            return await Badge.findOneAndDelete({ _id: badgeId });
        },

        // HUNTITEM
        addBadge: async (parent, {name, icon, description, points}) => {
            const badge = await Badge.create({
                name,
                icon,
                description,
                points
            });
            return badge;
        },
        removeBadge: async (parent, { badgeId }) => {
            return await Badge.findOneAndDelete({ _id: badgeId });
        },

        // USER
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        // Set up mutation so a logged in user can only remove their profile and no one else's
        removeUser: async (parent, args, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndDelete({ _id: context.user._id });
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
        // add points to user, `pointsToChange` can be positive or negative
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
                    runValidators: true, // StackOverflow says this doesn't work with `findOneAndUpdate`... let's see.
                }
            );
        },
        userFoundHuntItem: async (parent, { huntItemId }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { foundHuntItems: huntItemId }
                }
            );
        },
        userCompletedHunt: async (parent, { huntId }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { completedHunts: huntId }
                }
            );
        },
        userAddBadge: async (parent, { badgeId }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { badges: badgeId },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
    },
};

module.exports = resolvers;