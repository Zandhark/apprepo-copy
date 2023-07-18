const getJobs = require("./getJobs.js");
const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.get("/api/puestos", (req, res) => {
  const puestos = getJobs();
  res.json(puestos);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
