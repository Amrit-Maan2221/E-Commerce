const {authRoutes} = require('./auth');
const {contactUsRoutes} = require('./contactUs');
const { paymentRoutes } = require('./payment');
const {productRoutes} = require('./product');

const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: [(req, res, next) => {
       console.log("First Handler")
        next();
    }, (req, res) => {
        res.status(200).send('Next Handler also works!');
    }]
};


module.exports = [
    ...authRoutes,
    ...contactUsRoutes,
    ...paymentRoutes,
     ...productRoutes,
     testRoute
];
