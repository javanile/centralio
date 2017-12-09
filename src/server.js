
const dgram = require('dgram');

module.exports = class server {

    /**
     *
     */
    constructor() {
        this.clients = {};
        this.callbacks = {};
        this.server = dgram.createSocket('udp4');
        this.server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            this.server.close();
        });
        this.server.on('listening', () => {
            var address = this.server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        this.server.on('message', (msg, info) => {
            var client = this.register(info);
            var status = client.status;

            console.log('>', client.id, msg+"");

            if (typeof this.callbacks[status] == "undefined") { return; }

            for (var i in this.callbacks[status]) {
                var callback = this.callbacks[status][i];
                callback(client, msg.toString());
            }
            return this;
            //clients[JSON.stringify([rinfo.address, rinfo.port])] = true;
            //use delete clients[client] to remove from the list of clients
        });

        /*
        function broadCastNew() {
            var message = new Buffer(news[Math.floor(Math.random() * news.length)]);

            for (var client in clients) {
                client = JSON.parse(client);
                var port = client[1];
                var address = client[0];
                server.send(message, 0, message.length, port, address);
            }

            console.log("Sent " + message + " to the wire...");
        }
        */
    }

    /**
     *
     */
    start(port) {
        this.server.bind(port);
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

    register(client) {
        client.id = client.address + ':' + client.port;
        if (typeof this.clients[client.id] === 'undefined') {
            client.status = 'connect';
            client.tx = (data) => {
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
};
