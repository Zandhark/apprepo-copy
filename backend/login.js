const mongoose = require("mongoose");
const newSession = require("./session.js");
const User = require("./models/userModel.js");

async function login(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Usuario incorrecto");
      
    }
    if (user.password !== password) {
      throw new Error("Contraseña incorrecta");

    }

    const session = await newSession(user._id);
    const response = {
      user: user,
      session: session,
    };
    return response;
  } catch (e) {
    return e;
  }

}

module.exports = login;