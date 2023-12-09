const net = require('net');
const { handleSocksConnection } = require('./src/proxy/server');

const PORT = 1080; // Default SOCKS proxy port

const server = net.createServer();
server.on('connection', handleSocksConnection);

server.listen(PORT, () => {
  console.log(`SOCKS proxy server started on port ${PORT}`);
});