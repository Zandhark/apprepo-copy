const userId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];

function agregarFormato(moneda) {
  return moneda.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

slider1.addEventListener("input", function () {
  value1.textContent = agregarFormato(slider1.value);
  if (parseInt(slider1.value) > parseInt(slider2.value)) {
    slider2.value = slider1.value;
    value2.textContent = agregarFormato(slider1.value);
  }
});

slider2.addEventListener("input", function () {
  value2.textContent = agregarFormato(slider2.value);
  if (parseInt(slider2.value) < parseInt(slider1.value)) {
    slider1.value = slider2.value;
    value1.textContent = agregarFormato(slider2.value);
  }
});

async function getEmpresa() {
  const response = await fetch(
    `http://localhost:3000/api/usuarios/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const user = await response.json();
  const empresaId = user.empresa;
  return empresaId;

}

async function handleFormSubmit(e) {
  e.preventDefault();
  const nombrePuesto = document.getElementById("nombre").value;
  const rangoMin = document.getElementById("slider1").value;
  const rangoMax = document.getElementById("slider2").value;
  const requisitos = document.getElementById("requisitos").value;
  const atributos = document.getElementById("atributos").value;
  const descripcion = document.getElementById("descripcion").value;
  const visibilidad = document.getElementById("visibilidad").value;
  const empresaId = await getEmpresa();
  const requsitosArray = requisitos.split(/\r?\n/);
  const atributosArray = atributos.split(/\r?\n/);
  const data = {
    nombre: nombrePuesto,
    descripcion: descripcion,
    rangoSalario: [rangoMin, rangoMax],
    requisitos: requsitosArray,
    atributos: atributosArray,
    visibilidad: visibilidad,
    empresa: empresaId,
    
  };
  const response = await fetch(
    `http://localhost:3000/api/puestos/new`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  console.log(json);
  // window.location.href = "/puestos";
}