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
            html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
              </head>
              <style>
                body {
                  font-family: "Inter", sans-serif;
                  background-color: #f8f8f8;
                }
                * {
                  box-sizing: border-box;
                  font-family: "Inter", sans-serif;
                }
                p:last-child {
                  margin-top: 0;
                }
                img {
                  max-width: 100%;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                  margin-top: 0;
                }
                .company-logo-align {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .company-logo-align img {
                  width: 80px;
                  height: 80px;
                  cursor: pointer;
                }
                .user-information {
                  background-color: #021f4c;
                  width: 100%;
                }
              </style>
              <body style="text-transform: capitalize; background-color: #f8f8f8; margin: 0; padding: 0">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 15px">
                      <table
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                        style="
                          border-collapse: collapse;
                          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 25px;
                          border-radius: 10px;
                          overflow: hidden;
                          background-color: #fff;
                        "
                      >
                        <tr>
                          <td align="center">
                            <div
                              class="company-logo-align"
                              style="padding: 40px 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto"
                              align="center"
                            >
                              <img
                                src="https://res.cloudinary.com/dcuziet2p/image/upload/v1680206235/Product%20Images/tmp-1-1680206233761_xmul7v.jpg"
                                style="margin: 0 auto; height:60px; width:200px; cursor: pointer"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 0px 0px 0px 0px;
                              background-image: url('https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761121552221676112155222.png');
                              padding: 30px 15px;
                              background-size: 100%;
                              background-repeat: no-repeat;
                              background-position: center;
                              background-size: cover;
                            "
                            align="center"
                          >
                            <div>
                              <img
                                src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761121268081676112126808.png"
                                style="height: 100px; padding: 0px 0px 0px 0px"
                              />
                              <p style="margin: 15px 0 18px 0; font-size: 28px; font-weight: 700; text-align: center; line-height: 22px; color: #fff">
                                <span> Hi ${data.name},</span>
                                <img
                                  style="margin-left: 15px"
                                  src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698931676107069893.png"
                                  alt="Hand"
                                />
                              </p>
            
                              <p style="font-size: 16px; line-height: 16px; color: #fff; margin: 0">Thank you for signing up on Stagwood</p>
                            </div>
                          </td>
                        </tr>
            
                        <tr>
                          <td style="padding: 30px 30px 30px 30px" align="center">
                            <p style="font-size: 18px; font-weight: 600; line-height: 22px; color: #1c1d31; margin: 0">Forgot your password:</p>
                            <p style="font-size: 18px; font-weight: 500; line-height: 22px; color: #5e5e5e; margin: 5px 0 0 0">
                              Please find below your one-time passcode.
                            </p>
                            <p style="font-weight: 700; font-size: 48px; line-height: 1; text-align: center; color: #c36bd6; margin: 40px 0">${data.otp}</p>
            
                            <p style="font-size: 16px; font-weight: 400; line-height: 26px; color: #5e5e5e; margin: 0">
                              If you have any questions, feel free message us
                            </p>
                            <p style="font-size: 16px; font-weight: 400; line-height: 26px; color: #5e5e5e; margin: 0">
                              at
                              <a
                                style="display: inline-block; text-transform: initial; color: #2c73ff"
                                target="_blank"
                                href="mailto:animalll134@gmail.com?subject = Feedback&body = Message"
                              >
                                Stagwood66@gmail.com
                              </a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                        <td style="padding: 0 30px 30px 30px; text-align: center" align="center">
                        <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                          <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761082674421676108267442.png"
                        /></a>
                        <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                          <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698891676107069889.png"
                        /></a>
                        <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                          <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698901676107069890.png"
                        /></a>
                        <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                          <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761082978051676108297805.png"
                        /></a>
                      </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err.message);
            } else {
                console.log('Email sent successfully');
            }
        })
    },
    orderEmail: (data) => {
      console.log(data,"data email")
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
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <style>
              body {
                font-family: "Inter", sans-serif;
                background-color: #f8f8f8;
              }
              * {
                box-sizing: border-box;
                font-family: "Inter", sans-serif;
              }
              p:last-child {
                margin-top: 0;
              }
              img {
                max-width: 100%;
              }
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                margin-top: 0;
              }
              .company-logo-align {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .company-logo-align img {
                width: 80px;
                height: 80px;
                cursor: pointer;
              }
              .user-information {
                background-color: #021f4c;
                width: 100%;
              }
            </style>
            <body style="text-transform: capitalize; background-color: #f8f8f8; margin: 0; padding: 0">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 15px">
                    <table
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      width="600"
                      style="
                        border-collapse: collapse;
                        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 25px;
                        border-radius: 10px;
                        overflow: hidden;
                        background-color: #fff;
                      "
                    >
                      <tr>
                        <td align="center">
                          <div
                            class="company-logo-align"
                            style="padding: 40px 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto"
                            align="center"
                          >
                            <img
                              src="https://res.cloudinary.com/dcuziet2p/image/upload/v1680206235/Product%20Images/tmp-1-1680206233761_xmul7v.jpg"
                              style="margin: 0 auto; height:60px; width:225px; cursor: pointer"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 0px 0px 0px 0px;
                            background-image: url('https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761121552221676112155222.png');
                            padding: 30px 15px;
                            background-size: 100%;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;
                          "
                          align="center"
                        >
                          <div>
                            <img
                              src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761121268081676112126808.png"
                              style="height: 100px; padding: 0px 0px 0px 0px"
                            />
                            <p style="margin: 15px 0 18px 0; font-size: 28px; font-weight: 700; text-align: center; line-height: 22px; color: #fff">
                              <span> Hi ${data.name},</span>
                              <img
                                style="margin-left: 15px"
                                src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698931676107069893.png"
                                alt="Hand"
                              />
                            </p>
          
                            <p style="font-size: 16px; line-height: 16px; color: #fff; margin: 0">Thank you for order on Stagwood</p>
                          </div>
                        </td>
                      </tr>
          
                      <tr>
                        <td style="padding: 30px 30px 30px 30px" align="center">
                          <h2 style="font-weight: 600; line-height: 22px; color: green; margin: 0">Payment successfull !!</h2>
                          <p style="font-size: 15px; font-weight: 500; line-height: 22px; color: #5e5e5e; margin: 15px 0 0 0">
                            Your product has been successfully placed.  
                          </p>
                          <p style="font-size: 16px; font-weight: 400; line-height: 26px; color: #5e5e5e; margin: 40px 0 0 0">
                            If you have any questions, feel free message us
                          </p>
                          <p style="font-size: 16px; font-weight: 400; line-height: 26px; color: #5e5e5e; margin: 0">
                            at
                            <a
                              style="display: inline-block; text-transform: initial; color: #2c73ff"
                              target="_blank"
                              href="mailto:animalll134@gmail.com?subject = Feedback&body = Message"
                            >
                              Stagwood66@gmail.com
                            </a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                      <td style="padding: 0 30px 30px 30px; text-align: center" align="center">
                      <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                        <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761082674421676108267442.png"
                      /></a>
                      <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                        <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698891676107069889.png"
                      /></a>
                      <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                        <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761070698901676107069890.png"
                      /></a>
                      <a style="padding: 5px; display: inline-block" target="_blank" href="#0">
                        <img src="https://writertools-assets.s3.ap-south-1.amazonaws.com/writertools-ai-16761082978051676108297805.png"
                      /></a>
                    </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>`
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