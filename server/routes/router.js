const defaultRoute = require('./defaultRoute');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

const router = {
    '/products': productRoutes.getAllProducts,
    '/product/create': productRoutes.addProduct,
    '/product' : productRoutes.getProductById,
    '/user/create': userRoutes.addUser,
    default: defaultRoute
};

module.exports = router;