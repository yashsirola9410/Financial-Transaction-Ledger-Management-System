const nodemailer = require('nodemailer');
const registerEmailTemplate = require("../templates/email.templates")


//used to connect to google email server and send email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"YYY banking services" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



//sending function for register email
async function sendRegisterEmail(userEmail  , name ){
    const subject = "Welcome to YYY banking services"
    const text = `Dear ${name},\n\nWelcome to YYY banking services! We are thrilled to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nYYY banking services`
    const html = registerEmailTemplate(name)
    await sendEmail(userEmail , subject , text , html)
}

module.exports = {
    sendRegisterEmail
};
