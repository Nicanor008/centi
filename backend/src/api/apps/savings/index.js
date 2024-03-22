import express from "express";
import { celebrate } from "celebrate";
import savingsController from "./savings.controller";
import AuthService from "../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema
} from "./savings.validation";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   Savings:
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
 *   ArrayOfSavings:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Savings"
 */

/**
 * @swagger
 *
 * /savings:
 *   post:
 *     tags: [savings]
 *     description: create a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Savings"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post(
  "/",
  [AuthService.required, celebrate({ body: createValidationSchema })],
  savingsController.create
);

/**
 * @swagger
 *
 * /savings:
 *   put:
 *     tags: [savings]
 *     description: create a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Savings"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  savingsController.update
);

/**
 * @swagger
 *
 * /savings:
 *   get:
 *     tags: [savings]
 *     description: get all savings
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
 *                $ref: "#/definitions/ArrayOfSavings"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get(
  "/",
  AuthService.required,
  celebrate({ query: customPaginateValidateSchema }),
  savingsController.findAll
);

/**
 * @swagger
 *
 * /savings/{id}:
 *   get:
 *     tags: [savings]
 *     description: get detail savings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: savings id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", savingsController.findOne);

/**
 * @swagger
 *
 * /savings/{id}:
 *   delete:
 *     tags: [savings]
 *     description: delete a savings
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: savings id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Savings"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", AuthService.required, savingsController.remove);

export default router;
