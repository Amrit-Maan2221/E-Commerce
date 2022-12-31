const {registerUser, loginUser, updateUser, verifyEmailController, sendResetPasswordLinkController, resetPasswordController, getUserStatsController, getAllUserController, deleteUserController} = require("../controllers/authController");


//REGISTER
const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: registerUser
}


// Login
const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: loginUser
}


// Update User Info
const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: updateUser 
}


// Verify Email Route
const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: verifyEmailController
}



// Send reset Password email
const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: sendResetPasswordLinkController
}


// Reset the users password
const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: resetPasswordController
}


const userStatsRoute = {
    path: '/api/users/stats',
    method: 'get',
    handler: getUserStatsController
}


const getAllUsersRoute = {
    path: '/api/users',
    method: 'get',
    handler: getAllUserController
}


const deleteUserRoute = {
    path: '/api/users/delete/:id',
    method: 'delete',
    handler: deleteUserController
}





exports.authRoutes = [signUpRoute, logInRoute, updateUserInfoRoute, verifyEmailRoute, forgotPasswordRoute, deleteUserRoute,getAllUsersRoute, userStatsRoute, resetPasswordRoute]