const {port} = require('./config/config');
const startServer = require('./src/server');

startServer(port);