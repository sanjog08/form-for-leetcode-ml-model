const mongoose = require("mongoose");

const leetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    easy: {
        type: Number,
        required: true,
    },
    medium: {
        type: Number,
        required: true,
    },
    hard: {
        type: Number,
        required: true,
    },
    leetrank: {
        type: Number,
        required: true,
    }    
})


// we will create a model
const Leet = new mongoose.model("leet", leetSchema);

module.exports = Leet;