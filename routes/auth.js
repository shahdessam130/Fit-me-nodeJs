const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Size = require('../models/Size');
const CompositeImage = require('../models/CompositeImage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
// server.js or app.js

const jwtSecret = process.env.JWT_SECRET;
// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new User document
        user = new User({
            name,
            email,
            password,
        });

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret, // use environment variable for production
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/size', auth, async (req, res) => {
    const { height, weight, age } = req.body;
    try {
        // Find the user by ID from the token
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Create a new Size document
        const newSize = new Size({
            height,
            weight,
            age
        });
        await newSize.save();

        // Associate the size document with the user
        user.size = newSize._id;
        await user.save();

        res.json(newSize);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET route to retrieve size information
router.get('/', auth, async (req, res) => {
    try {
        // Find the user by ID from the token
        let user = await User.findById(req.user.id).populate('size');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return the user's size information
        res.json(user.size);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).populate('size').populate('compositeImages');
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // use environment variable for production
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token ,user});
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// Add composite image route
router.post('/composite-image', auth, async (req, res) => {
    const { composite_ID, img_url } = req.body;

    try {
        // Create a new CompositeImage document
        const newCompositeImage = new CompositeImage({
            composite_ID,
            img_url,
            user: req.user.id // Associate with logged-in user
        });
        await newCompositeImage.save();
 // Update User document to include new CompositeImage reference
        await User.findByIdAndUpdate(
            req.user.id,
            { $push: { compositeImages: newCompositeImage._id } },
            { new: true }
        );

        res.json(newCompositeImage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// GET route to retrieve composite images for authenticated user
router.get('/composite-image', auth, async (req, res) => {
    try {
        // Find the user by ID from the token and populate compositeImages
        const user = await User.findById(req.user.id).populate('compositeImages');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return the user's composite images
        res.json(user.compositeImages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
