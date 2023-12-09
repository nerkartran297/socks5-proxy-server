const https = require('https');

function handleHttpsRequest(clientSocket, endpoint, requestData) {
  // HTTPS requests are similar to HTTP but require TLS/SSL
  const requestOptions = {
    host: endpoint.host,
    port: endpoint.port,
    method: requestData.method,
    path: endpoint.path,
    headers: requestData.headers,
    rejectUnauthorized: false // This allows self-signed certificates
  };

  const req = https.request(requestOptions, (res) => {
    clientSocket.write(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}\r\n`);
    res.headers['proxy-agent'] = 'SOCKS5 Proxy Server';
    Object.keys(res.headers).forEach((key) => {
      clientSocket.write(`${key}: ${res.headers[key]}\r\n`);
    });
    clientSocket.write('\r\n');
    res.pipe(clientSocket);
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

module.exports = handleHttpsRequest;