const mongoose = require('mongoose');
const user = require('../models/user');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://eshahd637:zzBftImPtRKYiagA@cluster0.tz6evin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
