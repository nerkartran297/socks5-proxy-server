const net = require('net');
const ProxyCore = require('./core/proxyCore');

const proxy = new ProxyCore();
const server = net.createServer();

server.on('connection', (socket) => {
  console.log('Client connected');
  proxy.handleConnection(socket);
});

const PORT = 8888; // The port your proxy server listens on
const HOST = 'localhost';
server.listen(PORT, HOST, () => {
  console.log(`Proxy server listening on port ${HOST}:${PORT}`);
});