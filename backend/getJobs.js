

function getJobs() {
  const data = require('./data.js');
  const puestos = data.puestos;

  return puestos;
}

module.exports = getJobs;
