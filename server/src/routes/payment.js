const { paymentController } = require("../controllers/paymentController")


const stripePaymentRoute = {
    path: '/api/stripe/payment',
    method: 'post',
    handler: paymentController
}



exports.paymentRoutes = [stripePaymentRoute]