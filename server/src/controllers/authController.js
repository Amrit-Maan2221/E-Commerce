const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require('uuid');
const { sendEmail } = require('../util/sendEmail');
const sendToken = require("../util/jwtVerify");
const ErrorHandler = require("../util/error handling/Error Handler");
const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");



// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    if (req.body.password.length < 8) {
        return next(new ErrorHandler("Password Length used 8 or more", 400));
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
                ${process.env.FRONTEND_URL}/verify-email/${savedUser.verificationString}
            `,
        });
    } catch (err) {
        next(new ErrorHandler());
    }


    const { password, verificationString, ...userDetails } = savedUser._doc;
    sendToken(userDetails, 200, res);

});


// login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        next(new ErrorHandler("Log In Failed", 401));
        return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SECRET
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword) {
        next(new ErrorHandler("Log In Failed", 401));
        return;
    }

    const { password, ...userDetails } = user._doc;
    sendToken(userDetails, 200, res);

});


// updateUser
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new ErrorHandler("Unable to process your process", 401));
    }
    const { userId } = req.params;
    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username
    };
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return next(new ErrorHandler("Unable to update your details", 401));

        const { user } = decoded;
        const { _id, isVerified } = user;
        console.log(!isVerified)
        if (_id !== userId) return res.status(403).json({ message: 'Not allowed to update that user\'s data' });
        if (!isVerified) {
            return next(new ErrorHandler("Please Verify your email", 403));
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
            next(new ErrorHandler());
        }

    })

});


// Verify Email
exports.verifyEmailController = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.verificationString) {
        return next(new ErrorHandler("The verification code cannot be found", 401));
    }
    const result = await User.findOne({
        verificationString: req.body.verificationString
    });
    if (!result) return next(new ErrorHandler("Unable to verify Verification code", 401));

    await User.updateOne({ _id: result._id }, {
        $set: { isVerified: true }
    });
    const { password, verificationString, ...userDetails } = result._doc;
    userDetails.isVerified = true;
    sendToken(userDetails, 200, res);
});


// send reset password
exports.sendResetPasswordLinkController = catchAsyncErrors(async (req, res, next) => {
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
                        ${process.env.FRONTEND_URL}}/reset-password/${passwordResetCode}
                    `
            });
        } catch (e) {
            next(new ErrorHandler());
        }
    }

    res.sendStatus(200);
});





// reset password
exports.resetPasswordController = catchAsyncErrors(async (req, res, next) => {
    const { passwordResetCode } = req.params;
    if (!req.body.newPassword) {
        return next(new ErrorHandler("Please provide your new passsword", 401));
    }

    const isUserPresent = await User.findOne({
        passwordResetCode
    });
    if (!isUserPresent) return next(new ErrorHandler("Please make sure your passsword link matches as sent in email", 401));

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



//GET ALL USER
exports.getAllUserController = catchAsyncErrors(async (req, res) => {
    const query = req.query.new;
    const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
    res.status(200).json(users);
});




//GET USER STATS
exports.getUserStatsController = catchAsyncErrors(async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);
    res.status(200).json(data)
});



