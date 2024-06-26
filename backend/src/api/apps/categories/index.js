import express from "express";
import { celebrate } from "celebrate";
import categoryController from "./category.controller";
import AuthService from "../../../middlewares/auth";
import {
  updateValidationSchema,
  customPaginateValidateSchema
} from "./category.validation";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   Category:
 *     type: object
 *     required:
 *       - name
 *       - userId
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       userId:
 *         type: string
 *         required: true 
 *
 *   ArrayOfCategories:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Category"
 */

/**
 * @swagger
 *
 * /categories:
 *   post:
 *     tags: [categories]
 *     description: create a category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Category"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Category"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post("/", AuthService.required, categoryController.create);

/**
 * @swagger
 *
 * /categories:
 *   put:
 *     tags: [categories]
 *     description: create a category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Category"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Category"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put(
  "/:id",
  [AuthService.required, celebrate({ body: updateValidationSchema })],
  categoryController.update
);

/**
 * @swagger
 *
 * /categories:
 *   get:
 *     tags: [categories]
 *     description: get all categories
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
 *                $ref: "#/definitions/ArrayOfCategories"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
// router.get(
//   "/",
//   AuthService.required,
//   celebrate({ query: customPaginateValidateSchema }),
//   categoryController.viewAllCategoriesPerUser
// );

router.get(
  "/",
  AuthService.required,
  celebrate({ query: customPaginateValidateSchema }),
  categoryController.viewAllCategoriesPerUser
);

/**
 * @swagger
 *
 * /categories/{id}:
 *   get:
 *     tags: [categories]
 *     description: get detail category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: category id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Category"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", AuthService.required, categoryController.findOne);

/**
 * @swagger
 *
 * /categories/{id}:
 *   delete:
 *     tags: [categories]
 *     description: delete a category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: categories id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Category"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", AuthService.required, categoryController.remove);

export default router;
