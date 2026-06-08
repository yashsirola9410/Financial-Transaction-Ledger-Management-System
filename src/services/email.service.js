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

//for transaction email
async function sendTransactionEmail(userEmail , name , amount , type){
  const subject = `Transaction Alert: ${type} of ${amount}`
  const text = `Dear ${name},\n\nWe would like to inform you that a ${type} transaction of amount ${amount} has been made on your account. If you did not authorize this transaction, please contact our support team immediately.\n\nBest regards,\nYYY banking services`
  const html = `<p>Dear ${name},</p><p>We would like to inform you that a <strong>${type}</strong> transaction of amount <strong>${amount}</strong> has been made on your account. If you did not authorize this transaction, please contact our support team immediately.</p><p>Best regards,<br/>YYY banking services</p>`
  await sendEmail(userEmail , subject , text , html)
}

//for failed email
async function sendTransactionFailedEmail(userEmail , name , amount , type){
  const subject = `Transaction Failed: ${type} of ${amount}`
  const text = `Dear ${name},\n\nWe would like to inform you that a ${type} transaction of amount ${amount} has failed. If you did not authorize this transaction, please contact our support team immediately.\n\nBest regards,\nYYY banking services`
  const html = `<p>Dear ${name},</p><p>We would like to inform you that a <strong>${type}</strong> transaction of amount <strong>${amount}</strong> has failed. If you did not authorize this transaction, please contact our support team immediately.</p><p>Best regards,<br/>YYY banking services</p>`
  await sendEmail(userEmail , subject , text , html)
}

module.exports = {
    sendRegisterEmail,
    sendTransactionEmail,
    sendTransactionFailedEmail
};


