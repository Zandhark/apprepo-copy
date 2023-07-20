const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    userDescription: {
      type: String,
      require: false,
    },
    profileImg: {
      type: String,
      require: true,
    },
    curriculum: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: false,
    },
    experience: [
      {
        title: {
          type: String,
          require: false,
        },
        company: {
          type: String,
          require: false,
        },
        description: {
          type: String,
          require: false,
        },
        startDate: {
          type: Date,
          require: false,
        },
        endDate: {
          type: Date,
          require: false,
        },
      },
    ],
    education: [
      {
        title: {
          type: String,
          require: false,
        },
        institution: {
          type: String,
          require: false,
        },
        description: {
          type: String,
          require: false,
        },
        startDate: {
          type: Date,
          require: false,
        },
        endDate: {
          type: Date,
          require: false,
        },
      },
    ],
    skills: [
      {
        name: {
          type: String,
          require: false,
        },
      },
    ],
    languages: [
      {
        name: {
          type: String,
          require: false,
        },
        level: {
          type: String,
          require: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
