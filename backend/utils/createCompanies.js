require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;




async function run() {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const Empresa = require("../models/empresaModel");
  const companies = [
    "TechPros",
    "SwiftSolutions",
    "InnovateHub",
    "ApexSystems",
    "FutureTech",
    "BrightWave",
    "AgileTech",
    "FusionTech",
    "GlobalTech",
    "VertexSolutions",
  ];

  try {
    companies.forEach(async (company) => {
      const empresa = new Empresa({
        nombre: company,
        shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        descripcion:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
        logo: "https://via.placeholder.com/100",
      });

      await empresa.save();
      console.log("Company saved");
      console.log(empresa);
    });
  } catch (e) {
    console.error(e.message);
  }
}

run();


