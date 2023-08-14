const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel.js");
require("./empresaModel");

const invitationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Empresa",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;