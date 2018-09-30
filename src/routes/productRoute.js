const fs = require('fs');
const path = require('path');
const url = require('url');

const productRoute = (request, response) => {
    const dataFile = path.join(__dirname, '../product', 'all-products.json');
    // const parsedUrl = url.parse(request.url);
    const id = request.url.split('/').pop().trim();

    // no user ID
    if (id === '' || id === 'product') {
        response.writeHead(418, {'Content-Type': 'text/html'});
        response.write('Product ID is not specified');
        response.end();
        return;
    }

    debugger;

    try {
        fs.readFile(dataFile, 'utf-8', function(err, data) {
            // look up a record by id
            const products = JSON.parse(data);

            debugger;

            const prodLookup = products.find(prod => prod.id.toString() === id);
            if (!prodLookup) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.write(`Product with ${id} not found`);
                response.end();
                return;
            }

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(prodLookup));
            response.end();
        })
    } catch(err) {
        throw new Error('Error reading data from ' + dataFile);
    }

};

module.exports = productRoute;