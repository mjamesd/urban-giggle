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
        default: 0,
        min: [0, "Must be at least zero"],
    },
});

const Badge = model('Badge', badgeSchema);

module.exports = Badge;