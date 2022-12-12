const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Register a User
exports.registerUser = async (req, res, next) => {
    if (req.body.password.length < 8) {
        res.status(500).json("Password Length used 8 or more");
    }
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        const { password, ...userDetails } = savedUser._doc;
        jwt.sign(
            {
                ...userDetails
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" },
            (err, token) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(token);
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
};



exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json("Log In Failed");
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        if (originalPassword !== inputPassword) {
            res.status(401).json("Wrong Password");
            return;
        }

        const { password, ...userDetails } = user._doc;
        const accessToken = jwt.sign(
            {
                ...userDetails
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" },
            (err, token) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(token);
            }
        );
        return;
    } catch (err) {
        res.status(500).json(err);
    }
};


// updateUser
exports.updateUser = async (req, res) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header sent' });
        }
        const { userId } = req.params;
        const newUserData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
        };
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify token' });

            const { _id } = decoded;
            if (_id !== userId) return res.status(403).json({ message: 'Not allowed to update that user\'s data' });
            try {
                const user = await User.findByIdAndUpdate(_id, newUserData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                });
                
            const { password, ...userDetails } = user._doc;

            jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '3d' }, (err, token) => {
                if (err) {
                    return res.status(200).json(err);
                }
                res.status(200).json({ token });
            });
            } catch (err) {
                res.status(500).json(err);
            }

        })
    } catch (err) {
        res.status(500).json(err);
    }
}