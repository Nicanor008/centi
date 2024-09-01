"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = require("nodemailer");
var _config = _interopRequireDefault(require("../../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function sendEmail(to, subject, text) {
  let transporter = (0, _nodemailer.createTransport)({
    service: "Gmail",
    // Example: 'Gmail', 'Outlook', etc.
    auth: {
      user: _config.default.MAIL_USERNAME,
      // Your email address
      pass: _config.default.MAIL_PASS // Your email password or an app-specific password
    }
  });

  // Define email options
  let mailOptions = {
    from: `Centi <${_config.default.MAIL_USERNAME}>`,
    // Sender name and email address
    to: to,
    subject: subject,
    html: text
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
var _default = exports.default = sendEmail;