/*!
 * Centralio
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

const dgram = require('dgram');
const utility = require('./utility');

module.exports = class client {

    /**
     *
     */
    constructor() {
        this.client = dgram.createSocket('udp4');
        this.callbacks = {};
        this.state = 'connect';

        //
        this.client.on('message', (msg, info) => {
            if (typeof this.callbacks['*'] !== 'undefined') {
                for (var i in this.callbacks['*']) {
                    var callback = this.callbacks['*'][i];
                    callback(msg.toString());
                }
            }
            if (typeof this.callbacks[this.state] !== 'undefined') {
                for (var i in this.callbacks[this.state]) {
                    var callback = this.callbacks[this.state][i];
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
    close() {
        this.client.close();
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
    rx(state, callback) {
        utility.registerStateCallback(this.callbacks, state, callback);
    }
};
