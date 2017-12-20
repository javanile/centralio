/*!
 *
 */

const md5 = require('md5');
const dgram = require('dgram');
const utility = require('./utility');

module.exports = class server {

    /**
     *
     */
    constructor() {
        this.clients = {};
        this.callbacks = {};
        this.server = dgram.createSocket('udp4');

        //
        this.server.on('error', (err) => {
            console.log('Centralio (ERROR):', err);
        });

        //
        this.server.on('listening', () => {
            var address = this.server.address();
            //console.log(`server listening ${address.address}:${address.port}`);
        });

        //
        this.server.on('message', (msg, info) => {
            let client = this.register(info);

            //
            if (typeof this.callbacks['*'] !== 'undefined') {
                for (var i in this.callbacks['*']) {
                    var callback = this.callbacks['*'][i];
                    callback(client, msg.toString());
                }
            }

            //
            if (typeof this.callbacks[client.state] !== 'undefined') {
                for (var i in this.callbacks[client.state]) {
                    var callback = this.callbacks[client.state][i];
                    callback(client, msg.toString());
                }
            }
        });
    }

    /**
     *
     */
    start(host, port) {
        if (typeof port === 'undefined') {
            port = host;
            host = '127.0.0.1';
        }
        this.server.bind(port);
        return this;
    }

    /**
     *
     */
    close() {
        this.server.close();
    }

    /**
     *
     */
    rx(state, callback) {
        utility.registerStateCallback(this.callbacks, state, callback);
    }

    /**
     *
     * @param client
     * @returns {*}
     */
    register(client) {
        client.id = md5(client.address + ':' + client.port);

        if (typeof this.clients[client.id] === 'undefined') {
            client.state = 'connect';
            client.newly = true;
            client.tx = (data, callback) => {
                this.server.send(data, 0, data.length, client.port, client.host, (err) => {
                    if (err) {
                        console.log('respond to client error', err);
                    }
                });
            }
            this.clients[client.id] = client;
        }

        return this.clients[client.id];
    }
}
