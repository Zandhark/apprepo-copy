const Notificaition = require('../models/notificationModel.js');

const sendNotification = async (userId, title, description) => {
  const notification = new Notificaition({
    userId,
    title,
    description,
    read: false,
  });
  try {
    await notification.save();
  } catch (e) {
    console.log(e)
    return false;
  }
  
}

module.exports = sendNotification;