const UserModel = require('../models/users');

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;  // Extracted from JWT
        const user = await UserModel.findById(userId).select('-password -__v'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true }).select('-password -__v');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', success: false });
    }
};

module.exports = { getProfile, updateProfile };