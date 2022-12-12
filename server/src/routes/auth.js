const {registerUser, loginUser, updateUser} = require("../controllers/authController");


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

