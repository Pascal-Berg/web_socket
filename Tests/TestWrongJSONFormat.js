const net = require('net');

const client = net.createConnection({ port: 8124 }, () => {
    //no Username
    client.write(
        JSON.stringify({
            entry: 'Hallo ich bin ein Test Eintrag',
        }) + '\n'
    );

    //no Password
    client.write(
        JSON.stringify({
            username: 'test',
        }) + '\n'
    );

    //username too long
    client.write(
        JSON.stringify({
            username:
                'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
            entry: 'Hallo ich bin ein Test Eintrag',
        }) + '\n'
    );

    //entry too long
    client.write(
        JSON.stringify({
            username: 'test',
            entry: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
        }) + '\n'
    );

    sleep(5000).then(function () {
        client.end();
    });
});

client.on('data', async (data) => {
    console.log(data.toString());
});

client.on('end', () => {});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
