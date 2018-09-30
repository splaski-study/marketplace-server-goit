const defaultRoute = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello!</h1>");
    response.end();
};

module.exports = defaultRoute;