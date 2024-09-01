"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _dashboard = _interopRequireDefault(require("./dashboard.controller"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _dashboard2 = require("./dashboard.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   Dashboard:
 *     type: object
 *     required:
 *       - field1
 *       - field2
 *     properties:
 *       field1:
 *         type: string
 *       field2:
 *         type: string
 *
 *   ArrayOfDashboards:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Dashboard"
 */

/**
 * @swagger
 *
 * /dashboards:
 *   post:
 *     tags: [dashboards]
 *     description: create a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Dashboard"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _dashboard2.createValidationSchema
})], _dashboard.default.create);

/**
 * @swagger
 *
 * /dashboards:
 *   put:
 *     tags: [dashboards]
 *     description: create a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Dashboard"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _dashboard2.updateValidationSchema
}), _dashboard.default.update);

/**
 * @swagger
 *
 * /dashboards:
 *   get:
 *     tags: [dashboards]
 *     description: get all dashboards
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: "#/parameters/pageParam"
 *       - $ref: "#/parameters/limitParam"
 *     responses:
 *        200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *              page:
 *                type: integer
 *                format: int32
 *              pages:
 *                type: integer
 *                format: int32
 *              limit:
 *                type: integer
 *                format: int32
 *              total:
 *                type: integer
 *                format: int32
 *              data:
 *                $ref: "#/definitions/ArrayOfDashboards"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.required, _dashboard.default.analytics);

/**
 * @swagger
 *
 * /dashboards/{id}:
 *   get:
 *     tags: [dashboards]
 *     description: get detail dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dashboard id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _dashboard.default.findOne);

/**
 * @swagger
 *
 * /dashboards/{id}:
 *   delete:
 *     tags: [dashboards]
 *     description: delete a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dashboards id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _dashboard.default.remove);
var _default = exports.default = router;