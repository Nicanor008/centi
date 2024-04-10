import Mailgun from "mailgun.js";
import formData from "form-data";
import config from "../config";
// import { logger } from "../services";

class MailgunConnect {
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: "api",
        key: config.mailgun.apiKey
      });
      console.log(domain, ";;;;;;;;;;;;;;;;-----------------;;", mg);
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
    // const mailOptions = {
    //   from: fromEmail,
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html
    // };
    // const mg = MailgunConnect.getInstance();
    // const tt = await mg.messages.create("sandbox-123.mailgun.org", {
    //   from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    //   to: ["test@example.com"],
    //   subject: "Hello",
    //   text: "Testing some Mailgun awesomeness!",
    //   html: "<h1>Testing some Mailgun awesomeness!</h1>"
    // });
    // return tt;
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "NicKie",
      key: "c83651752ad631f7783f7f852d1bcd15-4b670513-f1c036f3",
      url: "https://api.eu.mailgun.net"
    });

    mg.messages
      .create("centi.nicanor.me", {
        from: "Excited User <mailgun@centi.nicanor.me>",
        to: ["test@example.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log("MAIL---GUN Error;", err));
  } catch (error) {
    console.log(error);
  }
};
