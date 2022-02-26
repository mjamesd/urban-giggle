const { AuthenticationError } = require("apollo-server-express");
const { Badge, Hunt, HuntItem, User } = require("../models");
const { signToken } = require("../utils/auth");

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
      throw new AuthenticationError("You need to be logged in! (me)");
    },
  },

  Mutation: {
    // BADGE
    createBadge: async (parent, { name, icon, description, points }) => {
      return await Badge.create({
        name,
        icon,
        description,
        points,
      });
    },
    updateBadge: async (
      parent,
      { badgeId, newName, newIcon, newDescription, newPoints }
    ) => {
      console.log(badgeId);
      const badge = await Badge.findById(badgeId);
      console.log(badge);
      if (!newName) newName = badge.name;
      if (!newIcon) newIcon = badge.icon;
      if (!newDescription) newDescription = badge.description;
      if (!newPoints) newPoints = badge.points;

      return await Badge.findByIdAndUpdate(
        badgeId,
        {
          name: newName,
          icon: newIcon,
          description: newDescription,
          points: newPoints,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBadge: async (parent, { badgeId }) => {
      return await Badge.findOneAndDelete({ _id: badgeId });
    },

    // HUNT
    createHunt: async (parent, { name, description, points }) => {
      return await Badge.create({
        name,
        icon,
        description,
        points,
      });
    },
    removeHunt: async (parent, { badgeId }) => {
      return await Badge.findOneAndDelete({ _id: badgeId });
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
    removeHuntItem: async (parent, { badgeId }) => {
      return await Badge.findOneAndDelete({ _id: badgeId });
    },

    // USER
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (
      parent,
      { username, newUsername, email, newEmail, password, newPassword }
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
      if (!newUsername) newUsername = username;
      if (!newEmail) newEmail = email;
      if (!newPassword) newPassword = password;
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          username: newUsername,
          email: newEmail,
          password: newPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const token = signToken(updatedUser);
      return { token, updatedUser };
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
      return await User.findOneAndUpdate(
        { _id: context.user._id },
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
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
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
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
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
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
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
