const {authRoutes} = require('./auth');
const {contactUsRoutes} = require('./contactUs');

const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send('It works!');
    },
};

module.exports = [
    ...authRoutes,...contactUsRoutes,testRoute
];
