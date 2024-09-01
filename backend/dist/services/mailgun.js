"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPasswordResetEmail = exports.sendEmail = void 0;
var _mailgun = _interopRequireDefault(require("mailgun.js"));
var _formData = _interopRequireDefault(require("form-data"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO: Remove mailgun, doesn't work at the moment. I'll be using Nodemailer instead
class MailgunConnect {
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      const mailgun = new _mailgun.default(_formData.default);
      const mg = mailgun.client({
        username: "api",
        key: _config.default.mailgun.apiKey
      });
      this.instance = mg;
    }
    return this.instance;
  }
}
const domain = _config.default.mailgun.domain;
const fromEmail = "Centi <mailgun@sandbox-123.mailgun.org>";
const sendPasswordResetEmail = async (to, passcode) => {
  try {
    const data = {
      from: fromEmail,
      to: to,
      subject: "Reset Password App",
      // text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      // 'Please use the passcode below:\n\n' +
      // '--' + passcode + '-- \n\n' +
      // 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      html: "<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>" + "<p>Please use the passcode below:</p>" + "<b>" + passcode + "</b>" + "<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>"
    };
    const mg = MailgunConnect.getInstance();
    const msg = await mg.messages.create(domain, data);
    return msg;
  } catch (error) {
    console.log(error);
  }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendEmail = async options => {
  try {
    const mailOptions = {
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html
    };
    const mg = MailgunConnect.getInstance();
    const tt = await mg.messages.create("sandbox-123.mailgun.org", mailOptions);
    return tt;
  } catch (error) {
    console.log(error);
  }
};
exports.sendEmail = sendEmail;