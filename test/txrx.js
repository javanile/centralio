'use strict';

const centralio = require('../src/centralio');
const chai = require('chai');

chai.use(require('chai-fs'));

describe('Testing TX/RX:', function () {

    it('Simple TX/RX', function (done) {
        const server = centralio.server().start('127.0.0.1', '44044');
        const client = centralio.client().start('127.0.0.1', '44044');

        server.rx(function(client, msg) {
            chai.assert.match(msg, /hello/);
            client.tx('welcome');
        });

        client.rx(function(msg) {
            chai.assert.match(msg, /welcome/);
            server.close();
            client.close();
            done();
        });

        client.tx('hello');
    });

});