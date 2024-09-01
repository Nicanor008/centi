"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdminAccount = void 0;
var _config = _interopRequireDefault(require("../config"));
var _users = _interopRequireDefault(require("../api/users/users.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAdminAccount = async () => {
  const defaultEmail = _config.default.admin.email;
  const defaultPassword = _config.default.admin.password;
  const admin = await _users.default.findOne({
    email: defaultEmail
  });
  // console.log('======admin======', admin);
  if (!admin) {
    await _users.default.create({
      email: defaultEmail,
      fullName: "admin",
      password: defaultPassword,
      role: "admin"
    });
  } else {
    admin.password = defaultPassword;
    await admin.save();
  }
};
exports.createAdminAccount = createAdminAccount;