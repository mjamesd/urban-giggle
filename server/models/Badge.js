const { Schema, model } = require('mongoose');

const badgeSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String, // FontAwesome? Materialize? Other?
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        min: [0, "Must be at least zero"],
    },
});

const Badge = model('Profile', badgeSchema);

module.exports = Badge;