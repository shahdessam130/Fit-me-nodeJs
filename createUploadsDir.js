const fs = require('fs');
const path = require('path');

// المسار إلى مجلد الـ uploads
const uploadDir = path.join(__dirname, 'uploads');

// التأكد من عدم وجود المجلد مسبقًا
if (!fs.existsSync(uploadDir)) {
    // إنشاء المجلد إذا لم يكن موجودًا
    fs.mkdirSync(uploadDir);
    console.log('Uploads directory created successfully');
} else {
    console.log('Uploads directory already exists');
}
