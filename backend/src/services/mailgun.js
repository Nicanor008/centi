import Mailgun from "mailgun.js";
import formData from "form-data";
import config from "../config";

// TODO: Remove mailgun, doesn't work at the moment. I'll be using Nodemailer instead
class MailgunConnect {
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: "api",
        key: config.mailgun.apiKey
      });
      this.instance = mg;
    }

    return this.instance;
  }
}

const domain = config.mailgun.domain;
const fromEmail = "Centi <mailgun@sandbox-123.mailgun.org>";

export const sendPasswordResetEmail = async (to, passcode) => {
  try {
    const data = {
      from: fromEmail,
      to: to,
      subject: "Reset Password App",
      // text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      // 'Please use the passcode below:\n\n' +
      // '--' + passcode + '-- \n\n' +
      // 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      html:
        "<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>" +
        "<p>Please use the passcode below:</p>" +
        "<b>" +
        passcode +
        "</b>" +
        "<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>"
    };
    const mg = MailgunConnect.getInstance();
    const msg = await mg.messages.create(domain, data);
    return msg;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async options => {
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
