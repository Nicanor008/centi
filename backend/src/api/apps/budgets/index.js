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
 *       - field1
 *       - field2
 *     properties:
 *       field1:
 *         type: string
 *       field2:
 *         type: string
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
router.delete("/:id", AuthService.required, budgetController.remove);

router.get(
  "/dashboard/analytics/",
  AuthService.required,
  budgetController.budgetAnalytics
);

export default router;
