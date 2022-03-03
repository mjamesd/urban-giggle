const { Schema, model } = require('mongoose');

const huntSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 1,
        min: [1, "Must be a positive number"],
    },
    huntItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'HuntItem',
        }
    ],
    rewards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Badge',
        }
    ],
});

const Hunt = model('Hunt', huntSchema);

module.exports = Hunt;