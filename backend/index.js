const getJobs = require("./getJobs.js");
const login = require("./login.js");
const registro = require("./registro.js");
const express = require("express");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");
const uri = `mongodb+srv://cenfotec:${process.env.MONGODB_PASS}@cenfotec.swucoqv.mongodb.net/jobsync?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get("/api/puestos", (req, res) => {
  const puestos = getJobs();
  res.json(puestos);
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

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = login(email);
  if (!user) {
    res.status(401).json({ error: "Usuario incorrecto" });
    return;
  } else if (user.password !== password) {
    res.status(401).json({ error: "Contraseña incorrecta" });
    return;
  }
  res.json(user);
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
