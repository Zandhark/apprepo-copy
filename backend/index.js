const login = require("./login.js");
const registro = require("./registro.js");
const newSession = require("./session.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const compression = require("compression");
const containerClient = require("./utils/azureBlob.js");

const app = express();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Puesto = require("./models/puestoModel.js");
const Empresa = require("./models/empresaModel.js");
const Session = require("./models/sessionModel.js");
const Notificacion = require("./models/notificacionModel.js");
const User = require("./models/userModel.js");

app.use(cors());
app.use(express.json({ limit: "50mb"}));
app.use(compression());

app.get("/api/puestos", async (req, res) => {
  // retorna la lista de puestos
  try {
    const puestos = await Puesto.find().populate("empresa");
    if (puestos instanceof Error) {
      throw new Error(puestos.message);
    }
    res.json(puestos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/puestos/:id", async (req, res) => {
  // retorna un puesto dependiendo del id

  try {
    const puesto = await Puesto.findById(req.params.id).populate("empresa");
    if (puesto instanceof Error) {
      throw new Error(puesto.message);
    }
    res.status(200).json(puesto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/puestos/new", async (req, res) => {
  // agrega nuevo puesto
});

app.delete("/api/puestos/delete/:id", async (req, res) => {
  // borra un puesto
});

app.get("/api/puestos/empresa/:id", async (req, res) => {
  // retorna los puestos de una empresa
  try {
    const puestos = await Puesto.find({ empresa: req.params.id });
    if (puestos instanceof Error) {
      throw new Error(puestos.message);
    }
    res.status(200).json(puestos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/empresas", async (req, res) => {
  // retorna lista de empresas

  try {
    const empresas = await Empresa.find({});
    if (empresas instanceof Error) {
      throw new Error(empresas.message);
    }
    res.status(200).json(empresas);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/empresas/:id", async (req, res) => {
  // retorna una empresa dependiendo del id

  try {
    const empresa = await Empresa.findById(req.params.id);
    if (empresa instanceof Error) {
      throw new Error(empresa.message);
    }
    res.status(200).json(empresa);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/empresas/update/:id", async (req, res) => {
  // actualiza una empresa
  try {
    const data = req.body;
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, {
      nombre: data.nombre || Empresa.nombre,
      email: data.email || Empresa.email,
      password: data.password || Empresa.password,
      logo: data.logo || Empresa.logo,
      descripcion: data.descripcion || Empresa.descripcion,
      type: data.tipoUsuario || Empresa.type,
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    res.status(200).json(empresa);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/empresas/new", async (req, res) => {
  //crea una nueva empresa
  try {
    const data = req.body;
    const logoBuffer = new Buffer.from(data.logo.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const empresa = new Empresa({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      descripcion: data.descripcion,
      type: data.tipoUsuario,
    });
    const empResponse = await empresa.save();
    if (empResponse instanceof Error) {
      throw new Error(empResponse.message);
    }
    blockBlobClient = containerClient.getBlockBlobClient(`${empResponse._id}-logo.jpg`);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/usuarios", async (req, res) => {
  // retorna lista de usuarios
  try {
    const usuarios = await Users.find({});
    if (usuarios instanceof Error) {
      throw new Error(usuarios.message);
    }
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/usuarios/:userId", async (req, res) => { // retorna un usuario dependiendo del id
  try {
    const user = await User.findById(req.params.userId);
    if (user instanceof Error) {
      throw new Error(user.message);
    }
    
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/update/:id", async (req, res) => {
  // actualiza un usuario
});

app.patch("/api/usuarios/experiencia/:id", async (req, res) => { // actualiza la experiencia de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { $push: { experience: req.body } });
    console.log(response)
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  

});

app.get("/api/usuarios/:userId", async (req, res) => { // retorna un usuario dependiendo del id
  try {
    const user = await User.findById(req.params.userId);
    if (user instanceof Error) {
      throw new Error(user.message);
    }
    
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/educacion/:id", async (req, res) => { // actualiza la educacion de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { $push: { education: req.body } });
    console.log(response)
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/experiencia/:id", async (req, res) => { // actualiza la experiencia de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { $push: { experience: req.body } });
    console.log(response)
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  

});

app.patch("/api/usuarios/educacion/:id", async (req, res) => { // actualiza la educacion de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { $push: { education: req.body } });
    console.log(response)
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/skills/:id", async (req, res) => { // actualiza los skills de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { skills: req.body });
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.patch("/api/usuarios/skills/:id", async (req, res) => { // actualiza los skills de un usuario
  try {
    const response = await User.findByIdAndUpdate(req.params.id, { skills: req.body });
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/notificaciones/:userId", async (req, res) => {
  // retorna lista de notificaciones de un usuario
  try {
    const notificacion = await Notificacion.findById(req.params.userId);
    if (notificacion instanceof Error) {
      throw new Error(notificacion.message);
    }
    res.status(200).json(notificacion);
  }catch (e){
  res.status(400).json({ error: e.message });
  }
});

app.post("/api/notificaciones/new", async (req, res) => {
  // crea una nueva notificacion
});

app.patch("/api/notificaciones/update:id", async (req, res) => {
  // crea una nueva notificacion
});

app.post("/api/login", async (req, res) => {
  // login de usuario
  const { email, password } = req.body;
  try {
    const response = await login(email, password);
    console.log(response.session);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/registro", async (req, res) => {
  
  // registra un nuevo usuario final

  // console.log(req.body.fotografia.replace(/^data:image\/\w+;base64,/, ""));
  // console.log(req.body.cv.replace(/^data:application\/\w+;base64,/, ""));


  try {
    const usuario = req.body;
    const cvBuffer = Buffer.from(usuario.cv.replace(/^data:application\/\w+;base64,/, ""), "base64");
    const fotoBuffer = Buffer.from(usuario.fotografia.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const user = new User({
      name: usuario.nombre,
      email: usuario.email,
      password: usuario.passwordValue,
      type: usuario.tipoUsuario,
      genero: usuario.genero,
      title: usuario.title,
      userDescription: "",
      about: usuario.userDescription,
      experience: usuario.expedrienciaLaboral,
      education: [],
      skills: [],
      languages: [],
    });
    
    const userResponse = await user.save();
    if (userResponse instanceof Error) {
      throw new Error(userResponse.message);
    }
    
    const blockBlobClientCV = containerClient.getBlockBlobClient(`${userResponse._id}-cv.pdf`);
    const blockBlobClientFoto = containerClient.getBlockBlobClient(`${userResponse._id}-profile.jpg`);
    await blockBlobClientCV.upload(cvBuffer, cvBuffer.length);
    await blockBlobClientFoto.upload(fotoBuffer, fotoBuffer.length);
    const cvUrl = blockBlobClientCV.url;
    const fotoUrl = blockBlobClientFoto.url;
    const response = await User.findByIdAndUpdate(userResponse._id, { curriculum: cvUrl, profileImg: fotoUrl }, {new: true});

    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/session", async (req, res) => {
  // crea una nueva sesion de usuario
  try {
    const { userId } = req.body;
    const session = await newSession(userId);
    if (session instanceof Error) {
      throw new Error(session.message);
    }
    res.status(200).json(session);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete/:id", async (req, res) => {
  //borra una sesion

  try {
    const response = await Session.deleteOne({ _id: req.params.id });
    console.log(response);
    res.status(200).json({ message: "Session deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete", async (req, res) => {
  // ignore, admin stuff
  // admin stuff to cleanup sessions
  const Session = require("./models/sessionModel.js");
  const response = await Session.deleteMany({});
  console.log(response);
  res.status(200).json({ message: "Sessions deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
