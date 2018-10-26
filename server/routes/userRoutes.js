const fs = require('fs');
const path = require('path');


// ==================== addUser (POST) ========================
module.exports.addUser = (request, response) => {
    // debugger;

    if (request.method === 'POST') {
        let body = '';

        const postedDataHandler = () => {
            // parse request body
            const userObj = JSON.parse(body);

            // generate unique ID
            const id = Date.now();

            // save posted data into <username>.json
            saveUser({...userObj, id}, (err) => {
                if (err)
                    throw err;

                // create response
                const responseJSON =
                    {
                        "status": "success",
                        "user": {
                            "name": userObj['name'],
                            "phone": userObj['phone'],
                            "id": id
                        }
                    };

                response.writeHead(201, {"Content-Type": "application/json"});
                response.write(JSON.stringify(responseJSON));
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


// ==================== saveUser (helper function) ========================
function saveUser (user, cb) {
    try {
        // get user filename
        const dataFilename = user['name'].toLowerCase() + '.json';
        console.log(`Saving to ${dataFilename}...`);

        // get path to users data folder + filename
        const dataFilePath = path.resolve(__dirname, '../data/user', dataFilename);

        // save data
        try {
            fs.writeFile(dataFilePath, JSON.stringify(user), 'utf8', cb);
        } catch (err) {
            throw err;
        }

    } catch (err) {
        throw err;
    }
}

// TODO: getAllUsers, getUserById