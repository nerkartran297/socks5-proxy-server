// src/proxy/server.js
const socks = require('socks');
const ProxyCore = require('../core/proxyCore');

class ProxyServer {
  constructor() {
    this.server = socks.createServer(this.handleConnection.bind(this));
    this.proxyCore = new ProxyCore();
  }

  handleConnection(info, accept, deny) {
    const destination = accept(true);
    this.proxyCore.handleConnection(info, destination);
  }

  start() {
    this.server.listen(1080, 'localhost', () => {
      console.log('SOCKS proxy server listening on port 1080');
    });
  }
}

module.exports = ProxyServer;
