const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const puestoSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  rangoSalario: [
    {
      type: Number,
      require: true,
    },
  ],
  requisitos: [
    {
      type: String,
      require: true,
    },
  ],
  empresa: {
    id: {
      type: String,
      require: true,
    },
  }
}, { timestamps: true });


const Puesto = mongoose.model("Puesto", puestoSchema);
