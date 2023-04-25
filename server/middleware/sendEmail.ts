import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "myrollersquad@gmail.com",
    pass: "nywsziayjwsfpyyz",
  },
});

async function sendEmail(to: string, subject: string, html: any) {
  const emailSent = await transporter.sendMail({
    from: "myRollerSquad <myrollersquad@gmail.com>",
    to,
    subject,
    html,
  });
  return emailSent;
}

export default sendEmail;
