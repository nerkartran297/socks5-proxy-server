const net = require('net');
const { authenticate } = require('../auth/authService');

class ProxyCore {
  constructor() {
    // Initialization if needed
  }

  handleConnection(clientSocket) {
    clientSocket.once('data', (data) => {
      // Perform authentication on the initial data received
      if (authenticate(clientSocket, data)) {
        // If authenticated, proceed with connection
        this.setUpProxy(clientSocket, data);
      }
      // If not authenticated, the handleAuthentication function will close the socket
    });
  }

  setUpProxy(clientSocket, data) {
    // Here you would parse the data to determine the destination address and port
    const { dstAddr, dstPort } = this.parseConnectionData(data);

    // Parse the initial data to extract endpoint and requestData
    const { endpoint, requestData } = this.parseHttpRequest(data);

    if (dstPort === 80) {
      this.handleHttp(clientSocket, endpoint, requestData);
    } else if (dstPort === 443) {
      this.handleHttps(clientSocket, dstAddr, dstPort); // Keep this as is for HTTPS
    } else {
      this.handleDefault(clientSocket, dstAddr, dstPort);
    }
  }

  handleHttp(clientSocket, endpoint, requestData) {
    handleHttpRequest(clientSocket, endpoint, requestData);
  }

  parseHttpRequest(data) {
    // Placeholder for actual HTTP request data parsing logic
    // This should return the endpoint and requestData
    // For the example, let's assume the data is a string in the format "GET /endpoint HTTP/1.1\r\nHost: dstAddr\r\n..."
    const requestLines = data.toString().split('\r\n');
    const requestLine = requestLines[0].split(' '); // "GET /endpoint HTTP/1.1"
    const endpoint = requestLine[1]; // "/endpoint"
    // requestData could be headers + body, here we just pass the entire data
    const requestData = data;

    return { endpoint, requestData };
  }

  parseConnectionData(data) {
    // Placeholder for actual connection data parsing logic
    // This should return the destination address and port
    // For the example, we assume the data is a string like "address:port"
    const [address, port] = data.toString().split(':');
    return { dstAddr: address, dstPort: parseInt(port, 10) };
  }

  handleHttps(clientSocket, dstAddr, dstPort) {
    handleHttpsRequest(clientSocket, endpoint, requestData);
  }

  handleDefault(clientSocket, dstAddr, dstPort) {
    const destinationSocket = net.createConnection({
      host: dstAddr,
      port: dstPort
    }, () => {
      console.log(`Connected to ${dstAddr}:${dstPort}`);
      clientSocket.pipe(destinationSocket);
      destinationSocket.pipe(clientSocket);
    });

    destinationSocket.on('error', (err) => {
      console.log('Destination socket error:', err.message);
      clientSocket.end();
    });

    clientSocket.on('error', (err) => {
      console.log('Client socket error:', err.message);
      destinationSocket.end();
    });

    destinationSocket.on('end', () => {
      console.log('Destination socket ended');
      clientSocket.end();
    });

    clientSocket.on('end', () => {
      console.log('Client socket ended');
      destinationSocket.end();
    });
  }
}

module.exports = ProxyCore;