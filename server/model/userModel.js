const mongoose = require("mongoose");

// Defines what the user model should look like
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    is_avatar_image_set: {
        type: Boolean,
        default: false,
    },
    avatar_image: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("Users", userSchema);