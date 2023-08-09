const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  logo: String,
  shortDescription: String,
  descripcion: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  empleados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ]
}, { timestamps: true });

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;