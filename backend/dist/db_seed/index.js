"use strict";

var _config = _interopRequireDefault(require("../config"));
var _services = require("../services");
var _user_seeder = require("./user_seeder");
var _users = _interopRequireDefault(require("../api/users/users.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(async () => {
  try {
    _services.logger.info("=======seeding data===========");
    await _services.mongoose.connect(_config.default.mongodb.url, _config.default.mongodb.options);
    await (0, _user_seeder.createAdminAccount)();
    await _users.default.syncIndexes();
    _services.logger.info("=======seeded data was successfully===========");
  } catch (error) {
    _services.logger.error("==============error==========%j", error);
  }
})();