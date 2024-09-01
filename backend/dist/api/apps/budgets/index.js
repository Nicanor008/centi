"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _budget = _interopRequireDefault(require("./budget.controller"));
var _budget2 = require("./budget.validation");
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   Budget:
 *     type: object
 *     required:
 *       - name
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
 *       plannedIncome:
 *         type: string
 *         required: false
 *       actualIncome:
 *         type: string
 *         required: false
 *       isRecurring:
 *         type: boolean
 *         required: false
 *       isActive:
 *         type: string
 *         required: true
 *       category:
 *         type: array
 *         required: false
 *       financialGoal:
 *         type:  string
 *         required: false
 *       userId:
 *         type:  string
 *         required: true
 * 
 *
 *   ArrayOfBudgets:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Budget"
 */

/**
 * @swagger
 *
 * /budgets:
 *   post:
 *     tags: [budgets]
 *     description: create a budget
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Budget"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Budget"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", _auth.default.required, (0, _celebrate.celebrate)({
  body: _budget2.createValidationSchema
}), _budget.default.createBudget);
router.patch("/:id", _auth.default.required, (0, _celebrate.celebrate)({
  body: _budget2.updateValidationSchema
}), _budget.default.updateBudget);

/**
 * @swagger
 *
 * /budgets:
 *   put:
 *     tags: [budgets]
 *     description: create a budget
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Budget"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Budget"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _budget2.updateValidationSchema
}), _budget.default.update);

/**
 * @swagger
 *
 * /budgets:
 *   get:
 *     tags: [budgets]
 *     description: get all budgets
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
 *                $ref: "#/definitions/ArrayOfBudgets"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _budget2.customPaginateValidateSchema
}), _budget.default.viewAllBudgets);

/**
 * @swagger
 *
 * /budgets/{id}:
 *   get:
 *     tags: [budgets]
 *     description: get detail budget
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: budget id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Budget"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:budgetId", _budget.default.findOneBudgetById);

/**
 * @swagger
 *
 * /budgets/{id}:
 *   delete:
 *     tags: [budgets]
 *     description: delete a budget
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: budgets id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Budget"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", _auth.default.required, _budget.default.deleteBudget);
router.get("/dashboard/analytics/", _auth.default.required, _budget.default.budgetAnalytics);
var _default = exports.default = router;