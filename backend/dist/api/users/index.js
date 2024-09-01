"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
var _users = _interopRequireDefault(require("./users.controller"));
var _helpers = require("../../helpers");
var _user = require("./user.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  objectIdSchema,
  paginateValidationSchema
} = _helpers.schemas;
const router = _express.default.Router();

/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags: [users]
 *     description: get all users
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/parameters/pageParam'
 *       - $ref: '#/parameters/limitParam'
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
 *                $ref: '#/definitions/ArrayOfUsers'
 *        401:
 *          $ref: '#/responses/Unauthorized'
 */
router.get("/", _auth.default.required, (0, _celebrate.celebrate)({
  query: _user.paginateUserValidateSchema
}), _users.default.findAll);
router.get("/me", _auth.default.required, _users.default.getMe);

/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     tags: [users]
 *     description: Get User by ID
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of user
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.get("/:id", _auth.default.required, (0, _celebrate.celebrate)({
  params: objectIdSchema
}), _users.default.findOne);
router.post("/me/change-password", _auth.default.required, (0, _celebrate.celebrate)({
  body: _user.changePasswordSchema
}), _users.default.changePassword);

/**
 * @swagger
 *
 * /users/{id}:
 *   delete:
 *     tags: [users]
 *     description: delete a user
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: users id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.delete("/:id", _auth.default.required, _auth.default.isAdmin(), (0, _celebrate.celebrate)({
  params: objectIdSchema
}), _users.default.remove);
router.put("/me", (0, _celebrate.celebrate)({
  body: _user.updateMeSchema
}), _auth.default.required, _users.default.updateMe);

/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     tags: [users]
 *     description: update a user
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: user id
 *         required: true
 *         type: string
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/User'
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/User'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.put("/:id", _auth.default.required, _auth.default.isAdmin(), (0, _celebrate.celebrate)({
  params: objectIdSchema
}), _users.default.update);
router.delete("/me/delete-account", _auth.default.required, _users.default.deleteAccount);
var _default = exports.default = router;