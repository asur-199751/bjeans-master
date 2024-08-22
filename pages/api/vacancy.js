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
            <div>Дата рождения: ${req.body.birthday}</div>
            <div>Страна: ${req.body.country}</div>
            <div>Город: ${req.body.city}</div>
            <div>Номер телефона: ${req.body.phone}</div>
            <div>Адрес проживания: ${req.body.address}</div>
            <div>Желаемая должность: ${req.body.position}</div>
        `,
  }
  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err)
    else console.log(info)
  })
  res.status(200)
  res.end()
}
