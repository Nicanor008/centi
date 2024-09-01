"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _aiGeneratedBudget = _interopRequireDefault(require("./aiGeneratedBudget.controller"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import {
//   createValidationSchema,
//   updateValidationSchema,
//   customPaginateValidateSchema
// } from "./budget.validation";

const router = _express.default.Router();

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

router.post("/", _auth.default.required, _aiGeneratedBudget.default.createBudget);
router.get("/", _auth.default.required, _aiGeneratedBudget.default.viewAllGeneratedBudget);
router.patch("/:id", _auth.default.required, _aiGeneratedBudget.default.updateBudget);

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
var _default = exports.default = router;