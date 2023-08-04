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
  title: String,
  institution: String,
  description: String,
  startDate: Date,
  endDate: Date,
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
    about:String,
    role: String,
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
