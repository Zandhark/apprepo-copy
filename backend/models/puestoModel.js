const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./empresaModel")
const puestoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    rangoSalario: [
      {
        type: Number,
        required: true,
      },
    ],
    requisitos: [
      {
        type: String,
        required: true,
      },
    ],
    atributos: [
      {
        type: String,
        required: true,
      }
    ],
    visibilidad: {
      type: String,
      required: true,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Empresa",
    },
  },
  { timestamps: true }
);

const Puesto = mongoose.model("Puesto", puestoSchema);

module.exports = Puesto;
