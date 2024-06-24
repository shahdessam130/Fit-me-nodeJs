const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserImg = require('../models/UserImg');
const User = require('../models/user');

// @route   POST /api/userImg
// @desc    Add an image for a user
// @access  Private
router.post('/', auth, async (req, res) => {
    const { img_id, url } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const newUserImg = new UserImg({
            img_id,
            url,
            user: req.user.id
        });

        const userImg = await newUserImg.save();

        // Add the image reference to the user's images array
        user.images.push(userImg.id);
        await user.save();

        res.json(userImg);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/userImg/:id
// @desc    Get an image by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const userImg = await UserImg.findById(req.params.id);

        if (!userImg) {
            return res.status(404).json({ msg: 'Image not found' });
        }

        res.json(userImg);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/userImg/:id
// @desc    Delete an image by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const userImg = await UserImg.findById(req.params.id);

        if (!userImg) {
            return res.status(404).json({ msg: 'Image not found' });
        }

        // Remove the image reference from the user's images array
        const user = await User.findById(userImg.user);
        user.images = user.images.filter(imgId => imgId.toString() !== req.params.id);
        await user.save();

        await userImg.remove();

        res.json({ msg: 'Image removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;