const net = require('net');

for (let i = 0; i < 10; i++) {
    const client = net.createConnection({ port: 8124 }, () => {
        console.log('connected to server!');
        client.write(
            JSON.stringify({
                username: 'test',
                entry: 'Hallo ich nin ein Test Eintrag',
            })
        );
    });

    client.on('data', async (data) => {
        console.log(data.toString());
        await sleep(2000);
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
