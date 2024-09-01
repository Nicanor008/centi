"use strict";

var _passport = _interopRequireDefault(require("passport"));
var _passportJwt = require("passport-jwt");
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _lodash = _interopRequireDefault(require("lodash"));
var _users = _interopRequireDefault(require("../api/users/users.model"));
var _logger = _interopRequireDefault(require("./logger"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// used to serialize the user for the session
_passport.default.serializeUser(function (user, done) {
  done(null, user.id);
});

// used to deserialize the user
_passport.default.deserializeUser(function (id, done) {
  _users.default.findById(id, function (err, user) {
    done(err, user);
  });
});

// JWT
const jwtOpts = {};
jwtOpts.jwtFromRequest = _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromAuthHeaderWithScheme("Bearer"), _passportJwt.ExtractJwt.fromUrlQueryParameter("token")]);
jwtOpts.secretOrKey = _config.default.jwt.secret;
_passport.default.use(new _passportJwt.Strategy(jwtOpts, function (payload, done) {
  _users.default.findOne({
    _id: payload.uid
  }).select("-services -token").exec(function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

// local
const localOpts = {
  usernameField: "email"
};
const localStrategy = new _passportLocal.default(localOpts, (email, password, done) => {
  _logger.default.info("========localStrategy========");
  _users.default.findOne({
    email
  }).then(user => {
    if (!user) {
      return done(null, false);
    } else if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  }).catch(err => {
    return done(err, false);
  });
});
_passport.default.use(localStrategy);

// TODO: Enable and update this once ready to use social login
// Google
// passport.use(
//   new GoogleTokenStrategy(
//     {
//       clientID: config.google.clientID,
//       clientSecret: config.google.clientSecret
//     },
//     function(accessToken, refreshToken, profile, done) {
//       // logger.info("=========profile============: ", profile);
//       process.nextTick(function() {
//         profile = profile["_json"];
//         // logger.info("=========profile============: ", profile);
//         // find the user in the database based on their facebook id
//         User.findOne({ email: profile.email }, function(err, user) {
//           // if there is an error, stop everything and return that
//           // ie an error connecting to the database
//           if (err) return done(err);

//           // if the user is found, then log them in
//           if (user) {
//             return done(null, user); // user found, return that user
//           } else {
//             // if there is no user found with that facebook id, create them
//             var newUser = new User();

//             // set all of the facebook information in our user model
//             newUser.services.google.id = profile.id;
//             newUser.services.google.token = accessToken;
//             newUser.first_name = profile.given_name;
//             newUser.last_name = profile.family_name;
//             newUser.email = profile.email;
//             newUser.avatar = profile.picture;
//             var new_user = _.assign(newUser);

//             // save our user to the database
//             newUser.save(function(err) {
//               if (err) throw err;

//               // if successful, return the new user
//               return done(null, new_user);
//             });
//           }
//         });
//       });
//     }
//   )
// );

// Facebook
// passport.use(
//   new FacebookTokenStrategy(
//     {
//       clientID: config.facebook.clientID,
//       clientSecret: config.facebook.clientSecret,
//       profileFields: ["id", "first_name", "last_name", "email", "picture"]
//     },
//     function(accessToken, refreshToken, profile, done) {
//       // asynchronous
//       process.nextTick(function() {
//         profile = profile["_json"];
//         logger.info("========profile=--=======", profile);
//         // find the user in the database based on their facebook id
//         User.findOne({ email: profile.email }, function(err, user) {
//           // if there is an error, stop everything and return that
//           // ie an error connecting to the database
//           if (err) return done(err);

//           // if the user is found, then log them in
//           if (user) {
//             if (user.avatar) {
//               return done(null, user); // user found, return that user
//             } else {
//               user.avatar = util.format(
//                 "http://graph.facebook.com/%s/picture?type=large",
//                 profile.id
//               );
//               user.save(function(err, data) {
//                 if (err) throw err;

//                 // if successful, return the user
//                 return done(null, data);
//               });
//             }
//           } else {
//             // if there is no user found with that facebook id, create them
//             var newUser = new User();

//             // set all of the facebook information in our user model
//             newUser.services.facebook.id = profile.id;
//             newUser.services.facebook.token = accessToken;
//             newUser.first_name = profile.first_name;
//             newUser.last_name = profile.last_name;
//             newUser.email = profile.email;
//             newUser.avatar = util.format(
//               "http://graph.facebook.com/%s/picture?type=large",
//               profile.id
//             );
//             var new_user = _.assign(newUser, { new: true });
//             // new_user.new = true;
//             // save our user to the database
//             newUser.save(function(err) {
//               if (err) {
//                 throw err;
//               }
//               // if successful, return the new user
//               return done(null, new_user);
//             });
//           }
//         });
//       });
//     }
//   )
// );