const http = require('http');

function handleHttpRequest(clientSocket, endpoint, requestData) {
  // Create an HTTP request with the necessary headers and path
  const requestOptions = {
    host: endpoint.host,
    port: endpoint.port,
    method: 'GET', // This could be more dynamic based on `requestData`
    path: endpoint.path,
    headers: requestData.headers
  };

  // Create a connection to the desired HTTP endpoint
  const req = http.request(requestOptions, (res) => {
    clientSocket.write(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}\r\n`);
    res.headers['proxy-agent'] = 'SOCKS5 Proxy Server';
    Object.keys(res.headers).forEach((key) => {
      clientSocket.write(`${key}: ${res.headers[key]}\r\n`);
    });
    clientSocket.write('\r\n');
    res.pipe(clientSocket); // Pipe the response directly to the client socket
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    clientSocket.end();
  });

  if (requestData.body) {
    req.write(requestData.body);
  }

  req.end();
}

module.exports = handleHttpRequest;