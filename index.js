const net = require('net');
const db = require('./database');
const uuid = require('uuid');
const validator = require('./database/validator');
require('dotenv').config();

db.createDB();

const connectedSockets = new Set();

broadcast = function (data) {
    for (let socket of connectedSockets) {
        socket.write(JSON.stringify(data));
    }
};

const server = net.createServer(function (socket) {
    socket.id = connectedSockets.size + uuid.v4();
    console.log(
        'Client connected with ID: %s. \nTheir are %s connected Clients now.',
        socket.id,
        connectedSockets.size + 1
    );
    connectedSockets.add(socket);

    socket.setTimeout(300000); //5 min

    socket.on('data', handleData);
    socket.on('error', handleError);
    socket.on('end', handleEnd);
    socket.on('timeout', handleTimeout);

    function handleData(buffer) {
        let dataSet = buffer.toString().split('\n');
        for (const data of dataSet) {
            if (data) {
                validator
                    .validateEntry(data)
                    .then(function (json) {
                        db.create(json)
                            .then(function () {
                                db.read().then(function (data) {
                                    broadcast(data);
                                });
                            })
                            .catch(function (err) {
                                console.error('err: ' + err);
                                socket.write(err);
                            });
                    })
                    .catch(function (err) {
                        console.error('err: ' + err);
                        socket.write(JSON.stringify(err));
                    });
            }
        }
    }

    function handleError(err) {
        console.error(`client with ID: ${socket.id} threw an error.`);
        console.error(err);
        handleEnd();
    }

    function handleEnd() {
        console.log(`client with ID: ${socket.id} disconnected.`);
        connectedSockets.delete(socket);
        socket.end();
    }

    function handleTimeout() {
        console.log(`client with ID: ${socket.id} timed out.`);
        console.log('socket timeout');
        handleEnd();
    }
});

server.on('error', function (err) {
    console.log(err);
});

server.listen(process.env.SERVER_PORT, function () {
    console.log('Server listening on Port: ' + process.env.SERVER_PORT);
});
