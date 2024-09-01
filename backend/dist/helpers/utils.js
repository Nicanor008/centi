"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNumber = exports.randomVerifiedCode = exports.randomInt = exports.parseMillisecond = exports.getDeviceId = exports.generateOtp = exports.decodeToken = exports.compareOtp = exports.asyncForEach = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const randomInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};
exports.randomInt = randomInt;
const randomVerifiedCode = () => {
  return randomInt(100000, 999999);
};
exports.randomVerifiedCode = randomVerifiedCode;
const toNumber = string => {
  return Number(string) || string === "0" ? Number(string) : string;
};
exports.toNumber = toNumber;
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
exports.asyncForEach = asyncForEach;
const parseMillisecond = ms => (0, _moment.default)(parseInt(ms));
exports.parseMillisecond = parseMillisecond;
const decodeToken = async token => {
  const decoded = _jsonwebtoken.default.decode(token, {
    complete: true
  });
  const {
    kid,
    alg
  } = decoded.header;
  // const client = jwksClient({
  //   jwksUri: "https://appleid.apple.com/auth/keys",
  //   requestHeaders: {}, // Optional
  //   timeout: 30000 // Defaults to 30s
  // });
  const key = "await client.getSigningKey(kid)";
  const signingKey = key.getPublicKey() || key.rsaPublicKey();
  return _jsonwebtoken.default.verify(token, signingKey, {
    algorithms: alg
  });
};
exports.decodeToken = decodeToken;
const getDeviceId = req => {
  const deviceId = req.headers["device-id"] || req.params.deviceId || "NONE";
  return deviceId;
};
exports.getDeviceId = getDeviceId;
const generateOtp = async () => {
  const otp = randomVerifiedCode();

  // await Promise.all([
  //   client.set(`${email}_otp`, otp, {
  //     EX: 180,
  //     NX: false
  //   }),
  //   client.set(`${email}_attempts`, 0, {
  //     EX: 180,
  //     NX: false
  //   })
  // ]);

  return otp;
};
exports.generateOtp = generateOtp;
const compareOtp = async (email, otpRequest) => {
  // const [numAttempts, otpStored] = await Promise.all([
  //   client.incr(`${email}_attempts`),
  //   client.get(`${email}_otp`)
  // ]);

  // if (!numAttempts || !otpStored) return false;

  if (parseInt(numAttempts) > 3) {
    console.log("Deleting OTP due to 3 failed attempts");
    // await Promise.all([
    //   client.del(`${email}_otp`),
    //   client.del(`${email}_attempts`)
    // ]);

    return false;
  }
  if (parseInt(otpStored) !== parseInt(otpRequest)) {
    return false;
  }

  // await Promise.all([
  //   client.del(`${email}_otp`),
  //   client.del(`${email}_attempts`)
  // ]);

  return true;
};
exports.compareOtp = compareOtp;