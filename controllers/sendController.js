const Audience = require("../models/Audience");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mailhog",
  port: parseInt(process.env.SMTP_PORT) || 1025,
  secure: false,
  auth: null
});

const sendToAudience = async (req, res) => {
  const { audienceIds, subject, html } = req.body;

  try {
    const audiences = await Audience.find({ _id: { $in: audienceIds } }).populate("contacts");
    const emails = audiences.flatMap((a) => a.contacts.map((c) => c.email));
    const uniqueEmails = [...new Set(emails)];

    await transporter.sendMail({
      from: 'MailChimper <noreply@mailchimper.local>',
      to: uniqueEmails,
      subject,
      html
    });

    return res.status(200).send({
      status: "success",
      message: "Enviado correctamente",
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return res.status(500).send({
      status: "error",
      message: "Fallo en el envío",
    });
  }
};

module.exports = { sendToAudience };
