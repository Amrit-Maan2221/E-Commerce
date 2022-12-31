const { getAllProducts, createProduct, deleteProductController, updateProductController } = require("../controllers/productController");
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


// Delete product - Admin
const deleteProductRoute = {
    path: '/api/product/delete/:id',
    method: 'delete',
    handler: deleteProductController
}

// Update product - Admin
const updateProductRoute = {
    path: '/api/product/update/:id',
    method: 'put',
    handler: updateProductController
}



exports.productRoutes = [getAllProductRoute, createProductRoute, deleteProductRoute, updateProductRoute]