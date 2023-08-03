

require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const User = require("../models/userModel");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function addSkills() {
    const skillList = [
        "zfs",
        "stuff", 
        "Linux",
        "Rust"
    ]
    const response  = await User.findByIdAndUpdate("64c83f63d6557dba4be1140f", {$push: {skills: skillList} })
    console.log(response)
}

addSkills()