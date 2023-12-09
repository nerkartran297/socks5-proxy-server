const { getUser } = require('./userStore');

function authenticate(username, password) {
  const user = getUser(username);
  return user && user.password === password;
}

module.exports = { authenticate };