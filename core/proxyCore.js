// src/core/proxyCore.js
class ProxyCore {
    handleConnection(info, destination) {
      console.log(`Connection request to ${info.dstAddr}:${info.dstPort}`);
  
      // Your logic for handling different protocols here
      // Example: You can check the protocol and call specific handler
      if (info.dstPort === 80) {
        // HTTP protocol
        // Implement your HTTP handler logic
      } else if (info.dstPort === 443) {
        // HTTPS protocol
        // Implement your HTTPS handler logic
      } else {
        // Default handler
        // Implement default protocol handler logic
      }
  
      destination.on('data', (data) => {
        console.log('Data from client:', data.toString());
      });
  
      destination.on('data', (data) => {
        console.log('Data from destination:', data.toString());
        info.socket.write(data);
      });
  
      destination.on('end', () => {
        console.log('Connection closed');
      });
    }
  }
  
  module.exports = ProxyCore;
  