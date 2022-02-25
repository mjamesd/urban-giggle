const { Schema, model } = require('mongoose');

const huntSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        min: [1, "Must be a positive number"],
    },
    huntItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'HuntItem',
        }
    ],
});

const Hunt = model('Hunt', huntSchema);

module.exports = Hunt;