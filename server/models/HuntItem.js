const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// we give it a URL with https here: https://www.totalquest.us/victory/...
const happiDevApiUrl = `https://api.happi.dev/v1/qrcode?apikey=${process.env.HAPPI_DEV_API_KEY}&data=https://www.totalquest.us/victory/`;

const huntItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    qrId: {
        type: String, // see .pre function below
        unique: true,
    },
    qrCode: {
        type: String, // see .pre function below
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
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
    solutionName: {
        type: String, // the name of the location
        required: true,
    },
    solutionLocation: {
        type: String, // address or lat&long
        required: true,
    },
    solutionImg: {
        type: String,
    },
    solutionRewardText: {
        type: String, // text to display when user finds it -- i.e., a reward from the business
        required: false,
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
        },
    ],
    guestbook: [
        {
            type: String,
        },
    ],
});

huntItemSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.qrId = uuidv4().substring(0,8); // make them only 8 characters long

        // create and store QR Code as base64 PNG
        try {
            const response = await axios.get(`${happiDevApiUrl}${this.qrId}`);
            this.qrCode = response.data.qrcode;
        } catch(error) {
            console.log('API ERROR:', error);
        }
    }
    next();
});

const HuntItem = model('HuntItem', huntItemSchema);

module.exports = HuntItem;