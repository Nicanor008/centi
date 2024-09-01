"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _winston = require("winston");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
require("winston-daily-rotate-file");
const fileEnvs = ["production", "development"];
const env = process.env.NODE_ENV || "development";
const logDir = "logs";

// Create  the log directory if it does not exist.
if (!_fs.default.existsSync(logDir)) {
  _fs.default.mkdirSync(logDir);
}
const logger = (0, _winston.createLogger)({
  level: "info",
  format: _winston.format.combine(_winston.format.label({
    label: _path.default.basename(module.parent.filename)
  }), _winston.format.colorize(), _winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }), _winston.format.splat(),
  // https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args
  _winston.format.printf(
  // We display the label text between square brackets using ${info.label} on the next line
  info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)),
  transports: [new _winston.transports.Console({
    level: env === "development" ? "info" : "error"
    // format: format.simple(),
  })]
});
if (fileEnvs.includes(env)) {
  logger.add(new _winston.transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-combined.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
  }));
  logger.add(new _winston.transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-error.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "error"
  }));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
var _default = exports.default = logger;