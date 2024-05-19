var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const Organisation = require("../models/organisation");
const { generateRandomOTP } = require("../utils/generateRandomOTP");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "forgotpassworddiscuz@zohomail.in",
    pass: "PMih1kJPkimN",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  const randomNumber = generateRandomOTP();
  const htmlContent = `
  <div style="text-align: center;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333;">Reset your Discuz Password</h2>
        <div style="border: 2px solid rgb(201, 199, 199); padding: 10px; border-radius: 5px; text-align: center;">
            <h3>Discuz password reset.</h3>
            <p> We heard that you lost your <b>Discuz</b> password. Sorry about that!
                But don't worry! You can use the following OTP to reset your password</p>
            <p style="background-color: #1A88E1; color: white; font-size: 20px; line-height: 30px; width: fit-content; margin: 0 auto; border-radius: 5px; padding: 5px 10px;"><b>${randomNumber}</b></p>
            <p>If you don't use this within 5 minutes, it will expire. </p>
            <p style="text-align: left;">Thanks,<br><b>Discuz Team</b></p>
        </div>
    </div>
</div>
`;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "forgotpassworddiscuz@zohomail.in", // sender address
    to: email, // list of receivers
    subject: "Forgot Password Email", // Subject line
    html: htmlContent, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

router.get("/", async (req, res) => {
  const { email } = req.body;

  await Organisation.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      //   res.send("Email sent route hit");
      main(email)
        .then(
          res.send({ success: true, message: "Email sent successfully!!!" })
        )
        .catch(console.error);
    }
  });
});

module.exports = router;
