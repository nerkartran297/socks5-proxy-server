const net = require('net');

function handleFtpRequest(clientSocket, endpoint) {
  // Connect to the FTP server
  const serverSocket = net.createConnection(endpoint.port, endpoint.host, () => {
    clientSocket.pipe(serverSocket);
    serverSocket.pipe(clientSocket);
  });

  serverSocket.on('error', (err) => {
    console.error('Server connection error:', err);
    clientSocket.end();
  });

  clientSocket.on('error', (err) => {
    console.error('Client connection error:', err);
    serverSocket.end();
  });
}

module.exports = handleFtpRequest;