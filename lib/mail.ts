import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "jobo.app.mobile@gmail.com",
    pass: "tsem kncj kwkr rtda",
  },
});

export const sendMail = async (email: string, secret: string) => {
  try {
    const info = await transporter.sendMail({
      to: email, // list of receivers
      subject: "confirmation code", // Subject line
      html: `<b>your OTP code is ${secret}</b>`, // html body
    });
  } catch (error) {
    console.log(error);
  }
};
