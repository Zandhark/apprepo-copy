const fetchUser = require("./utils.js");

function login(email) {
  try {
    const user = fetchUser(email);
    return user;
  } catch (e) {
    return e;
  }

}

module.exports = login;