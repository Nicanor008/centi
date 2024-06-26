import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

const ROLES = {
  USER: "user",
  ADMIN: "admin"
};

const UserSchema = new Schema(
  {
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
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function() {
  const password = this.password;
  if (this.isModified("password")) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    this.password = passwordHash;
  }
});

UserSchema.methods = {
  verifyPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  },
  toJSON: function() {
    const obj = this.toObject({ virtuals: true });
    obj.hasPassword = !!obj.password;
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
  },
  isAdmin: function() {
    return this.role === ROLES.ADMIN;
  }
};

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("User", UserSchema);
