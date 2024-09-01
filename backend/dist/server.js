"use strict";

var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const debug = require("debug")("app:http");
// the actual Express app

const PORT = process.env.PORT || 4005;
const server = _http.default.createServer(_app.default);

// function onSignal() {
//   console.log("server is starting cleanup");
//   // start cleanup of resource, like databases or file descriptors
// }

// TODO: Update health check before official release
// async function onHealthCheck() {
//   const errors = [];
//   return Promise.all(
//     [
//       // all your health checks goes here
//       // database health checks
//       // api health checks
//       // frontend health checks
//     ].map(p =>
//       p.catch(error => {
//         errors.push(error);
//         return undefined;
//       })
//     )
//   ).then(() => {
//     if (errors.length) {
//       throw new HealthCheckError("healthcheck failed", errors);
//     }
//   });
// }

// createTerminus(server, {
//   signal: "SIGINT",
//   healthChecks: { "/healthcheck": onHealthCheck },
//   onSignal
// });

server.listen(PORT, () => {
  debug(`Server running on port ${PORT}`);
});