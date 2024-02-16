import express from "express";
import { celebrate } from "celebrate";
import budgetItemsController from "./budgetItems.controller";
import AuthService from "../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema,
} from "./budgetItems.validation";

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
  budgetItemsController.create
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
  budgetItemsController.update
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
  AuthService.optional,
  celebrate({ query: customPaginateValidateSchema }),
  budgetItemsController.findAll
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
router.get("/:id", budgetItemsController.findOne);

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
router.delete("/:id", AuthService.required, budgetItemsController.remove);


export default router;
