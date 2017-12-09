
const dgram = require('dgram');

module.exports = const server = function () {
    this.server = dgram.createSocket('udp4');
    this.server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        this.server.close();
    });
};

server.prototypes.start = function (port) {
    this.server.bind(port);
}