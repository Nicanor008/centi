"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config.controller"));
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _auth.default.required, _auth.default.isAdmin(), _config.default.create);
router.put("/:id", _auth.default.required, _auth.default.isAdmin(), _config.default.update);
router.get("/", _auth.default.required, _auth.default.isAdmin(), _config.default.findAll);
router.get("/all", _config.default.listConfigsForApp);
router.get("/:id", _auth.default.required, _auth.default.isAdmin(), _config.default.findOne);
router.delete("/:id", _auth.default.required, _auth.default.isAdmin(), _config.default.remove);
var _default = exports.default = router;