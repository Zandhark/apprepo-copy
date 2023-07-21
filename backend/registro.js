require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://cenfotec:${process.env.MONGODB_PASS}@cenfotec.swucoqv.mongodb.net/jobsync?retryWrites=true&w=majority`;

const User = require("./models/userModel.js");

async function registro(usuario) {
  try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = new User({
      name: usuario.nombre,
      email: usuario.email,
      password: usuario.passwordValue,
      type: usuario.tipoUsuario,
      genero: usuario.genero,
      title: "",
      userDescription: "",
      profileImg: usuario.fotografia,
      curriculum: usuario.cv,
      about: "",
      experience: usuario.expedrienciaLaboral,
      education: [],
      skills: [],
      languages: [],
    });
    await user.save();
    mongoose.connection.close();
    return user;
  } catch (e) {
    console.log(e.message);
    mongoose.connection.close();
    return e;
  }
}

module.exports = registro;


