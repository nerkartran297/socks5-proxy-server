// This should be replaced with a proper database in production
const users = {
    // Username: Password (WARNING: Never store passwords in plaintext in production)
    'user1': { password: 'password1' },
    'user2': { password: 'password2' },
    // Add more users as needed
  };
  
  function getUser(username) {
    // In a real-world application, this would be a database lookup
    return users[username];
  }
  
  module.exports = { getUser };