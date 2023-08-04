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
