
const dgram = require('dgram');

module.exports = class client {

    /**
     *
     */
    constructor() {
        this.client = dgram.createSocket('udp4');
        this.callbacks = {};
        this.status = 'connect';

        //
        this.client.on('message', (msg, info) => {
            if (typeof this.callbacks['*'] !== 'undefined') {
                for (var i in this.callbacks['*']) {
                    var callback = this.callbacks['*'][i];
                    callback(msg.toString());
                }
            }
            if (typeof this.callbacks[this.status] !== 'undefined') {
                for (var i in this.callbacks[this.status]) {
                    var callback = this.callbacks[this.status][i];
                    callback(msg.toString());
                }
            }
        });
    }

    /**
     *
     */
    start(host, port) {
        this.host = host;
        this.port = port;
        return this;
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
                return typeof callback === 'function' ? callback(err, bytes) : null;
            }
        );
    }

    /**
     *
     */
    rx(status, callback) {
        if (typeof status === 'function' && typeof callback === 'undefined') {
            callback = status;
            status = '*';
        }
        if (typeof this.callbacks[status] === 'undefined') {
            this.callbacks[status] = [];
        }
        this.callbacks[status].push(callback);
    }
};
