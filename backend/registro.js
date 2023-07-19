const fetchUser = require("./utils.js");

function registro(usuario) {
  const data = require("./data.js");
  try {
    const user = fetchUser(usuario.email);
    if (user) {
      throw new Error("El usuario ya existe");
    } else {
      const id = data.users.length + 1;
      const newUser = { 
        id: id,
        name: usuario.nombre,
        email: usuario.email,
        password: usuario.passwordValue,
        type: usuario.type,
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
      };
    }
    data.users.push(newUser);
    return newUser;
  } catch (e) {
    return e;
  }
}

module.exports = registro;
