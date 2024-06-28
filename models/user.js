const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
      // Reference to Size collection
      size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size'
      },
       // Reference to CompositeImage collection
    compositeImages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompositeImage'
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserImg'
    }]
});



module.exports = mongoose.model('User', UserSchema);
