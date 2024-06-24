const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Size', SizeSchema);
