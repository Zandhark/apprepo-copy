const getJobs = require("./getJobs.js");
const login = require("./login.js");
const registro = require("./registro.js");
const newSession = require("./session.js");

const express = require("express");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get("/api/puestos", async (req, res) => {
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

app.get("/api/puestos/:id", (req, res) => {
  const puestos = getJobs();
  const puesto = puestos.find(
    (puesto) => puesto.id === parseInt(req.params.id)
  );
  if (!puesto) {
    res.status(404).json({ error: "No se encontró el puesto" });
    return;
  }
  res.status(200).json(puesto);
});

app.post("/api/login", async (req, res) => {
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

app.post("/api/session", async (req, res) => {
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
  const Session = require("./models/sessionModel.js");
  try {
    const response = await Session.deleteOne({ _id: req.params.id });
    console.log(response);
    res.status(200).json({ message: "Session deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/session/delete", async (req, res) => {
  // admin stuff to cleanup sessions
  const Session = require("./models/sessionModel.js");
  const response = await Session.deleteMany({});
  console.log(response);
  res.status(200).json({ message: "Sessions deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
