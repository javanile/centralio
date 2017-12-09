
const dgram = require('dgram');

module.exports = class client {

    /**
     *
     */
    constructor() {
        this.client = dgram.createSocket('udp4');
        this.callbacks = {};
        this.status = 'connect';
        this.client.on('message', (msg, info) => {
            if (typeof this.callbacks[this.status] == "undefined") { return; }
            for (var i in this.callbacks[this.status]) {
                var callback = this.callbacks[this.status][i];
                callback(msg.toString());
            }
            return this;
        });
    }

    /**
     *
     */
    start(host, port) {
        this.host = host;
        this.port = port;
    }

    /**
     *
     */
    tx(msg, callback) {
        this.client.send(
            msg,
            0,
            msg.length,
            this.port,
            this.host,
            (err, bytes) => {
                return callback(err, bytes);
            }
        );
    }

    /**
     *
     */
    rx(status, callback) {
        if (typeof this.callbacks[status] === 'undefined') {
            this.callbacks[status] = [];
        }
        this.callbacks[status].push(callback);
    }
};
