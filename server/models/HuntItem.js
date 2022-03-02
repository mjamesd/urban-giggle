const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const huntItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    qrId: {
        type: String, // see .pre function below
    },
    city: {
        type: String,
        required: true
    },
    hint1: {
        type: String,
        required: true,
    },
    hint2: {
        type: String,
        required: true,
    },
    hint2DisplayedTo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    hint3: {
        type: String,
        required: true,
    },
    hint3DisplayedTo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    solutionLocation: {
        type: String, // description and/or lat&long
        required: true,
    },
    solutionDescription: {
        type: String,
        required: true,
    },
    solutionImg: {
        type: String,
    },
    solutionDisplayedTo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    points: {
        type: Number,
        default: 1,
        min: [1, "Must be a positive number"],
    },
    rewards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Badge',
        }
    ],
    guestbook: [
        {
            type: String,
        },
    ],
});

huntItemSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.qrId = uuidv4();
    }
    next();
});

const HuntItem = model('HuntItem', huntItemSchema);

module.exports = HuntItem;