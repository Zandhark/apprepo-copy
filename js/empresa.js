const nombreEmpresa = document.getElementById("nombreEmpresa");
const empresaShortDesc = document.getElementById("empresaShortDesc");
const empresaDescripcion = document.getElementById("empresaDescripcion");

const urlParams = new URLSearchParams(window.location.search);

async function fetchEmpresa(id) {
  const response = await fetch(`http://localhost:3000/api/empresas/${id}`);
  const empresa = await response.json();
  return empresa;
}

async function fetchPuestos(id) {
  const response = await fetch(`http://localhost:3000/api/puestos/empresa/${id}`);
  const puestos = await response.json();
  return puestos;
}

async function renderEmpresa() {
  const empresaId = urlParams.get("id");
  const empresa = await fetchEmpresa(empresaId);
  const puestos = await fetchPuestos(empresaId);
  console.log(empresa);
  nombreEmpresa.innerText = empresa.nombre;
  empresaShortDesc.innerText = empresa.shortDesc;
  empresaDescripcion.innerText = empresa.descripcion;
}

renderEmpresa();

