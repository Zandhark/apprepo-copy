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

const educationSchema = new Schema({
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
});

const skillsSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
});

const languagesSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    required: false,
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
    title: String,
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userDescription: String,
    profileImg: String,
    curriculum: String,
    about: {
      type: String,
      required: false,
    },
    role: String,
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillsSchema],
    languages: [languagesSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
