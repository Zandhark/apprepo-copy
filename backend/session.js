const Session = require("./models/sessionModel.js");

async function newSession(userId) {
  try {
    const session = new Session({
      userId: userId,
    });
    await session.save();
    return session;
  } catch (e) {
    console.log(e.message);
    return e;
  }
}

module.exports = newSession;

