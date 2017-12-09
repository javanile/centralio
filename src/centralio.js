
const server = require('./server');
const clinet = require('./client');

module.exports = {

    server: function () {
        return new server();
    },

    client: function () {
        return new client();
    }
};