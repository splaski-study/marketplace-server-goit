const {port} = require('./server/config/config');
const startServer = require('./server/server');

startServer(port);