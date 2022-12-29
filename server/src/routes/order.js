const { createOrderController } = require("../controllers/orderController")





const createOrderRoute = {
    path: '/api/orders/create',
    method: 'post',
    handler: createOrderController
}



exports.orderRoutes = [createOrderRoute]