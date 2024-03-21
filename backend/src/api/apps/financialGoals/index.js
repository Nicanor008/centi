import express from "express";
import { celebrate } from "celebrate";
import financialGoalsController from "./financialGoals.controller";
import AuthService from "../../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema
} from "./financialGoals.validation";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   FinancialGoals:
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
 *   ArrayOfFinancialGoals:
 *      type: array
 *      items:
 *        $ref: "#/definitions/FinancialGoals"
 */

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

router.post(
  "/",
  AuthService.required,
  celebrate({ body: createValidationSchema }),
  financialGoalsController.create
);

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

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  financialGoalsController.update
);

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
router.get(
  "/",
  AuthService.required,
  celebrate({ query: customPaginateValidateSchema }),
  financialGoalsController.viewAllGoals
);

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
router.get("/:id", AuthService.required, financialGoalsController.findOneById);

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
router.delete("/:id", AuthService.required, financialGoalsController.remove);

export default router;
