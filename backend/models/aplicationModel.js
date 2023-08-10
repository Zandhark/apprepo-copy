const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aplicationSchema = new Schema(
  {
    puesto: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Puesto",
    },
    candidato: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Empresa",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["Enviada", "En revisión", "Aceptada", "Denegada"],
    },
  }, { timestamps: true }
);


const Aplication = mongoose.model("Aplication", aplicationSchema);

module.exports = Aplication;