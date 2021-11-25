const nodemailer = require("nodemailer");
const user = process.env.EMAIL_MAILER;
const pass = process.env.PASSWORD_MAILER;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(subject, message, emailContacto) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: user,
      pass: pass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: user, // sender address
    to:  emailContacto, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {sendMail};
