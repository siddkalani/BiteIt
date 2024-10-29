const User = require('../../models/userModel')

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId, 'name email phone'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getUserDetails