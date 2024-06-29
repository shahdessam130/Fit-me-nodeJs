
const express = require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/userImg', require('./routes/userImg'));
// توجيه المسار الرئيسي
console.log('Application has started');

// استدعاء ملف إنشاء مجلد الرفع
require('./createUploadsDir');


const PORT = process.env.PORT || 3400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
