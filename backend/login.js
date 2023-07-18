

function fetchUser(email) {
  const data = require('./data.js');
  const users = data.users;

  return users.find((user) => user.email === email);
}

function login(email) {
  try {
    const user = fetchUser(email);
    return user;
  } catch (e) {
    return e;
  }

}

module.exports = login;