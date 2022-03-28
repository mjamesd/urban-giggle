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
        // environment_vars: () => {
        //     return process.env;
        // },
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

            return Hunt.find({ city }).populate('huntItems').populate('rewards').populate({
                path: 'huntItems',
                populate: ['hint2DisplayedTo', 'hint3DisplayedTo', 'solutionDisplayedTo', 'rewards']
            });
        },
        // HUNTITEM
        huntItems: async () => {
            return HuntItem.find().populate('rewards').populate('hint2DisplayedTo').populate('hint3DisplayedTo').populate('solutionDisplayedTo');
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
            return User.find().populate('completedHunts').populate({ path: 'completedHunts', populate: ['huntItems', 'rewards'] }).populate('foundHuntItems').populate({ path: 'foundHuntItems', populate: ['rewards'] }).populate('badges');
        },
        user: async (parent, { userId }) => {
            if (!userId)
                return new MissingArgumentError('User_user: no userId');

            return User.findById(userId).populate('completedHunts').populate({ path: 'completedHunts', populate: ['huntItems', 'rewards'] }).populate('foundHuntItems').populate({ path: 'foundHuntItems', populate: ['rewards'] }).populate('badges');
        },
        me: async (parent, args, context) => {
            if (!context.user)
                return new AuthenticationError("You need to be logged in! (me)");

            return User.findById(context.user._id).populate('completedHunts').populate({ path: 'completedHunts', populate: ['huntItems', 'rewards'] }).populate('foundHuntItems').populate({ path: 'foundHuntItems', populate: ['rewards'] }).populate('badges');
        },
    },

    // =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
    // MUTATIONS =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
    // =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

    Mutation: {
        // BADGE
        createBadge: async (parent, args, context) => {
            if (!context.user || context.user.userType !== 'admin') return new AuthenticationError('Access denied (createBadge)');
            return await Badge.create(args);
        },
        updateBadge: async (parent, { badgeId, ...args }, context) => {
            if (!context.user || context.user.userType !== 'admin') return new AuthenticationError('Access denied (updateBadge)');
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
        removeBadge: async (parent, { badgeId }, context) => {
            if (!context.user || context.user.userType !== 'admin') return new AuthenticationError('Access denied (removeBadge)');
            return await Badge.findByIdAndDelete(badgeId);
        },
        // HUNT
        createHunt: async (parent, args, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (createHunt)');
            const hunt = await Hunt.create(args);
            return await Hunt.findById(hunt._id).populate('huntItems').populate('rewards');
        },
        updateHunt: async (parent, { huntId, ...args }, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (updateHunt)');
            if (Object.entries(args).length === 0) return await Hunt.findById(huntId).populate('huntItems').populate('rewards').populate({
                path: 'huntItems',
                populate: ['hint2DisplayedTo', 'hint3DisplayedTo', 'solutionDisplayedTo', 'rewards']
            });
            return await Hunt.findByIdAndUpdate(
                huntId,
                args,
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('huntItems').populate('rewards').populate({
                path: 'huntItems',
                populate: ['hint2DisplayedTo', 'hint3DisplayedTo', 'solutionDisplayedTo', 'rewards']
            });
        },
        removeHunt: async (parent, { huntId }, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (removeHunt)');
            return await Hunt.findByIdAndDelete(huntId);
        },
        // HUNTITEM
        createHuntItem: async (parent, args, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (createHuntItem)');
            const huntItem = await HuntItem.create(args);

            return await HuntItem.findById(huntItem._id).populate('rewards');
        },
        updateHuntItem: async (parent, { huntItemId, ...args }, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (updateHuntItem)');
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
        removeHuntItem: async (parent, { huntItemId }, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (removeHuntItem)');
            return await HuntItem.findByIdAndDelete(huntItemId);
        },
        removeHuntItemFromHunt: async (parent, { huntId, huntItemId }, context) => {
            if (!context.user || context.user.userType === 'hunter') return new AuthenticationError('Access denied (removeHuntItemFromHunt)');
            const hunt = await Hunt.findById(huntId);
            hunt.huntItems.id(huntItemId).remove();
            return hunt;
        },
        userAsksForHint: async (parent, { huntItemId, hint2, hint3, solution }, context) => {
            if (!context.user) return new AuthenticationError('Access denied (userAsksForHint)');
            let toAddToSet = {};
            if (hint2) {
                toAddToSet.hint2DisplayedTo = context.user._id;
            } else if (hint3) {
                toAddToSet.hint3DisplayedTo = context.user._id;
            } else if (solution) {
                toAddToSet.solutionDisplayedTo = context.user._id;
            }

            const user = await User.findById(context.user._id);
            if (user.points >= 1) {
                user.points -= 1;

                user.save((err) => {
                    if (err) return new Error(err);
                });
                const token = signToken(user);


                const huntItem = await HuntItem.findByIdAndUpdate(
                    huntItemId,
                    {
                        $addToSet: toAddToSet,
                    },
                    {
                        new: true,
                    },
                );
                return { token, user };
            } else {
                return new Error('INSUFFICIENT_POINTS');
            }
        },
        userSignsHuntItemGuestbook: async (parent, { huntItemId, message }, context) => {
            if (!context.user) return new AuthenticationError('You need to be logged in! (guestbook)');

            const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const nowStamp = new Date();
            const timestamp = `${months[nowStamp.getMonth()]} ${nowStamp.getDate()}, ${nowStamp.getFullYear()} @ ${(nowStamp.getHours() > 12) ? nowStamp.getHours() - 12 : nowStamp.getHours()}:${(nowStamp.getMinutes() < 10) ? '0' : ''}${nowStamp.getMinutes()}${(nowStamp.getHours() >= 12) ? 'pm' : 'am'}`;
            message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            let newMessage = `<div class="huntItemGuestbookItem" key="${context.user._id}">
    <div class="guestbook-message">${message}</div>
    <div class="guestbook-author">${context.user.username}</div>
    <div class="guestbook-timestamp">${timestamp}</div>
</div>`;
            const huntItem = await HuntItem.findById(huntItemId);
            huntItem.guestbook.push(newMessage);
            huntItem.save((err) => {
                if (err) return new Error(err);
            });
            return huntItem;
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
                user.password = args.password;
            } else {
                delete args.password;
            }
            if (args.username) user.username = args.username;
            if (args.email) user.email = args.email;
            if (Object.entries(args).length > 0) {
                user.save();
                const updatedUser = await User.findById(user._id);
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
        // this should not be used, the places where points are added or deducted have this coded into them already
        changePoints: async (parent, { userId, pointsToChange }, context) => {
            if (!context.user || context.user.userType !== 'admin') return new AuthenticationError('Access denied (changePoints)');
            if (!context.user)
                return new AuthenticationError("You need to be logged in!");
            return await User.findByIdAndUpdate(
                userId,
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
        // Badge names taken from /server/seeders/badgeSeeds.json
        // We give specific badges for special events, i.e., your first completed scavenger hunt.
        // TO DO: make this dynamic so you can make n^th special events.
        userFoundHuntItem: async (parent, { huntItemId }, context) => {
            if (!context.user) {
                return new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findById(context.user._id).populate('completedHunts').populate('foundHuntItems');

            let newPoints = 0;
            let newBadges = [];
            let completedHunts = [];
            const isFirstFoundHuntItem = user.foundHuntItems.length === 0;
            const isFirstCompletedHunt = user.completedHunts.length === 0;

            if (isFirstFoundHuntItem) {
                const firstFoundHuntItemBadge = await Badge.findOne({ name: 'The First Of Many'});
                newBadges.push(firstFoundHuntItemBadge._id);
                newPoints += firstFoundHuntItemBadge.points;
            }

            if (true) {
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
                    newBadges.push(reward._id);
                    newPoints += reward.points;
                });
            }
            const hunts = await Hunt.find({});
            hunts.forEach(async (hunt) => {
                if (hunt.huntItems.includes(huntItemId)) {
                    // TO DO: replace this with a reducer
                    user.foundHuntItems.forEach((foundHuntItem) => {
                        const hiIndex = hunt.huntItems.indexOf(foundHuntItem._id);
                        if (hiIndex !== -1) {
                            hunt.huntItems.pull(foundHuntItem._id);
                        }
                    });
                    if (hunt.huntItems.length === 0) {
                        newPoints += hunt.points;
                        hunt.rewards.forEach((reward) => {
                            newBadges.push(reward._id);
                            newPoints += reward.points;
                        });
                        completedHunts.push(hunt._id);
                        if (isFirstCompletedHunt) {
                            const firstCompletedHuntBadge = await Badge.findOne({ name: 'Novice Hunter'});
                            newBadges.push(firstCompletedHuntBadge._id);
                            newPoints += firstCompletedHuntBadge.points;
                        }
                    }
                }
            });

            // add arrays to object which will be saved
            let toAddToSet = {};
            toAddToSet.foundHuntItems = huntItemId;
            toAddToSet.badges = newBadges;
            if (completedHunts.length > 0) toAddToSet.completedHunts = completedHunts;

            // award 10th found hunt item badge if applicable
            if (toAddToSet.foundHuntItems.length + user.foundHuntItems.length === 10 && !user.foundHuntItems.includes(huntItemId)) {
                const tenthFoundHuntItemBadge = await Badge.findOne({ name: 'The Big Ten' });
                newBadges.push(tenthFoundHuntItemBadge._id);
                newPoints += tenthFoundHuntItemBadge.points;
            }
            // award 10th completed hunt if applicable
            if (user.completedHunts === 9 && !user.completedHunts.includes(completedHunts[0])) {
                const tenthCompletedHunt = await Badge.findOne({ name: 'Master Hunter' });
                newBadges.push(tenthCompletedHunt._id);
                newPoints += tenthCompletedHunt.points;
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
            const hunt = await Hunt.findById(huntId).populate('huntItems').populate('rewards');
            let badgesToAdd = hunt.rewards.map(item => item._id);
            const user = await User.findByIdAndUpdate(
                context.user._id,
                {
                    $inc: { points: hunt.points },
                    $addToSet: { completedHunts: huntId, badges: badgesToAdd },
                },
                {
                    new: true,
                }
            ).populate('completedHunts').populate('foundHuntItems');
            const token = signToken(user);
            return { token, user };
        },
        // Hunts and huntItems that reward user with badge(s) already have this coded into them, so this is not needed for those actions.
        // Use this for special badge rewards -- mostly for "{x}th found HuntItem" and "{x}th completed Hunt".
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