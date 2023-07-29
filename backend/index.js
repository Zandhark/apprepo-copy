const getJobs = require("./getJobs.js");
const login = require("./login.js");
const registro = require("./registro.js");
const newSession = require("./session.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Puesto = require("./models/puestoModel.js");
const Empresa = require("./models/empresaModel.js");
const Session = require("./models/sessionModel.js");

app.use(cors());
app.use(express.json());

app.get("/api/puestos", async (req, res) => { // retorna la lista de puestos
  try {
    const puestos = await getJobs();
    if (puestos instanceof Error) {
      throw new Error(puestos.message);
    }
    res.json(puestos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/puestos/:id", async (req, res) => { // retorna un puesto dependiendo del id
  
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

app.get("/api/puestos/new", async (req, res) => { // agrega nuevo puesto
});

app.delete("/api/puestos/delete/:id", async (req, res) => { // borra un puesto
});

app.get("/api/puestos/empresa/:id", async (req, res) => { // retorna los puestos de una empresa
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

app.get("/api/empresas", async (req, res) => { // retorna lista de empresas
  
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

app.get("/api/empresas/:id", async (req, res) => { // retorna una empresa dependiendo del id
    
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

app.patch("/api/empresas/update/:id", async (req, res) => { // actualiza una empresa
});

app.post("/api/empresas/new", async (req, res) => { //crea una nueva empresa
  try {
    const data = req.body;
    const empresa = new Empresa({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      logo: data.logo,
      descripcion: data.descripcion,
      type: data.tipoUsuario,
    });
    const response = await empresa.save();
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    console.log(response);
    res.status(200).json(response);

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/usuarios", async (req, res) => { // retorna lista de usuarios
});

app.patch("/api/usuarios/update/:id", async (req, res) => { // actualiza un usuario
});

app.get("/api/notificaciones", async (req, res) => { // retorna lista de notificaciones
});

app.get("/api/notificaciones/:userId", async (req, res) => { // retorna lista de notificaciones de un usuario
});

app.post("/api/notificaciones/new", async (req, res) => { // crea una nueva notificacion
});

app.patch("/api/notificaciones/update:id", async (req, res) => { // crea una nueva notificacion
});

app.post("/api/login", async (req, res) => { // login de usuario
  const { email, password } = req.body;
  try {
    const response = await login(email, password);
    console.log(response.session);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/registro", async (req, res) => { // registra un nuevo usuario final
  try {
    const usuario = req.body;
    const response = await registro(usuario);
    console.log(response);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/session", async (req, res) => { // crea una nueva sesion de usuario
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

app.delete("/api/session/delete/:id", async (req, res) => { //borra una sesion
  
  try {
    const response = await Session.deleteOne({ _id: req.params.id });
    console.log(response);
    res.status(200).json({ message: "Session deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete", async (req, res) => { // ignore, admin stuff
  // admin stuff to cleanup sessions
  const Session = require("./models/sessionModel.js");
  const response = await Session.deleteMany({});
  console.log(response);
  res.status(200).json({ message: "Sessions deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
