# Centralio
Centralio is a library for creating applications with many clients and a central server based on the UDP protocol.

[![Build Status](https://travis-ci.org/javanile-bot/centralio.svg?branch=master)](https://travis-ci.org/javanile-bot/centralio)
[![Maintainability](https://api.codeclimate.com/v1/badges/1501d777dd5519cf7d2e/maintainability)](https://codeclimate.com/github/javanile-bot/centralio/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1501d777dd5519cf7d2e/test_coverage)](https://codeclimate.com/github/javanile-bot/centralio/test_coverage)

## Get Starded
If you want use Centralio simply add dependency into your project
```
$ npm install centralio
```

### Your first server
```javascript
// file: server.js
// exec: node server
const server = require('centralio').server();

// Start your server 
server.start('127.0.0.1', '44044');

// Handle received messages from client
server.rx(function(client, msg) {
  console.log('Message from client:', client.id, msg);  
  // Respond to client
  client.tx('Thanks from your message.');
});
```

### Your first client
```javascript
// file: client.js
// exec: node client
const client = require('centralio').client();

// Start your client
client.start('127.0.0.1', '44044');

// Handle received message from server
client.rx(function(msg) {
  console.log('Message from server:', msg);    
});

// Send message to server
client.tx('Hi my server!');
```

## Manage client state
![Centralio Client/Server sample architecture](http://www.plantuml.com/plantuml/png/ROyn2uCm48Nt_8h3tS74GWsbIrsw5Ketbv3SbO2S46FpzqjZ5H7Nzpw-TyU3GoYU63uOuDK-Ehxr7Zb2fS4Ep6ZZ6aaD0r7l6TT8QKZ6Hy_l0im8O_O8mTcwc3g-jnhgvZmHraq6RQwg7IbdKfARY19jIBaZrTyP4fdHdJQa4cA-0YvbULs6GF-UgmygUP0fyGK0)
