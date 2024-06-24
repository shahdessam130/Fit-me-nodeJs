const mongoose = require('mongoose');

const CompositeImageSchema = new mongoose.Schema({
    composite_ID: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('CompositeImage', CompositeImageSchema);
