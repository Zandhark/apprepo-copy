const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


async function sendMail(sentTo, subject, html){
  try {
    const mailOptions = {
      from: 'mail@jobsync.com',
      to: sentTo,
      subject,
      html,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = sendMail;