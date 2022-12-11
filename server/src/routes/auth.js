const {registerUser, loginUser} = require("../controllers/authController");


//REGISTER
exports.signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: registerUser
}



exports.logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: loginUser
}