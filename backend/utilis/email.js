const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1 Create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.API_HOST,
    secure: true,
    port: process.env.API_PORT,
    auth: {
      user: process.env.API_USER,
      pass: process.env.API_KEY,
    },
  });

  // 2) Define the email options

  const mailOptions = {
    from: 'tarunganesh <tarunganesh73@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
