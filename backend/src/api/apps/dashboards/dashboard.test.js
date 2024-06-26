import assert from "assert";
import supertest from "supertest";
import app from "../../../app";

const api = supertest(app);

describe("Basic Mocha String Test", function() {
  it("should return number of characters in a string", function() {
    assert.equal("Hello".length, 5);
  });
  it("should return first character of the string", function() {
    assert.equal("Hello".charAt(0), "H");
  });
});
