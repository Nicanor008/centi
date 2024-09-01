"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.authLocal = exports.authJwt = exports.authGoogleToken = exports.authFacebookToken = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _response = _interopRequireDefault(require("../helpers/response"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AuthService {
  static getTokenFromHeaderOrQuerystring(req) {
    const re = /(\S+)\s+(\S+)/;
    if (req.headers.authorization) {
      const matches = req.headers.authorization.match(re);
      return matches && {
        scheme: matches[1],
        value: matches[2]
      };
    } else if (req.query && req.query.token) {
      const matches = req.query.token.match(re);
      return matches && {
        scheme: matches[1],
        value: matches[2]
      };
    } else {
      return null;
    }
  }
  static required(req, res, next) {
    return _passport.default.authenticate("jwt", {
      session: false
    }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return _response.default.error(res, {
          code: "Unauthorized",
          message: "Invalid Token"
        }, 401);
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return next();
        });
      }
    })(req, res, next);
  }
  static roles(roles = []) {
    return (req, res, next) => {
      if (typeof roles === "string") {
        roles = [roles];
      }
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return _response.default.error(res, {
          message: "You are not authorized to access this page!",
          code: "Unauthorized"
        }, 401);
      }

      // authentication and authorization successful
      next();
    };
  }
  static optional(req, res, next) {
    const token = AuthService.getTokenFromHeaderOrQuerystring(req);
    if (token) {
      return AuthService.required(req, res, next);
    } else {
      next();
    }
  }
  static isAdmin() {
    return AuthService.roles("admin");
  }
}

// export const authLocal = passport.authenticate('local', { session: false });
exports.default = AuthService;
const authLocal = (req, res, next) => {
  _passport.default.authenticate("local", {
    session: true
  }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return _response.default.error(res, {
        code: "Unauthorized",
        message: "Your email or password is incorrect"
      }, 401);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};
exports.authLocal = authLocal;
const authJwt = exports.authJwt = _passport.default.authenticate("jwt", {
  session: false
});
const authFacebookToken = exports.authFacebookToken = _passport.default.authenticate("facebook-token");
const authGoogleToken = exports.authGoogleToken = _passport.default.authenticate("google-token");