/*!
 * Centralio
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

const server = require('./server');
const client = require('./client');

module.exports = {

    /**
     *
     * @returns {*}
     */
    server: function () {
        return new server();
    },

    /**
     *
     * @returns {*}
     */
    client: function () {
        return new client();
    }
};
