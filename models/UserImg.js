const mongoose = require('mongoose');

const UserImgSchema = new mongoose.Schema({
    img_id: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('UserImg', UserImgSchema);
