const db = require('../config/connection');
const { User, Hunt, HuntItem, Badge } = require('../models');
const userSeeds = require('./userSeeds.json');
const huntSeeds = require('./huntSeeds.json');
const huntItemSeeds = require('./huntItemSeeds.json');
const badgeSeeds = require('./badgeSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    console.log('seeded users');
    
    await Hunt.deleteMany({});
    await Hunt.create(huntSeeds);
    console.log('seeded hunts');
    
    await HuntItem.deleteMany({});
    await HuntItem.create(huntItemSeeds);
    console.log('seeded huntItems');
    
    await Badge.deleteMany({});
    await Badge.create(badgeSeeds);
    console.log('seeded badges');

    console.log('ALL DONE!!!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});