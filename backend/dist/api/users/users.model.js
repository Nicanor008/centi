"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ROLES = {
  USER: "user",
  ADMIN: "admin"
};
const UserSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  avatar: {
    src: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: false,
    minlength: 4
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  },
  otp: {
    type: String,
    required: false
  },
  otpLastUpdate: {
    type: String,
    required: false
  },
  // services: {
  //   facebook: {
  //     id: String,
  //     token: String
  //   },
  //   google: {
  //     id: String,
  //     token: String
  //   },
  //   apple: {
  //     id: String,
  //     token: String
  //   }
  // },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
});
UserSchema.pre("save", async function () {
  const password = this.password;
  if (this.isModified("password")) {
    const saltRounds = 10;
    const passwordHash = await _bcryptjs.default.hash(password, saltRounds);
    this.password = passwordHash;
  }
});
UserSchema.methods = {
  verifyPassword: function (password) {
    return _bcryptjs.default.compareSync(password, this.password);
  },
  toJSON: function () {
    const obj = this.toObject({
      virtuals: true
    });
    obj.hasPassword = !!obj.password;
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
  },
  isAdmin: function () {
    return this.role === ROLES.ADMIN;
  }
};
UserSchema.plugin(_mongoosePaginateV.default);
UserSchema.plugin(_mongooseUniqueValidator.default);
var _default = exports.default = _mongoose.default.model("User", UserSchema);