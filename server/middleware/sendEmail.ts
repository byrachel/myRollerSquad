import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "myrollersquad@gmail.com",
    pass: "poehjhvcrzabdkpb",
  },
});

async function sendEmail(to: string, subject: string, html: any) {
  await transporter.sendMail({
    from: "myRollerSquad <myrollersquad@gmail.com>",
    to,
    subject,
    html,
  });
}

export default sendEmail;
