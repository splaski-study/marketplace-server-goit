const defaultRoute = require('./defaultRoute');
const productsRoute = require('./productsRoute');
const productRoute = require('./productRoute');
const userCreateRoute = require('./userCreateRoute');

const router = {
    '/products': productsRoute,
    '/product' : productRoute,
    '/user/create': userCreateRoute,
    default: defaultRoute
};

module.exports = router;