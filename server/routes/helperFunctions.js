const fs = require('fs');
const path = require('path');

// helper function that reads from local JSON file
const readData = function(dataFilePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.resolve(__dirname, dataFilePath), 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
        })
    })
};

// helper function that writes to local JSON file
const writeData = function(dataFilePath, data, cb) {
    fs.writeFile(path.resolve(__dirname, dataFilePath), data, 'utf8', cb)
};


module.exports = {
    readDataFromFile: readData,
    writeDataToFile: writeData
};
