const {authRoutes} = require('./auth');
const {contactUsRoutes} = require('./contactUs');
const {productRoutes} = require('./product');

const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: [(req, res, next) => {
        res.status(200).send('It works!');
        next();
    }, (req, res) => {
        res.status(200).send('Next Handler also works!');
    }]
};


module.exports = [
    ...authRoutes,...contactUsRoutes,
     ...productRoutes,testRoute
];
