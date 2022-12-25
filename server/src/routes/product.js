const { getAllProducts, createProduct } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");



// Get all products
const getAllProductRoute = {
    path: '/api/product/products',
    method: 'get',
    handler: getAllProducts
}

// Create product - Admin
const createProductRoute = {
    path: '/api/product/create',
    method: 'post',
    handler: [isAuthenticatedUser, createProduct]
}



exports.productRoutes = [getAllProductRoute, createProductRoute]