const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const puestoSchema = new Schema({
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
  empresa: {
    id: {
      type: String,
      required: true,
    },
  }
}, { timestamps: true });


const Puesto = mongoose.model("Puesto", puestoSchema);
