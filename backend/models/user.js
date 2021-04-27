const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      uniqu: true,
      trim: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    //   come back here
    enc_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtuals

userSchema
  .virtuals("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.enc_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });
// methods
userSchema.method = {
  // method1
  authenticate: function (plainpassword) {
    if (this.securePassword(plainpassword) === this.enc_password) {
      return true;
    } else {
      return false;
    }
  },

  // method 2
  securePassword: function (planinpassword) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.export = mongoose.model("User", userSchema);
