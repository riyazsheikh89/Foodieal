import nodemailer from "nodemailer";
import { HOST, SMTP_PORT, HOST_EMAIL_ID, EMAIL_APP_PASS } from './env-variables.js';

export const sendMail = async (data) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: HOST_EMAIL_ID,
        pass: EMAIL_APP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      to: data.email,
      subject: data.subject,
      text: data.body,
    });
  } catch (error) {
    throw error;
  }
};
