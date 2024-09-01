"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _financialGoals = _interopRequireDefault(require("./financialGoals.controller"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _financialGoals2 = require("./financialGoals.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

/**
 * @swagger
 *
 * /financialGoals:
 *   post:
 *     tags: [financialGoals]
 *     description: create a financialGoals
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/FinancialGoals"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/FinancialGoals"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", _auth.default.required, (0, _celebrate.celebrate)({
  body: _financialGoals2.createValidationSchema
}), _financialGoals.default.create);

/**
 * @swagger
 *
 * /financialGoals:
 *   put:
 *     tags: [financialGoals]
 *     description: create a financialGoals
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/FinancialGoals"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/FinancialGoals"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _financialGoals2.updateValidationSchema
}), _financialGoals.default.update);

/**
 * @swagger
 *
 * /financialGoals:
 *   get:
 *     tags: [financialGoals]
 *     description: get all financialGoals
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
 *                $ref: "#/definitions/ArrayOfFinancialGoals"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _financialGoals2.customPaginateValidateSchema
}), _financialGoals.default.viewAllGoals);

/**
 * @swagger
 *
 * /financialGoals/{id}:
 *   get:
 *     tags: [financialGoals]
 *     description: get detail financialGoals
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: financialGoals id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/FinancialGoals"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _auth.default.required, _financialGoals.default.findOneById);

/**
 * @swagger
 *
 * /financialGoals/{id}:
 *   delete:
 *     tags: [financialGoals]
 *     description: delete a financialGoals
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: financialGoals id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/FinancialGoals"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _financialGoals.default.remove);

// group all budget, savings per the financial goal
router.get("/group/all", _auth.default.required, _financialGoals.default.groupedFinancialGoals);
var _default = exports.default = router;