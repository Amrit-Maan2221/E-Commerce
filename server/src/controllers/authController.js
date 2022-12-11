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
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        jwt.sign(
			{
				id: savedUser._id,
				isAdmin: savedUser.isAdmin,
			},
			process.env.JWT_SEC,
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
			process.env.PASS_SEC
		);

		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

		const inputPassword = req.body.password;

		if (originalPassword !== inputPassword) {
			res.status(401).json("Wrong Password");
			return;
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
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