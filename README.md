# Centralio

## Get Starded
If you want use Centralio simply add dependency into your project
```
$ npm install centralio
```

## Your first server
```javascript
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

## Your first client
```javascript
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
