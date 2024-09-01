"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../../app"));
var _users = _interopRequireDefault(require("../users/users.model"));
var _auth = _interopRequireDefault(require("../auth/auth.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const api = (0, _supertest.default)(_app.default);
beforeEach(async () => {
  await _users.default.deleteOne({
    email: "test@test.com"
  });
  await _users.default.deleteOne({
    email: "testLogin@test.com"
  });
  await _auth.default.signup({
    email: "testLogin@test.com",
    password: "123456",
    fullName: "TestLogin"
  });
});
describe("GET /login", function () {
  it("should return 200", async function () {
    await api.post("/api/v1/auth/login").send({
      email: "testLogin@test.com",
      password: "123456"
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(200);
  });
});
describe("GET /signup", function () {
  it("should return 201", async function () {
    await api.post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "123456",
      fullName: "Test"
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(201);
  });
});