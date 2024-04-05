import express from "express";
import { celebrate } from "celebrate";
import dashboardController from "./dashboard.controller";
import AuthService from "../../../middlewares/auth";
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema
} from "./dashboard.validation";

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   Dashboard:
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
 *   ArrayOfDashboards:
 *      type: array
 *      items:
 *        $ref: "#/definitions/Dashboard"
 */

/**
 * @swagger
 *
 * /dashboards:
 *   post:
 *     tags: [dashboards]
 *     description: create a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Dashboard"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.post(
  "/",
  [AuthService.required, celebrate({ body: createValidationSchema })],
  dashboardController.create
);

/**
 * @swagger
 *
 * /dashboards:
 *   put:
 *     tags: [dashboards]
 *     description: create a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Dashboard"
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */

router.put(
  "/:id",
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  dashboardController.update
);

/**
 * @swagger
 *
 * /dashboards:
 *   get:
 *     tags: [dashboards]
 *     description: get all dashboards
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
 *                $ref: "#/definitions/ArrayOfDashboards"
 *        401:
 *          $ref: "#/responses/Unauthorized"
 */
router.get("/", AuthService.required, dashboardController.analytics);

/**
 * @swagger
 *
 * /dashboards/{id}:
 *   get:
 *     tags: [dashboards]
 *     description: get detail dashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dashboard id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.get("/:id", dashboardController.findOne);

/**
 * @swagger
 *
 * /dashboards/{id}:
 *   delete:
 *     tags: [dashboards]
 *     description: delete a dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: dashboards id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Dashboard"
 *      400:
 *        $ref: "#/responses/Error"
 *      401:
 *        $ref: "#/responses/Unauthorized"
 */
router.delete("/:id", AuthService.required, dashboardController.remove);

export default router;
