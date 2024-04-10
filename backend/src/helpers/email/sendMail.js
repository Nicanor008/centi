import { createTransport } from "nodemailer";

async function sendEmail(to, subject, text) {
  let transporter = createTransport({
    service: "Gmail", // Example: 'Gmail', 'Outlook', etc.
    auth: {
      user: "nicanorkorir008@gmail.com", // Your email address
      pass: `zokb wcto vuws konk` // Your email password or an app-specific password
    }
  });

  // Define email options
  let mailOptions = {
    from: "Centi <nicanorkorir008@gmail.com>", // Sender name and email address
    to: to,
    subject: subject,
    text: text
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Return false if email sending failed
  }
}

export default sendEmail;
