function fetchUser(email) {
  const data = require("./data.js");
  const users = data.users;

  return users.find((user) => user.email === email);
}

module.exports = fetchUser;