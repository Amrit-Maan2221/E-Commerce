const { catchAsyncErrors } = require("../util/error handling/catchAsyncErrors");
const ErrorHander = require("../util/error handling/Error Handler");
const { sendEmail } = require("../util/sendEmail");

exports.contactUsController =  catchAsyncErrors(async (req, res, next) => {
        const {username, email, userMessage} = req.body;
        if(!email || !userMessage || !username){
            return next(new ErrorHander("Unable to process your process", 401));
        }

    await sendEmail({
        to: process.env.EMAIL_FROM,
        from: process.env.EMAIL_FROM,
        subject: 'Someone Tried to Contact You',
        text: ` The information provided by the user is as follows:\n
                User Name: ${username} \n
                Email: ${email}\n
                Message: ${userMessage} \n
        `
    });

    res.sendStatus(200);
});