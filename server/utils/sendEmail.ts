import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "myrollersquad@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendEmail(to: string, subject: string, html: any) {
  const emailSent = await transporter.sendMail({
    from: "my roller[s]quad <myrollersquad@gmail.com>",
    to,
    subject,
    html,
  });
  return emailSent;
}

export default sendEmail;
