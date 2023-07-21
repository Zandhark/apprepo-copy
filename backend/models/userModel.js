const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const experienceSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userDescription: {
      type: String,
      required: false,
    },
    profileImg: String,
    curriculum: String,
    about: {
      type: String,
      required: false,
    },
    experience: [experienceSchema],
    education: [
      {
        title: {
          type: String,
          required: false,
        },
        institution: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        startDate: {
          type: Date,
          required: false,
        },
        endDate: {
          type: Date,
          required: false,
        },
      },
    ],
    skills: [
      {
        name: {
          type: String,
          required: false,
        },
      },
    ],
    languages: [
      {
        name: {
          type: String,
          required: false,
        },
        level: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
