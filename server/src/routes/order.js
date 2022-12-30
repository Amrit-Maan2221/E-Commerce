const { createOrderController, getMonthlyIncomeController, getAllOrdersController } = require("../controllers/orderController")





const createOrderRoute = {
    path: '/api/orders/create',
    method: 'post',
    handler: createOrderController
}


const getAllOrdersRoute = {
    path: '/api/orders',
    method: 'get',
    handler: getAllOrdersController
}


const getMonthlyIncomeRoute = {
    path: '/api/orders/income',
    method: 'get',
    handler: getMonthlyIncomeController
}



exports.orderRoutes = [createOrderRoute, getMonthlyIncomeRoute, getAllOrdersRoute]