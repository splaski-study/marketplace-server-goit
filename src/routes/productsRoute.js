const fs = require('fs');
const path = require('path');

const productsRoute = (request, response) => {
    const dataFile = path.join(__dirname, '../product', 'all-products.json');

    // debugger;

    fs.readFile(dataFile, function(err, data) {
        if (err)
            throw new Error('Error reading data from ' + dataFile);
        else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(data);
            response.end();
        }
    })
};

module.exports = productsRoute;