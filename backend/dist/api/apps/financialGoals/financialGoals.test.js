"use strict";

var _assert = _interopRequireDefault(require("assert"));
var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../../app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const api = (0, _supertest.default)(_app.default);
describe("Basic Mocha String Test", function () {
  it("should return number of characters in a string", function () {
    _assert.default.equal("Hello".length, 5);
  });
  it("should return first character of the string", function () {
    _assert.default.equal("Hello".charAt(0), "H");
  });
});