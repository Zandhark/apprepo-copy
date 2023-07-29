const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel.js");

const notificacionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Notificacion = mongoose.model("Notificacion", notificacionSchema);

module.exports = Notificacion;