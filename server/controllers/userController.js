const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        // Pull the values from the request
        const { username, email, password } = req.body;

        // Check if the username already exists in the DB
        const username_check = await User.findOne({ username });

        if (username_check) {
            return res.json({
                message: 'Username is already taken.',
                status: false,
            })
        }

        // Check if the email is already in the DB
        const email_check = await User.findOne({ email });

        if (email_check) {
            return res.json({
                message: 'Email is already taken.',
                status: false,
            })
        }

        // Encrypt the password
        const hashed_password = await bcrypt.hash(password, 10).then((hash) => hash);

        // Create the user in the DB
        const user = await User.create({
            username,
            email,
            password: hashed_password,
        });

        // Delete the password from the user object as it is no longer needed
        delete user.password;

        return res.json({
            user,
            status: true,
        });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                message: 'Incorrect Username or Password',
                status: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({
                message: 'Incorrect Username or Password',
                status: false,
            });
        }

        delete user.password;
        
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
}