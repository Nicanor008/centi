"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateLimitByUserPurchase = exports.rateLimitByUser = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _helpers = require("../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Limit each user to <limit> requests per `window` <duration>
 * @param {number} limit: number of allowed requests
 * @param {number} duration (in seconds)
 * @returns middleware
 */
const rateLimitByUser = (limit, duration) => {
  return (0, _expressRateLimit.default)({
    windowMs: duration * 1000,
    max: limit,
    standardHeaders: true,
    // Return rate limit info in the `RateLimit-*` headers
    message: {
      message: "Too many request from this IP, please try again after an minutes",
      code: "429"
    },
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  });
};
exports.rateLimitByUser = rateLimitByUser;
const rateLimitByUserPurchase = () => {
  return (0, _expressRateLimit.default)({
    windowMs: 24 * 60 * 60 * 1000,
    // eslint-disable-next-line no-unused-vars
    keyGenerator: (request, response) => {
      const mode = request.body.mode;
      const deviceId = _helpers.utils.getDeviceId(request);
      return `${mode}:${deviceId}`;
    },
    max: async (req, res) => {
      const deviceId = _helpers.utils.getDeviceId(req);
      // const checkPremium = await iapService.checkIapModel(deviceId);
      // if (!checkPremium) return config.maxRequestGpt;
      // return 0;
    },
    standardHeaders: true,
    // Return rate limit info in the `RateLimit-*` headers
    message: {
      message: "You've reached daily Limit",
      code: "429"
    },
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  });
};
exports.rateLimitByUserPurchase = rateLimitByUserPurchase;