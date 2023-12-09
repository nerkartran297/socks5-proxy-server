const { getUser } = require('./userStore');

function authenticate(username, password) {
  // Retrieve the user's expected password from the store
  const user = getUser(username);

  if (!user) {
    return false; // User not found
  }

  // In a production system, use a secure password hashing mechanism like bcrypt
  // This example performs a plain text comparison, which is not secure
  return user.password === password;
}

module.exports = { authenticate };