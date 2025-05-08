import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY, // usa tu .env
  // url: "https://api.eu.mailgun.net" // solo si tu cuenta es europea
});

export async function sendMailWithMailgun({ to, subject, text }) {
  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `MailChimper <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject,
      text,
    });
    console.log("Enviado:", result);
    return result;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw error;
  }
}
