const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require('uuid');
const { sendEmail } = require('../util/sendEmail');
const sendToken = require("../util/jwtVerify");
const { FRONTEND_URL } = require("../util/constants");
const ErrorHander = require("../util/error handling/Error Handler");
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");



// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    if (req.body.password.length < 8) {
        return next(new ErrorHander("Password Length used 8 or more", 400));
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
    const savedUser = await newUser.save();
    try {
        await sendEmail({
            to: savedUser.email,
            from: process.env.EMAIL_FROM,
            subject: 'Please verify your email',
            text: `
                Thanks for signing up! To verify your email, click here:
                ${FRONTEND_URL}/verify-email/${savedUser.verificationString}
            `,
        });
    } catch (err) {
        next(new ErrorHander());
    }


    const { password, verificationString, ...userDetails } = savedUser._doc;
    sendToken(userDetails, 200, res);

});



exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        next(new ErrorHander("Log In Failed", 401));
        return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SECRET
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword) {
        next(new ErrorHander("Log In Failed", 401));
        return;
    }

    const { password, ...userDetails } = user._doc;
    sendToken(userDetails, 200, res);

});


// updateUser
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new ErrorHander("Unable to process your process", 401));
    }
    const { userId } = req.params;
    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username
    };
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return next(new ErrorHander("Unable to update your details", 401));

        const { _id, isVerified } = decoded;
        console.log(!isVerified)
        if (_id !== userId) return res.status(403).json({ message: 'Not allowed to update that user\'s data' });
        if (!isVerified) {
            return next(new ErrorHander("Please Verify your email", 403));
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
            next(new ErrorHander());
        }

    })

});


// Verify Email
exports.verifyEmailController =  catchAsyncErrors(async (req, res, next) => {
    if (!req.body.verificationString) {
        return next(new ErrorHander("The verification code cannot be found", 401));
    }
        const result = await User.findOne({
            verificationString: req.body.verificationString
        });
        if (!result) return next(new ErrorHander("Unable to verify Verification code", 401));

        await User.updateOne({ _id: result._id }, {
            $set: { isVerified: true }
        });
        const { password, verificationString, ...userDetails } = result._doc;
        userDetails.isVerified = true;
        sendToken(userDetails, 200, res);
});



exports.sendResetPasswordLinkController =  catchAsyncErrors(async (req, res, next) => {
    const { email } = req.params;
    const passwordResetCode = uuid();
        const result = await User.updateOne({ email }, { $set: { passwordResetCode } });
        if (result.modifiedCount > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: process.env.EMAIL_FROM,
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        ${FRONTEND_URL}/reset-password/${passwordResetCode}
                    `
                });
            } catch (e) {
                next(new ErrorHander());
            }
        }

        res.sendStatus(200);
});






exports.resetPasswordController =  catchAsyncErrors(async (req, res, next) => {
    const { passwordResetCode } = req.params;
    if (!req.body.newPassword) {
        return next(new ErrorHander("Please provide your new passsword", 401));
    }

    const isUserPresent = await User.findOne({
        passwordResetCode
    });
    if (!isUserPresent) return next(new ErrorHander("Please make sure your passsword link matches as sent in email", 401));

    const newPasswordHash = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SECRET
    ).toString();

    const result = await User.updateOne({ passwordResetCode }, {
        $set: { password: newPasswordHash },
        $unset: { passwordResetCode: '' },
    });

    if (result.modifiedCount == 0) return res.sendStatus(404);

    res.sendStatus(200);
});


