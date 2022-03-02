const { AuthenticationError } = require("apollo-server-express");
const { Badge, Hunt, HuntItem, User } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt');

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
            return Badge.find().populate('huntItems').populate('rewards');
        },
        badge: async (parent, { badgeId }) => {
            if (!badgeId)
                return new MissingArgumentError('Badge_badge: no badgeId');

            return Badge.findById(badgeId).populate('huntItems').populate('rewards');
        },
        // HUNT
        hunts: async () => {
            return Hunt.find().populate('huntItems').populate('rewards');
        },
        hunt: async (parent, { huntId }) => {
            if (!huntId)
                return new MissingArgumentError('Hunt_hunt: no huntId');

            return await Hunt.findById(huntId).populate('huntItems').populate('rewards').populate({
                path: 'huntItems',
                populate: ['hint2DisplayedTo', 'hint3DisplayedTo', 'solutionDisplayedTo', 'rewards']
            });
        },
        huntsByCity: async (parent, { city }) => {
            if (!city)
                return new MissingArgumentError('Hunt_huntsByCity: no city');

            return Hunt.find({ city }).populate('huntItems').populate('rewards');
        },
        // HUNTITEM
        huntItems: async () => {
            return HuntItem.find().populate('rewards');
        },
        huntItem: async (parent, { huntItemId }) => {
            if (!huntItemId)
                return new MissingArgumentError('HuntItem_huntItem: no huntItemId');

            return await HuntItem.findById(huntItemId).populate('rewards').populate('hint2DisplayedTo').populate('hint3DisplayedTo').populate('solutionDisplayedTo');
        },
        huntItemByQrCode: async (parent, { qrId }) => {
            if (!qrId)
                return new MissingArgumentError('HuntItem_huntItemByQrCode: no qrId');
            
            return await HuntItem.findOne({ qrId }).populate('rewards');
        },
        huntItemsByCity: async (parent, { city }) => {
            if (!city)
                return new MissingArgumentError('HuntItem_huntItemsByCity: no city');

            return HuntItem.find({ city }).populate('rewards');
        },
        // USER
        users: async () => {
            return User.find().populate('completedHunts').populate('foundHuntItems')
                .populate('badges').populate('favoriteHunts').populate('favoriteHuntItems');
        },
        user: async (parent, { userId }) => {
            if (!userId)
                return new MissingArgumentError('User_user: no userId');

            return User.findById(userId).populate('completedHunts').populate('foundHuntItems')
                .populate('badges').populate('favoriteHunts').populate('favoriteHuntItems');
        },
        me: async (parent, args, context) => {
            if (!context.user)
                return new AuthenticationError("You need to be logged in! (me)");

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
            // console.log(addRewards);
            // console.log(args);
            const hunt = await Hunt.create(args);
            // if (addRewards) {
            //     addRewards.forEach(reward => {
            //         Hunt.rewards.push(reward);
            //     });
            //     await Hunt.save((err) => {
            //         if (err)
            //             return new Error('Failed to save `Hunt`');
            //         console.log(hunt);
            //     });
            // }
            return await Hunt.findById(hunt._id).populate('huntItems').populate('rewards');
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
            ).populate('huntItems').populate('rewards');
        },
        removeHunt: async (parent, { huntId }) => {
            return await Hunt.findByIdAndDelete(huntId);
        },
        // HUNTITEM
        createHuntItem: async (parent, args) => {
            const huntItem = await HuntItem.create(args);

            return await HuntItem.findById(huntItem._id).populate('rewards');
        },
        updateHuntItem: async (parent, { huntItemId, ...args }) => {
            if (Object.entries(args).length === 0)
                return await HuntItem.findById(huntItemId).populate('rewards');
            
            return await HuntItem.findByIdAndUpdate(
                huntItemId,
                args,
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('rewards');
        },
        removeHuntItem: async (parent, { huntItemId }) => {
            return await HuntItem.findByIdAndDelete(huntItemId);
        },
        removeHuntItemFromHunt: async (parent, { huntId, huntItemId }) => {
            const hunt = await Hunt.findById(huntId);
            hunt.huntItems.id(huntItemId).remove();
            return hunt;
        },
        userAsksForHint: async (parent, { huntItemId, hint2, hint3, solution }, context) => {
            let toAddToSet = {};
            const pointsToChange = -1;
            if (hint2) {
                toAddToSet.hint2DisplayedTo = context.user._id;
            } else if (hint3) {
                toAddToSet.hint3DisplayedTo = context.user._id;
            } else if (solution) {
                toAddToSet.solutionDisplayedTo = context.user._id;
            }

            const user = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $inc: { points: pointsToChange }
                },
            );

            return await HuntItem.findByIdAndUpdate(
                huntItemId,
                {
                    $addToSet: toAddToSet,
                },
                {
                    new: true,
                },
            ).populate('rewards').populate('hint2DisplayedTo').populate('hint3DisplayedTo').populate('solutionDisplayedTo');
        },
        // USER
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (parent, { password, ...args }, context) => {
            if (!context.user)
                return new AuthenticationError(
                    "You need to be logged in! (updateUser: loggedIn check)"
                );
            // get current `user` from db to check if supplied `password` arg is correct
            const user = await User.findById(context.user._id);
            const correctPwd = await user.isCorrectPassword(password);
            if (!correctPwd)
                return new AuthenticationError(
                    "You supplied the wrong password. Please try again. (updateUser: pwd check)"
                );
            if (args.newPassword !== args.password) {
                args.password = args.newPassword;
            } else {
                delete args.password;
            }
            args.password = await bcrypt.hash(args.password, 10);
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
                return { token, user: updatedUser };
            } else {
                // they didn't supply any info to update, so just re-sign the token and return the Auth obj
                const token = signToken(user);
                return { token, user };
            }
        },
        // Logged in user can only remove their profile, no one else's
        removeUser: async (parent, { password }, context) => {
            if (!context.user)
                return new AuthenticationError(
                    "You need to be logged in! (removeUser: loggedIn check)"
                );
            const user = await User.findById(context.user._id);
            const correctPwd = await user.isCorrectPassword(password);
            if (!correctPwd)
                return new AuthenticationError(
                    "You supplied the wrong password. Please try again. (removeUser: pwd check)"
                );
            const token = signToken(user, Date.now() / 1000); // re-sign token with expiration of current time (i.e., immediately expires)
            const deletedUser = await User.findByIdAndDelete(context.user._id);
            return { token, user: deletedUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                return new AuthenticationError("No user with this email found!");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },
        // add points to user, `pointsToChange` can be positive or negative
        changePoints: async (parent, { pointsToChange }, context) => {
            if (!context.user)
                return new AuthenticationError("You need to be logged in!");
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
            if (!context.user) {
                return new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findById(context.user._id).populate('completedHunts').populate('foundHuntItems');
            user.foundHuntItems.push(huntItemId);

            let newPoints = 0;
            const huntItem = await HuntItem.findByIdAndUpdate(
                huntItemId,
                {
                    $addToSet: {
                        hint2DisplayedTo: context.user._id,
                        hint3DisplayedTo: context.user._id,
                        solutionDisplayedTo: context.user._id
                    },
                },
                {
                    new: true,
                },
            ).populate('rewards');
            newPoints += huntItem.points;
            huntItem.rewards.forEach((reward) => {
                newPoints += reward.points;
            });

            let completedHunts = [];
            let newBadges = [];
            const hunts = await Hunt.find({});
            hunts.forEach((hunt) => {
                if (hunt.huntItems.includes(huntItemId)) {
                    user.foundHuntItems.forEach((foundHuntItem) => {
                        const hiIndex = hunt.huntItems.indexOf(foundHuntItem._id);
                        if (hiIndex !== -1) {
                            hunt.huntItems.pull(foundHuntItem._id);
                        }
                    });
                    if (hunt.huntItems.length === 0) {
                        newPoints += hunt.points;
                        hunt.rewards.forEach((reward) => {
                            newPoints += reward.points;
                            newBadges.push(reward._id);
                        });
                        completedHunts.push(hunt._id);
                    }
                }
            });
            let toAddToSet = {};
            toAddToSet.foundHuntItems = huntItemId;
            toAddToSet.badges = huntItem.rewards;
            if (completedHunts) {
                toAddToSet.completedHunts = completedHunts;
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $inc: { points: newPoints, },
                    $addToSet: toAddToSet,
                },
                {
                    new: true,
                }
            ).populate('foundHuntItems').populate('completedHunts').populate('badges');
            const token = signToken(updatedUser);
            return { token, user: updatedUser };
        },
        userCompletedHunt: async (parent, { huntId }, context) => {
            if (!context.user)
                return new AuthenticationError("You need to be logged in!");
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
                return new AuthenticationError("You need to be logged in!");
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
