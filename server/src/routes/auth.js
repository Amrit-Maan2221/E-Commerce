const {registerUser} = require("../controllers/authController");


//REGISTER
exports.signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: registerUser
}