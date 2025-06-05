"use strict"

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Middleware - req.body.type:', req.body.type);
        let folder = '';
        if (req.body.type === 'books_for_kids') {
            folder = 'uploads/books-for-kids/';
        } 
        else if (req.body.type === 'books_for_parents') {
            folder = 'uploads/books-for-parents/';
        }
        else if (req.body.type === 'daily_exercises') {
            folder = 'uploads/daily-exercises/';
        }
        else if (req.body.type === 'daily_shopping') {
            folder = 'uploads/daily-shopping/';
        }
        else if (req.body.type === 'games') {
            folder = 'uploads/games/';
        }
        else if (req.body.type === 'health_for_kids') {
            folder = 'uploads/health-for-kids/';
        }
        else if (req.body.type === 'health_for_parents') {
            folder = 'uploads/health-for-parents/';
        }
        else if (req.body.type === 'users') {
            folder = 'uploads/users/';
        }
        else {
            folder = 'uploads/others/';
        }
        console.log('Middleware - folder:', folder)
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// const upload = multer({ storage })

const upload = multer({ storage })

// module.exports = upload
module.exports = {
    single: upload.single('file'), // For single file uploads
    multiple: upload.array('files', 10), // For multiple file uploads
}