export default function (req, res) {
  require('dotenv').config()

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'mjoki7777@gmail.com',
      pass: process.env.password,
    },
    secure: true,
  })
  const mailData = {
    from: 'mjoki7777@gmail.com',
    to: 'k.babaraimova@bctcluster.uz',
    subject: `${req.body.title}`,
    text: req.body.title,
    html: `
            <div>Ф.И.О: ${req.body.name}</div>
            <div>Номер телефона: ${req.body.phone}</div>
            <div>Адрес проживания: ${req.body.email}</div>
            <div>Желаемая должность: ${req.body.comment}</div>
        `,
  }
  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err)
    else console.log(info)
  })
  res.status(200)
  res.end()
}
