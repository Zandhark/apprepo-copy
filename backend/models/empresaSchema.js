const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  shortDesc: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
  },
}, { timestamps: true });

const Empresa = mongoose.model("Empresa", empresaSchema);