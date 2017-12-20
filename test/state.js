'use strict';

const centralio = require('../src/centralio');
const chai = require('chai');

chai.use(require('chai-fs'));

describe('Testing state:', function () {

    it('Server-side state', function (done) {
        const server = centralio.server().start('127.0.0.1', '44044');
        const client = centralio.client().start('127.0.0.1', '44044');

        server.rx(function(client, msg) {
            if (client.newly) {
                chai.assert.match(msg, /hello/);
                client.state = 'active';
                client.newly = false;
                client.tx('welcome');
            }
        });

        server.rx('active', function(client, msg) {
            chai.assert.match(msg, /hello/);
            client.tx('kickoff');
        });

        client.rx(function(msg) {
            if (msg === 'welcome') {
                client.tx('hello');
            }
            if (msg === 'kickoff') {
                server.close();
                client.close();
                done();
            }
        });

        client.tx('hello');
    });

});