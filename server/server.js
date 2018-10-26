const http = require('http');
const url = require('url');

const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');

const startServer = port => {

    // console.log('__filename: ', __filename);
    const server = http.createServer((request, response) => {
        // Get route from the request
        const parsedUrl = url.parse(request.url);

        // Get router function
        console.log('pathname=', parsedUrl.pathname);
        const func = parsedUrl.pathname.includes('/product/create')
            ? router["/product/create"]
            : parsedUrl.pathname.includes('/product/')
            ? router["/product"]
            : (router[parsedUrl.pathname] || router.default);

        logger(request, response, () => func(request, response));
    });

    server.listen(port, () => console.log('Server is listening on port', port));
};

module.exports = startServer;