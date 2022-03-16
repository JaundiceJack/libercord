const nodemailer = require("nodemailer");

// Send an email through nodemailer
const sendEmail = async (email, subject, text, html) => {
  try {
    // Create a mail transporter with the server's credentials
    const transporter = nodemailer.createTransport({
      host:    process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port:    587,
      secure:  false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
    });
    // Set the content of the email
    const mailOptions = {
      from:    '"Libercord Assistance" <no_reply@libercord.com>',
      to:      email,
      subject: subject,
      text:    text,
      html:    html,
    };
    // Send the mail through the transporter
    await transporter.sendMail(mailOptions);
  }
  catch (error) { throw(error); }
};

module.exports = sendEmail;
