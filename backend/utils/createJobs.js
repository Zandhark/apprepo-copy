require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const Puesto = require("../models/puestoModel");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });





function returnVisibility() {
  const visibility = ['Privado', 'Publico'];
  return visibility[Math.floor(Math.random() * visibility.length)];
}

function generateTwoRandomNumbers(min, max) {
  const num1 = Math.floor(Math.random() * (max - min + 1) + min);
  const num2 = Math.floor(Math.random() * (max - num1 + 1) + num1);
  return [num1, num2];
}

async function run() {
  const Empresa = require("../models/empresaModel");
  const positions = [
    'Software Engineer',
    'Data Analyst',
    'Marketing Manager',
    'Product Designer',
    'Financial Analyst',
    'Sales Representative',
    'Project Manager',
    'Human Resources Specialist',
    'Operations Coordinator',
    'Customer Support Specialist'
  ];
  try {
    
    const empresas = await Empresa.find();
    positions.forEach(async (position, index) => {
      const puesto = new Puesto(
        {
          nombre: position,
          descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
          rangoSalario: generateTwoRandomNumbers(100000, 5000000),
          requisitos: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          ],
          visibilidad: returnVisibility(),
          empresa: empresas[index]._id,
        }
      );
      await puesto.save();
      console.log("Job saved");
      console.log(puesto)
    });
  
  } catch (e) {
    console.error(e.message);
  }
  return;
}

run();