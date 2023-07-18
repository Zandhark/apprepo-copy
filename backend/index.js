const getJobs = require("./getJobs.js");
const login = require("./login.js");
const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/api/puestos", (req, res) => {
  const puestos = getJobs();
  res.json(puestos);
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
