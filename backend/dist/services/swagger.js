"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const swagger = () => {
  const swaggerDefinition = {
    // openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "Centi",
      // Title (required)
      version: "1.0.0" // Version (required)
    },
    basePath: "/api/v1",
    // Base path (optional)
    schemes: process.env.SWAGGER_SCHEMA_HTTPS === "true" ? ["https"] : ["http", "https"],
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    }
  };
  const options = {
    swaggerDefinition,
    apis: ["src/api/**/*.js", "src/api/**/**/*.js"] // <-- not in the definition, but in the options
  };
  const swaggerSpec = (0, _swaggerJsdoc.default)(options);
  const swOptions = {
    explorer: true,
    customCss: ".swagger-ui .opblock-body pre span {color: #DCD427 !important} .swagger-ui .opblock-body pre {color: #DCD427} .swagger-ui textarea.curl {color: #DCD427} .swagger-ui .response-col_description__inner div.markdown, .swagger-ui .response-col_description__inner div.renderedMarkdown {color: #DCD427}"
  };
  return [_swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpec, swOptions)];
};
var _default = exports.default = swagger;