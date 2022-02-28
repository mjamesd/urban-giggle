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
    hint1: {
        type: String,
        required: true,
    },
    hint2: {
        type: String,
        required: true,
    },
    hint3: {
        type: String,
        required: true,
    },
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
    points: {
        type: Number,
        min: [1, "Must be a positive number"],
    },
    city: {
        type: String,
        required: true
    }
});

huntItemSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.qrId = uuidv4();
    }
    next();
});

const HuntItem = model('HuntItem', huntItemSchema);

module.exports = HuntItem;