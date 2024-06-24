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

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password verification method
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
