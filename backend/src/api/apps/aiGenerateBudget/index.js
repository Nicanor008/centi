import express from "express";
import AIGeneratedBudgetController from "./aiGeneratedBudget.controller";
// import {
//   createValidationSchema,
//   updateValidationSchema,
//   customPaginateValidateSchema
// } from "./budget.validation";
// import AuthService from "../../../middlewares/auth";

const router = express.Router();

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

router.post(
  "/",
  // AuthService.required,
  AIGeneratedBudgetController.createBudget
);

router.patch(
  "/:id",
  // AuthService.required,
  AIGeneratedBudgetController.updateBudget
);

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

export default router;
