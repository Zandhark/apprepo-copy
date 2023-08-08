require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function addNotifications() {
  notifications = [
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
    },
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
    },
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: true,
    },
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: true,
    },
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: true,
    },
    {
      userId: "64d074f2ae5dd2c991cda5c5",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
    },
  ];

  notifications.forEach(async (notification) => {
    console.log(notification)
    const newNotification = new Notification(notification);
    const response = await newNotification.save();
    console.log(response);
  });
  console.log("Notifications added");
}

addNotifications();