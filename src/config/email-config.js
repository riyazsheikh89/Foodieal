import nodemailer from "nodemailer";

export const sendMail = async (data) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.HOST_EMAIL_ID,
        pass: process.env.EMAIL_APP_PASS,
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
