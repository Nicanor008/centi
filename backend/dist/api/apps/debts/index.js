"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _debt = _interopRequireDefault(require("./debt.controller"));
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
var _debt2 = require("./debt.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   Debt:
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
 *   ArrayOfDebts:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Debt"
 */

/**
 * @swagger
 *
 * /debts:
 *   post:
 *     tags: [debts]
 *     description: create a debt
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Debt"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Debt"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _debt2.createValidationSchema
})], _debt.default.create);

/**
 * @swagger
 *
 * /debts:
 *   put:
 *     tags: [debts]
 *     description: create a debt
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Debt"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Debt"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _debt2.updateValidationSchema
}), _debt.default.update);

/**
 * @swagger
 *
 * /debts:
 *   get:
 *     tags: [debts]
 *     description: get all debts
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
 *                $ref: "#/definitions/ArrayOfDebts"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.optional, (0, _celebrate.celebrate)({
  query: _debt2.customPaginateValidateSchema
}), _debt.default.findAll);

/**
 * @swagger
 *
 * /debts/{id}:
 *   get:
 *     tags: [debts]
 *     description: get detail debt
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: debt id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Debt"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _debt.default.findOne);

/**
 * @swagger
 *
 * /debts/{id}:
 *   delete:
 *     tags: [debts]
 *     description: delete a debt
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: debts id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Debt"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _debt.default.remove);
var _default = exports.default = router;