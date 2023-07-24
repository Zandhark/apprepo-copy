require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const Puesto = require("../models/puestoModel");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    const puesto = await Puesto.findById("64beba68508db7d7781c035f").populate("empresa");
    console.log(puesto);
}

run();