const users = {
  'user1': { password: 'password1' },
  // Add more users as needed
};

function getUser(username) {
  return users[username];
}

module.exports = { getUser };