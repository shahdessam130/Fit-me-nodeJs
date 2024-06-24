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
const size = require('./models/size');
async function insert()
{
    await user.create({
        height:30,
        weight:5,
        age:9,
    });
}
insert();
module.exports = connectDB;
