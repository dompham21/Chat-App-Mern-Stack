const nodemailer = require("nodemailer");

const adminMail = process.env.MAIL_USER;
const adminPassword = process.env.MAIL_PASSWORD;
const adminHost = process.env.MAIL_HOST;
const adminPort = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent) => {
    let transporter = nodemailer.createTransport({
        host: adminHost,
        port: adminPort,
        secure: false, // true for 465, false for other ports
        auth: {
          user: adminMail, 
          pass: adminPassword, 
        }
    });
    let options = {
        from: adminMail,
        to: to,
        subject: subject,
        text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
        html: htmlContent
    }
    return transporter.sendMail(options);
}

module.exports = sendMail;