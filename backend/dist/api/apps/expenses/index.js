"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _expenses = require("./expenses.validation");
var _expenses2 = _interopRequireDefault(require("./expenses.controller"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   expenses:
 *     type: object
 *     required:
 *       - name
 *       - budgetId
 *       - userId
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       description:
 *         type: string
 *         required: false
 *       plannedExpenses:
 *         type: number
 *         required: false
 *       actualExpenses:
 *         type: number
 *         required: false
 *       isRecurring:
 *         type: boolean
 *         required: false
 *       budgetId:
 *         type: string
 *         required: true
 *       category:
 *         type: string
 *         required: false
 *       financialGoal:
 *         type: string
 *         required: false
 *       userId:
 *         type: string
 *         required: true
 *
 *   ArrayOfexpenses:
 *      type: array
 *      items:
 *        $ref: "#/definitions/expenses"
 */

/**
 * @swagger
 *
 * /expenses:
 *   post:
 *     tags: [expenses]
 *     description: create a expenses
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/expenses"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/expenses"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _expenses.createValidationSchema
})], _expenses2.default.createBudgetItems);
router.patch("/:id", _auth.default.required, (0, _celebrate.celebrate)({
  body: _expenses.updateValidationSchema
}), _expenses2.default.updateBudget);

/**
 * @swagger
 *
 * /expenses:
 *   put:
 *     tags: [expenses]
 *     description: create a expenses
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/expenses"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/expenses"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _expenses.updateValidationSchema
}), _expenses2.default.update);

/**
 * @swagger
 *
 * /expenses:
 *   get:
 *     tags: [expenses]
 *     description: get all expenses
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
 *                $ref: "#/definitions/ArrayOfexpenses"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _expenses.customPaginateValidateSchema
}), _expenses2.default.findAll);

/**
 * @swagger
 *
 * /expenses/{id}:
 *   get:
 *     tags: [expenses]
 *     description: get detail expenses
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: expenses id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/expenses"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", _expenses2.default.findOne);

/**
 * @swagger
 *
 * /expenses/{id}:
 *   delete:
 *     tags: [expenses]
 *     description: delete a expenses
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: expenses id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/expenses"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _expenses2.default.deleteBudgetItem);

// get all budget items within one budget
router.get("/budget/:budgetId", _auth.default.required, _expenses2.default.getBudgetItemsForOneBudget);
var _default = exports.default = router;