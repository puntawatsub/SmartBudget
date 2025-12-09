// // this is just for testing if ur email works while resetting password
// // ------------------------------------
// // remember your (.env ) needs these for the code to work

// // # Outlook email for sending forgot password links
// // EMAIL_USER=//your gmail id
// // EMAIL_PASS=//your personal app password.
// // FRONTEND_URL=http://localhost:5173
// // ------------------------------------------

// require('dotenv').config()
// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // This should be your Gmail App Password
//   },
// })

// transporter
//   .sendMail({
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER, // You can test sending to yourself
//     subject: 'Test Email',
//     text: 'This is a test email!',
//   })
//   .then(() => console.log('Email sent'))
//   .catch(console.error)
