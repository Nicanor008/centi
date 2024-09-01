"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _savings = _interopRequireDefault(require("./savings.controller"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _savings2 = require("./savings.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   Savings:
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
 *   ArrayOfSavings:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Savings"
 */

/**
 * @swagger
 *
 * /savings:
 *   post:
 *     tags: [savings]
 *     description: create a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Savings"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _savings2.createValidationSchema
})], _savings.default.create);

/**
 * @swagger
 *
 * /savings:
 *   put:
 *     tags: [savings]
 *     description: create a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Savings"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _savings2.updateValidationSchema
}), _savings.default.update);

/**
 * @swagger
 *
 * /savings:
 *   get:
 *     tags: [savings]
 *     description: get all savings
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
 *                $ref: "#/definitions/ArrayOfSavings"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _savings2.customPaginateValidateSchema
}), _savings.default.findAll);

/**
 * @swagger
 *
 * /savings/{id}:
 *   get:
 *     tags: [savings]
 *     description: get detail savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: savings id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _savings.default.findOne);

/**
 * @swagger
 *
 * /savings/{id}:
 *   delete:
 *     tags: [savings]
 *     description: delete a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: savings id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _savings.default.remove);
var _default = exports.default = router;