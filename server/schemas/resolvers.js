const { AuthenticationError } = require("apollo-server-express");
const { Badge, Hunt, HuntItem, User } = require("../models");
const { signToken } = require("../utils/auth");

class MissingArgumentError extends Error {
    constructor(message) {
        this.name = "MissingArgumentError";
        super(`${this.name}: ${message}`);
    }
}

const resolvers = {
    Query: {
        // BADGE
        badges: async () => {
            return Badge.find();
        },
        badge: async (parent, { badgeId }) => {
            if (!badgeId)
                throw new MissingArgumentError('Badge_badge: no badgeId');

            return Badge.findById(badgeId);
        },
        // HUNT
        hunts: async () => {
            return Hunt.find().populate('huntItems');
        },
        hunt: async (parent, { huntId }) => {
            if (!huntId)
                throw new MissingArgumentError('Hunt_hunt: no huntId');

            return await Hunt.findById(huntId).populate('huntItems');
        },
        huntsByCity: async (parent, { city }) => {
            if (!city)
                throw new MissingArgumentError('Hunt_huntsByCity: no city');

            return Hunt.find({ city }).populate('huntItems');
        },
        // HUNTITEM
        huntItems: async () => {
            return HuntItem.find();
        },
        huntItem: async (parent, { huntItemId }) => {
            if (!huntItemId)
                throw new MissingArgumentError('HuntItem_huntItem: no huntItemId');

            return await HuntItem.findById(huntItemId);
        },
        huntItemByQrCode: async (parent, { qrId }) => {
            if (!qrId)
                throw new MissingArgumentError('HuntItem_huntItemByQrCode: no qrId');
            return await HuntItem.findOne({ qrId });
        },
        huntItemsByCity: async (parent, { city }) => {
            if (!city)
                throw new MissingArgumentError('HuntItem_huntItemsByCity: no city');

            return HuntItem.find({ city }); // find --> findAll
        },
        // USER
        users: async () => {
            return User.find().populate('completedHunts').populate('foundHuntItems')
                .populate('badges').populate('favoriteHunts').populate('favoriteHuntItems');
        },
        user: async (parent, { userId }) => {
            if (!userId)
                throw new MissingArgumentError('User_user: no userId');

            return User.findById(userId).populate('completedHunts').populate('foundHuntItems')
                .populate('badges').populate('favoriteHunts').populate('favoriteHuntItems');
        },
        me: async (parent, args, context) => {
            if (!context.user)
                throw new AuthenticationError("You need to be logged in! (me)");

            return User.findById(context.user._id).populate('completedHunts').populate('foundHuntItems')
                .populate('badges').populate('favoriteHunts').populate('favoriteHuntItems');
        },
    },

    // =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
    // MUTATIONS =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
    // =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

    Mutation: {
        // BADGE
        createBadge: async (parent, args) => {
            return await Badge.create(args);
        },
        updateBadge: async (parent, { badgeId, ...args }) => {
            if (Object.entries(args).length === 0)
                return await Badge.findById(badgeId);

            return await Badge.findByIdAndUpdate(
                badgeId,
                args,
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeBadge: async (parent, { badgeId }) => {
            return await Badge.findByIdAndDelete(badgeId);
        },
        // HUNT
        createHunt: async (parent, args) => {
            return await Hunt.create(args);
        },
        updateHunt: async (parent, { huntId, ...args }) => {
            if (Object.entries(args).length === 0) return await Hunt.findById(huntId).populate('huntItems');
            return await Hunt.findByIdAndUpdate(
                huntId,
                args,
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('huntItems');
        },
        removeHunt: async (parent, { huntId }) => {
            return await Hunt.findByIdAndDelete(huntId);
        },
        // HUNTITEM
        createHuntItem: async (parent, args) => {
            return await HuntItem.create(args);
        },
        updateHuntItem: async (parent, { huntItemId, ...args }) => {
            if (Object.entries(args).length === 0) return await HuntItem.findById(huntItemId);
            return await HuntItem.findByIdAndUpdate(
                huntItemId,
                args,
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
            console.log('huntId: ', huntId);
            console.log('huntItemId: ', huntItemId);
            const hunt = await Hunt.findByIdAndUpdate(
                huntId,
                {
                    $addToSet: { huntItems: huntItemId },
                },
                {
                    new: true,
                }
            );
            console.log(hunt);
        },
        removeHuntItemFromHunt: async (parent, { huntId, huntItemId }) => {
            const hunt = await Hunt.findById(huntId);
            hunt.huntItems.id(huntItemId).remove();
            return hunt;
        },
        // USER
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (parent, { password, ...args }, context) => {
            if (!context.user)
                throw new AuthenticationError(
                    "You need to be logged in! (updateUser: loggedIn check)"
                );
            // get current `user` from db to check if supplied `password` arg is correct
            const user = await User.findById(context.user._id);
            const correctPwd = await user.isCorrectPassword(password);
            if (!correctPwd)
                throw new AuthenticationError(
                    "You supplied the wrong password. Please try again. (updateUser: pwd check)"
                );
            if (args.newPassword !== args.password) {
                args.password = args.newPassword;
            } else {
                delete args.password;
            }
            if (Object.entries(args).length > 0) {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    args,
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                const token = signToken(updatedUser);
                return { token, updatedUser };
            } else {
                // they didn't supply any info to update, so just re-sign the token and return the Auth obj
                const token = signToken(user);
                return { token, user };
            }
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
            const token = signToken(user, Date.now() / 1000); // re-sign token with expiration of current time (i.e., immediately expires)
            const deletedUser = await User.findByIdAndDelete(context.user._id);
            return { token, deletedUser };
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
                    runValidators: true, // StackOverflow says this doesn't work with `findByIdAndUpdate`... let's see.
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
