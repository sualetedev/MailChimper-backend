const Audience = require("../models/Audience");
const nodemailer = require("nodemailer");

const sendToAudience = async (req, res) => {
  const { audienceIds, subject, html } = req.body;

  try {
    const audiences = await Audience.find({
      _id: { $in: audienceIds },
    }).populate("contacts");
    const emails = audiences.flatMap((a) => a.contacts.map((c) => c.email));
    const uniqueEmails = [...new Set(emails)];
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MailChimper" <${process.env.EMAIL_USER}>`,
      to: uniqueEmails.join(","),
      subject,
      html,
    });
    return res.status(200).send({
      status: "success",
      message: "Correos enviados correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Fallo en el sendToAudience",
    });
  }
};

module.exports = {
  sendToAudience,
};
