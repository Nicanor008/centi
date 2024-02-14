import express from "express";
import { celebrate } from "celebrate";
import investmentController from "./investment.controller";
import AuthService from "../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema,
} from "./investment.validation";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   Investment:
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
 *   ArrayOfInvestments:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Investment"
 */

/**
 * @swagger
 *
 * /investments:
 *   post:
 *     tags: [investments]
 *     description: create a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Investment"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post(
  "/",
  [AuthService.required, celebrate({ body: createValidationSchema })],
  investmentController.create
);

/**
 * @swagger
 *
 * /investments:
 *   put:
 *     tags: [investments]
 *     description: create a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Investment"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  investmentController.update
);

/**
 * @swagger
 *
 * /investments:
 *   get:
 *     tags: [investments]
 *     description: get all investments
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
 *                $ref: "#/definitions/ArrayOfInvestments"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get(
  "/",
  AuthService.optional,
  celebrate({ query: customPaginateValidateSchema }),
  investmentController.findAll
);

/**
 * @swagger
 *
 * /investments/{id}:
 *   get:
 *     tags: [investments]
 *     description: get detail investment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: investment id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", investmentController.findOne);

/**
 * @swagger
 *
 * /investments/{id}:
 *   delete:
 *     tags: [investments]
 *     description: delete a investment
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: investments id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Investment"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", AuthService.required, investmentController.remove);


export default router;
