const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid')
const axios = require('axios');

const happiDevApiKey = `8aa80fF4TsMsXsB2d59W5W467VbH3gss5bZhonBPURMZMU1opXZCRPQq`;
const happiDevApiUrl = `https://api.happi.dev/v1/qrcode?apikey=${happiDevApiKey}&data=http://www.totalquest.us/victory/`;

const huntItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    qrId: {
        type: String, // see .pre function below
    },
    qrCode: {
        type: String, // see .pre function below
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
        this.qrId = uuidv4();

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