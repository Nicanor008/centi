const debug = require("debug")("app:http");
import http from "http";
import app from "./app"; // the actual Express app

const PORT = process.env.PORT || 4005;
const server = http.createServer(app);

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
