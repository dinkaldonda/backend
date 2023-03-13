const nodemailer = require('nodemailer');
require("dotenv").config()
module.exports = {

    mailService: (data) => {

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL_USER,
            to: data.to,
            subject: data.subject,
            text: data.otp
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err.message);
            } else {
                console.log('Email sent successfully');
            }
        })
    }
}