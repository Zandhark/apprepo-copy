const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;