const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require('uuid');
const { sendEmail } = require('../util/sendEmail');
const sendToken = require("../util/jwtVerify");
const { clientServerdomain } = require("../util/client");

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
        verificationString: uuid(),
        passwordResetCode: ''
    });



    try {
        const savedUser = await newUser.save();
        try {
            await sendEmail({
                to: savedUser.email,
                from: 'commerce.aplus@gmail.com',
                subject: 'Please verify your email',
                text: `
                    Thanks for signing up! To verify your email, click here:
                    ${clientServerdomain}/verify-email/${savedUser.verificationString}
                `,
            });
        } catch (e) {
            res.sendStatus(500).json("We have registered your account. Howeverm we were unable to send a mail on your email to verify you");
        }


        const { password, verificationString, ...userDetails } = savedUser._doc;
        sendToken(userDetails, 200, res);
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
        sendToken(userDetails, 200, res);
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

            const { _id, isVerified } = decoded;
            console.log(!isVerified)
            if (_id !== userId) return res.status(403).json({ message: 'Not allowed to update that user\'s data' });
            if (!isVerified) {
                return res.status(403).json({ message: 'Please Verify your email' });
            }
            try {
                const user = await User.findByIdAndUpdate(_id, newUserData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                });

                const { password, ...userDetails } = user._doc;
                sendToken(userDetails, 200, res);
            } catch (err) {
                res.status(500).json(err);
            }

        })
    } catch (err) {
        res.status(500).json(err);
    }
}


// Verify Email
exports.verifyEmailController = async (req, res) => {
    if (!req.body.verificationString) {
        return res.status(401).json({ message: 'The verification code cannot be found' });
    }
    try {
        const result = await User.findOne({
            verificationString: req.body.verificationString
        });
        if (!result) return res.status(401).json({ message: 'Unable to verify Verification code' });

        await User.updateOne({ _id: result._id }, {
            $set: { isVerified: true }
        });
        const { password, verificationString, ...userDetails } = result._doc;
        userDetails.isVerified = true;
        sendToken(userDetails, 200, res);
    }
    catch (err) {

        res.status(500).json(err);
    }
}



exports.sendResetPasswordLinkController = async (req, res) => {
    const { email } = req.params;
    const passwordResetCode = uuid();
    try {
        const result = await User.updateOne({ email }, { $set: { passwordResetCode } });
        if (result.modifiedCount > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'commerce.aplus@gmail.com',
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        ${clientServerdomain}/reset-password/${passwordResetCode}
                    `
                });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}






exports.resetPasswordController = async (req, res) => {
    const { passwordResetCode } = req.params;
    if (!req.body.newPassword) return res.status(403).json({ message: 'Please provide your new passsword' });
    const isUserPresent = await User.findOne({
        passwordResetCode
    });
    if (!isUserPresent) return res.status(401).json({ message: 'Please make sure your passsword link matches as sent in email' });
    console.log(req.body.newPassword.toString())
    const newPasswordHash = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SECRET
    ).toString();
    const result = await User.updateOne({ passwordResetCode }, {
        $set: { password: newPasswordHash },
        $unset: { passwordResetCode: '' },
    });
    console.log(result);
    if (result.modifiedCount == 0) return res.sendStatus(404);

    res.sendStatus(200);
}


