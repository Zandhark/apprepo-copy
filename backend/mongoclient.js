const mongoose = require("mongoose");

const uri = `mongodb+srv://cenfotec:1z0ZEspWOBnBYH8T@cenfotec.swucoqv.mongodb.net/jobsync?retryWrites=true&w=majority`;
require("dotenv").config();

const User = require("./models/userModel.js");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

run();

async function run() {
  try {
    const user = new User({
      name: "John Doe",
      email: "test@mail.nope",
      password: "123456",
      type: "endUser",
      title: "UI/UX Developer",
      userDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
      profileImg: `/`,
      curriculum: `/`,
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
      experience: [
        {
          title: "UI/UX Developer",
          company: "Google",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
        {
          title: "Rust Developer",
          company: "Linux foundation",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
        {
          title: "Kotlin Developer",
          company: "NVIDIA",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
        {
          title: "Linux Systems administrator",
          company: "Valve",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
      ],
      education: [
        {
          title: "Bachillerato",
          institution: "Colegio de wizzards",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
        {
          title: "Educación Media",
          institution: "Escuela de wizzards",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
      ],
      skills: [
        {
          name: "HTML",
        },
        {
          name: "Rust",
        },
        {
          name: "Linux",
        },
        {
          name: "ZFS",
        },
        {
          name: "Kotlin",
        },
        {
          name: "Flutter",
        },
        {
          name: "Dart",
        },
        {
          name: "C++",
        },
        {
          name: "C",
        },
      ],
      languages: [
        {
          name: "English",
          level: "B2",
        },
        {
          name: "Español",
          level: "Nativo",
        },
      ],
    });
    await user.save();
    console.log("User saved");
    console.log(user)
    mongoose.connection.close();
  } catch (e) {
    console.error(e.message);
    mongoose.connection.close();
  }
}
