const {registerUser, loginUser, updateUser, verifyEmailController, sendResetPasswordLinkController} = require("../controllers/authController");


//REGISTER
exports.signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: registerUser
}


// Login
exports.logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: loginUser
}


// Update User Info
exports.updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: updateUser 
}


// Verify Email Route
exports.verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: verifyEmailController
}



// Password Reset Route
exports.forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: sendResetPasswordLinkController
}
