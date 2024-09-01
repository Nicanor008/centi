"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _refreshToken = _interopRequireDefault(require("./refreshToken.controller"));
var _auth = _interopRequireDefault(require("../../middlewares/auth"));
var _refreshToken2 = require("./refreshToken.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
/**
 * @swagger
 *
 * definitions:
 *   RefreshToken:
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
 *   ArrayOfRefreshTokens:
 *      type: array
 *      items:
 *        $ref: '#/definitions/RefreshToken'
 */

/**
 * @swagger
 *
 * /refreshTokens:
 *   post:
 *     tags: [refreshTokens]
 *     description: create a refreshToken
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/RefreshToken'
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/RefreshToken'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */

router.post("/", [_auth.default.required, (0, _celebrate.celebrate)({
  body: _refreshToken2.createValidationSchema
})], _refreshToken.default.create);

/**
 * @swagger
 *
 * /refreshTokens:
 *   put:
 *     tags: [refreshTokens]
 *     description: create a refreshToken
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/RefreshToken'
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/RefreshToken'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */

router.put("/:id", [_auth.default.required], (0, _celebrate.celebrate)({
  body: _refreshToken2.updateValidationSchema
}), _refreshToken.default.update);

/**
 * @swagger
 *
 * /refreshTokens:
 *   get:
 *     tags: [refreshTokens]
 *     description: get all refreshTokens
 *     produces:
 *       - application/json
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
 *                $ref: '#/definitions/ArrayOfRefreshTokens'
 *        401:
 *          $ref: '#/responses/Unauthorized'
 */
router.get("/", _auth.default.optional, (0, _celebrate.celebrate)({
  query: _refreshToken2.customPaginateValidateSchema
}), _refreshToken.default.findAll);

/**
 * @swagger
 *
 * /refreshTokens/{id}:
 *   get:
 *     tags: [refreshTokens]
 *     description: get detail refreshToken
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: refreshToken id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/RefreshToken'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.get("/:id", _refreshToken.default.findOne);

/**
 * @swagger
 *
 * /refreshTokens/{id}:
 *   delete:
 *     tags: [refreshTokens]
 *     description: delete a refreshToken
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: refreshTokens id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/RefreshToken'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.delete("/:id", _auth.default.required, _refreshToken.default.remove);
var _default = exports.default = router;