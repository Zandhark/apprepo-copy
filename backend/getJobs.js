const Puesto = require('./models/puestoModel');


async function getJobs() {
  try {
    const puestos = await Puesto.find().populate('empresa');
  return puestos;
  } catch (e) {
    return e;
  }
}

module.exports = getJobs;
