import express from "express";
import { celebrate } from "celebrate";
import budgetController from "./budget.controller";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema
} from "./budget.validation";
import AuthService from "../../../middlewares/auth";

const router = express.Router();
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

router.post(
  "/",
  AuthService.required,
  celebrate({ body: createValidationSchema }),
  budgetController.createBudget
);

router.patch(
  "/:id",
  AuthService.required,
  celebrate({ body: updateValidationSchema }),
  budgetController.updateBudget
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

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  budgetController.update
);

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
router.get(
  "/",
  AuthService.required,
  celebrate({ query: customPaginateValidateSchema }),
  budgetController.viewAllBudgets
);

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
router.get("/:budgetId", budgetController.findOneBudgetById);

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
router.delete("/:id", AuthService.required, budgetController.deleteBudget);

router.get(
  "/dashboard/analytics/",
  AuthService.required,
  budgetController.budgetAnalytics
);

export default router;
