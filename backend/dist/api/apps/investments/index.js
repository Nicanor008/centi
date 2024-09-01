"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _investment = _interopRequireDefault(require("./investment.controller"));
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
var _investment2 = require("./investment.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   Investment:
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
 *   ArrayOfInvestments:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Investment"
 */

/**
 * @swagger
 *
 * /investments:
 *   post:
 *     tags: [investments]
 *     description: create a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Investment"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _investment2.createValidationSchema
})], _investment.default.create);

/**
 * @swagger
 *
 * /investments:
 *   put:
 *     tags: [investments]
 *     description: create a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Investment"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _investment2.updateValidationSchema
}), _investment.default.update);

/**
 * @swagger
 *
 * /investments:
 *   get:
 *     tags: [investments]
 *     description: get all investments
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
 *                $ref: "#/definitions/ArrayOfInvestments"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.optional, (0, _celebrate.celebrate)({
  query: _investment2.customPaginateValidateSchema
}), _investment.default.findAll);

/**
 * @swagger
 *
 * /investments/{id}:
 *   get:
 *     tags: [investments]
 *     description: get detail investment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: investment id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _investment.default.findOne);

/**
 * @swagger
 *
 * /investments/{id}:
 *   delete:
 *     tags: [investments]
 *     description: delete a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: investments id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _investment.default.remove);
var _default = exports.default = router;