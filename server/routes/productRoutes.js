const readDataFromFile = require('./helperFunctions').readDataFromFile;
const writeDataToFile = require('./helperFunctions').writeDataToFile;

// ==================== getAllProducts ========================
module.exports.getAllProducts = (request, response) => {
    readDataFromFile('../data/product/all-products.json')
        .then(data => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(data);
            response.end();
        })
        .catch(err => {
            console.log(err);
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.write('Error reading data file. ' + err);
            response.end();
        })
};


// ==================== getProductById ========================
module.exports.getProductById = (request, response) => {
    // const parsedUrl = url.parse(request.url);

    const id = request.url.split('/').pop().trim();
    // Bad Request error if no user ID
    if (id === '' || id === 'product') {
        response.writeHead(401, {'Content-Type': 'text/html'});
        response.write('Product ID is not specified');
        response.end();
        return;
    }

    // debugger;

    readDataFromFile('../data/product/all-products.json')
        .then(data => {
            // look up a record by id
            const products = JSON.parse(data);
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
        .catch(err => {
            console.log(err);
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.write('Error reading data file. ' + err);
            response.end();
        })
};


// ==================== addProduct (POST) ========================
module.exports.addProduct = (request, response) => {
    // debugger;

    if (request.method === 'POST') {
        let body = '';

        const postedDataHandler = () => {
            // parse request body
            const productObj = JSON.parse(body);

            // generate unique ID
            const id = Date.now();

            // save posted data to products file
            writeProductToFile({id, ...productObj}, function(err) {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.write(err);
                    response.end();
                    throw err;
                }

                // create response
                response.writeHead(201, {"Content-Type": "application/json"});
                response.write(JSON.stringify(
                    {
                        "status": "success",
                        product: {
                            "name": productObj.name,
                            "description": productObj.description,
                            "price": productObj.price,
                            "currency": productObj.currency,
                            "categories": productObj.categories,
                        }
                    }
                ));
                response.end();
            })
        };

        // handle requests
        request
            .on('data', (chunk) => {
                body += chunk;
                // console.log('Incoming data: ', chunk);
            })
            .on('end', postedDataHandler);

    } else {
        throw new Error(400, 'Non-POST request');
    }
};

// ==================== saveProduct (helper function) ========================
function writeProductToFile (product, cb) {
    // if no product object then return bad request
    if (!product || Object.keys(product).length === 0) {
        throw new Error(401, 'No product object supplied');
    }

    // get all products from the data file
    readDataFromFile('../data/product/all-products.json')
        .then(data => [...JSON.parse(data), product]) // append the new product in the array
        .then(data => writeDataToFile('../data/product/all-products.json', JSON.stringify(data), cb))
        .catch(err => {throw err})
}