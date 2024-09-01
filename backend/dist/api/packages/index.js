"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
var _packages = _interopRequireDefault(require("./packages.controller"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _auth.default.required, _auth.default.isAdmin(), _packages.default.create);
router.get("/", _packages.default.findAll);
router.get("/:id", _packages.default.findOne);
router.put("/:id", _auth.default.required, _auth.default.isAdmin(), _packages.default.update);
router.delete("/:id", _auth.default.required, _auth.default.isAdmin(), _packages.default.remove);
var _default = exports.default = router;