const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificacionSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    read: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

const Notificacion = mongoose.model("Notificacion", notificacionSchema);