const db = require('../config/connection');
const { HuntItem } = require('../models');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();

/**
 * 
 * Command line utility to update the QR codes for ALL HuntItems.
 * This should not be run on the production database since it will over-write all the current QR IDs and QR codes,
 *   thus rendering any printed/posted/saved QR codes useless.
 * 
 */

// We give it a URL with https here: https://www.totalquest.us/victory/{qrId}
const happiDevApiUrl = `https://api.happi.dev/v1/qrcode?apikey=${process.env.HAPPI_DEV_API_KEY}&data=https://www.totalquest.us/victory/`;

// You can provide a timeout as a command line argument like this: `npm run updateQrIds 10000`
const theTimeout = process.argv[2] ? process.argv[2] : 5000; // defaults to 5 seconds

db.once('open', async () => {
    try {
        const huntItems = await HuntItem.find({});
        huntItems.forEach(async (item) => {
            item.qrId = uuidv4().substring(0,8); // make them only 8 characters long
            try {
                const response = await axios.get(`${happiDevApiUrl}${item.qrId}`);
                item.qrCode = response.data.qrcode;
                await item.save((errorSave) => {
                    if (errorSave) {
                        console.log(`error while saving huntItem ID: ${item._id}:`, errorSave);
                        throw errorSave;
                    }
                });
            } catch (errorQr) {
                console.log(`error while generating QR code for huntItem ID: ${item._id}:`, errorQr);
                throw errorQr;
            }
        });
    } catch (errorDb) {
        console.log(`error while updating:`, errorDb);
        throw errorDb;
    }
    // Script was ending without completing tasks, so I added this timeout to make sure it has enough time to complete.
    setTimeout(() => {
        console.log('QR IDs and QR Codes updated!');
        process.exit(0);
    }, theTimeout);
});