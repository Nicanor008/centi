"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _category = _interopRequireDefault(require("./category.controller"));
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
var _category2 = require("./category.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
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

router.post("/", _auth.default.required, _category.default.create);

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

router.put("/:id", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _category2.updateValidationSchema
})], _category.default.update);

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

router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _category2.customPaginateValidateSchema
}), _category.default.viewAllCategoriesPerUser);

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
router.get("/:id", _auth.default.required, _category.default.findOne);

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
router.delete("/:id", _auth.default.required, _category.default.remove);
var _default = exports.default = router;