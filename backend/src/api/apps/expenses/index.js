import express from "express";
import { celebrate } from "celebrate";
import AuthService from "../../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema
} from "./expenses.validation";
import ExpensesController from "./expenses.controller";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   BudgetItems:
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
 *   ArrayOfBudgetItems:
 *      type: array
 *      items:
 *        $ref: "#/definitions/BudgetItems"
 */

/**
 * @swagger
 *
 * /budgetItems:
 *   post:
 *     tags: [budgetItems]
 *     description: create a budgetItems
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/BudgetItems"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BudgetItems"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post(
  "/",
  [AuthService.required, celebrate({ body: createValidationSchema })],
  ExpensesController.createBudgetItems
);

router.patch(
  "/:id",
  AuthService.required,
  celebrate({ body: updateValidationSchema }),
  ExpensesController.updateBudget
);

/**
 * @swagger
 *
 * /budgetItems:
 *   put:
 *     tags: [budgetItems]
 *     description: create a budgetItems
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/BudgetItems"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BudgetItems"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  ExpensesController.update
);

/**
 * @swagger
 *
 * /budgetItems:
 *   get:
 *     tags: [budgetItems]
 *     description: get all budgetItems
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
 *                $ref: "#/definitions/ArrayOfBudgetItems"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get(
  "/",
  AuthService.required,
  celebrate({ query: customPaginateValidateSchema }),
  ExpensesController.findAll
);

/**
 * @swagger
 *
 * /budgetItems/{id}:
 *   get:
 *     tags: [budgetItems]
 *     description: get detail budgetItems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: budgetItems id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BudgetItems"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", ExpensesController.findOne);

/**
 * @swagger
 *
 * /budgetItems/{id}:
 *   delete:
 *     tags: [budgetItems]
 *     description: delete a budgetItems
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: budgetItems id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BudgetItems"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete(
  "/:id",
  AuthService.required,
  ExpensesController.deleteBudgetItem
);

// get all budget items within one budget
router.get(
  "/budget/:budgetId",
  AuthService.required,
  ExpensesController.getBudgetItemsForOneBudget
);

export default router;
