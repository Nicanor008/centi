"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _handleErrors = require("./helpers/handle-errors");
var _services = require("./services");
var _api = _interopRequireDefault(require("./api"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
require("./services/passport");
const rootApi = "/api/v1";
const ROOT_FOLDER = _path.default.join(__dirname, "..");
const SRC_FOLDER = _path.default.join(ROOT_FOLDER, "src");
const app = (0, _express.default)();
app.set("trust proxy", 1); // trust first proxy

// Security
app.use((0, _helmet.default)());
app.use((0, _cors.default)());
app.disable("x-powered-by");

// compression
app.use((0, _compression.default)());
app.use((0, _cookieParser.default)());
// logs http request
app.use((0, _morgan.default)(process.env.LOG_FORMAT || "dev", {
  stream: _services.logger.stream
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

// parse requests of content-type - application/json
app.use(_bodyParser.default.json());
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'http://centi-6k7v.onrender.com', 'https://centi-6k7v.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

// session
app.use((0, _expressSession.default)({
  secret: _config.default.session.secret,
  resave: true,
  saveUninitialized: true
}));

// passport
app.use(_passport.default.initialize());

// TODO: Apply rate limitting before paid releases
// rate limit
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false // Disable the `X-RateLimit-*` headers
// });
// app.use(limiter);

// database
_services.mongoose.connect("mongodb+srv://centiPowered:NtUcs4SMyEIqhbCa@centi.nczzw7x.mongodb.net/test?retryWrites=true&w=majority");
app.use(_express.default.static(_path.default.join(ROOT_FOLDER, "build"), {
  index: false
}));
app.use("/static", _express.default.static(_path.default.join(SRC_FOLDER, "public")));
app.use("/media", _express.default.static(_path.default.join(ROOT_FOLDER, "uploads")));
app.get("/", (req, res) => res.json({
  message: "Welcome to centi API!"
}));

// TODO: Update API documentation, with latest schema data
app.use("/api-docs", (0, _services.swagger)());
app.use(rootApi, _api.default);

// TODO: use this once I've the admin portal ready
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("/admin", (req, res) => {
//   res.sendFile(path.join(ROOT_FOLDER, "build", "index.html"));
// });

app.use(_handleErrors.notFoundHandle);
app.use(_handleErrors.logErrors);
app.use(_handleErrors.errorHandle);
var _default = exports.default = app;