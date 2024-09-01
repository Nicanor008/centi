"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _apiQueryParams = _interopRequireDefault(require("api-query-params"));
var _response = _interopRequireDefault(require("../response"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Controller {
  constructor(service, name) {
    this.service = service;
    this._name = name;
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.get_queryset = this.get_queryset.bind(this);
  }
  async create(req, res, next) {
    try {
      const data = req.body;
      const result = await this.service.create(data);
      return _response.default.success(res, result);
    } catch (exception) {
      next(exception);
    }
  }
  get_queryset(req) {
    let params = (0, _apiQueryParams.default)(req.query, {
      skipKey: "page"
    });
    return params;
  }
  async findAll(req, res, next) {
    try {
      const query = this.get_queryset(req);
      const result = await this.service.findAll(query);
      return _response.default.success(res, result);
    } catch (exception) {
      next(exception);
    }
  }
  async findOne(req, res, next) {
    try {
      const result = await this.service.findById(req.params.id);
      console.log("...........resutl....", result);
      if (!result) {
        return _response.default.error(res, {
          code: `${this._name.toUpperCase()}_NOT_FOUND`,
          message: `${this._name} does not found with id ${req.params.id}`
        }, _httpStatus.default.NOT_FOUND);
      }
      return _response.default.success(res, result);
    } catch (exception) {
      next(exception);
    }
  }
  async update(req, res, next) {
    try {
      const result = await this.service.update(req.params.id, req.body, {
        new: true
      });
      if (!result) {
        return _response.default.error(res, {
          code: `${this._name.toUpperCase()}_NOT_FOUND`,
          message: `${this._name} does not found with id ${req.params.id}`
        }, _httpStatus.default.NOT_FOUND);
      }
      return _response.default.success(res, result);
    } catch (exception) {
      next(exception);
    }
  }
  async remove(req, res, next) {
    try {
      const result = await this.service.remove(req.params.id);
      if (!result) {
        return _response.default.error(res, {
          code: `${this._name.toUpperCase()}_NOT_FOUND`,
          message: `${this._name} does not found with id ${req.params.id}`
        }, _httpStatus.default.NOT_FOUND);
      }
      return _response.default.success(res, result);
    } catch (exception) {
      next(exception);
    }
  }
}
var _default = exports.default = Controller;