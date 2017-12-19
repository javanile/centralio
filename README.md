# centralino

## Get Starded
```
npm install centralio
```

## Your first server
```javascript
const server = require('centralio').server();

server.start('127.0.0.1', '44044');

server.rx('connect', (client, msg) => {
  console.log('Message from client:', client.id, msg);  
  client.tx('Thanks from your access.');
});
```

## Your first client
```javascript
const client = require('centralio').client();

client.start('127.0.0.1', '44044');

client.tx('Hi my server!', (err, msg) => {
  console.log('Message from:', client.id, msg);    
});

client.rx('connect', (err, msg) => {
  console.log('Message from server:', client.id, msg);    
});
```
