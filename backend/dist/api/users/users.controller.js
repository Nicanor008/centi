"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _users = _interopRequireDefault(require("./users.service"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
    this.updateMe = this.updateMe.bind(this);
    this.getMe = this.getMe.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }
  async changePassword(req, res, next) {
    try {
      const user = req.user;
      const {
        currentPassword,
        newPassword
      } = req.body;
      const result = await this.service.handleChangePassword(user, currentPassword, newPassword);
      return _helpers.handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  async updateMe(req, res, next) {
    try {
      let result = await this.service.handleUpdateMe(req.user._id, req.body);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async getMe(req, res, next) {
    try {
      let result = await this.service.handleGetMe(req.user);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async deleteAccount(req, res, next) {
    try {
      const user = req.user;
      const result = await this.service.deleteAccount(user);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}
var _default = exports.default = new UserController(_users.default, "User");