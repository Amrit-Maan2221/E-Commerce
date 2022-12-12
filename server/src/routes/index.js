const {signUpRoute, logInRoute, updateUserInfoRoute} = require('./auth');

const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send('It works!');
    },
};

module.exports = [
    signUpRoute, logInRoute, updateUserInfoRoute, testRoute
];
