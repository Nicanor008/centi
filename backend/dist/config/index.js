"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
var _default = exports.default = {
  mongodb: {
    url: process.env.DATABASE_URL,
    secret: "!&!&OJpWXnDtB0eju7OE!zDp20G1JC%6bpq2",
    options: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD
    }
  },
  session: {
    secret: process.env.SESSION_SECRET
  },
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASS: process.env.MAIL_PASS,
  // facebook: {
  //   clientID: process.env.FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK_URL
  // },

  // google: {
  //   clientID: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   callbackURL: process.env.GOOGLE_CALLBACK_URL
  // },

  // firebase: {
  //   private_key: process.env.private_key,
  //   client_email: process.env.client_email,
  //   client_x509_cert_url: process.env.client_x509_cert_url
  // },

  jwt: {
    secret: process.env.JWT_SECRET
  },
  app: {
    ROLE: {
      ADMIN: "ADMIN"
    }
  },
  admin: {
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD
  },
  apn: {
    keyId: process.env.APN_KEY_ID,
    teamId: process.env.APN_TEAM_ID,
    topic: process.env.APN_TOPIC,
    production: process.env.APN_PRODUCTION
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  openai: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
  // profileUrl: {
  //   google_access_token: process.env.GOOGLE_USER_PROFILE_URL_ACCESS_TOKEN,
  //   google_id_token: process.env.GOOGLE_USER_PROFILE_URL_ID_TOKEN,
  //   facebook: process.env.FACEBOOK_USER_PROFILE_URL,
  //   apple: process.env.APPLE_USER_PROFILE_URL
  // }
};