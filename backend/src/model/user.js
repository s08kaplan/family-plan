"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const { randomBytes } = require("node:crypto");

const {
  emailValidate,
  passwordEncrypt,
  encryptFunc,
} = require("../helpers/validationHelpers");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
        type: String,
        required: true,
        set:(email) => emailValidate(email)
    },

    contactNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
      // set: (password) => passwordEncrypt(password),//!pre handle this part
    },

    image: {
      type: String,
      trim: true,
      required: true
    },

    role: {
      type: String,
      required: true,
      enum: {
        values: ["Dad", "Mom", "Kid"],
        message: "Please enter a valid role",
      },
    },

    startDate: {
       type: String,
       trim: true,
       required: true,
       default:Date.now
    },

    salt: {
      type: String,
      required: true, 
      default: () => randomBytes(16).toString("hex"),
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
      // Generate a unique salt
      const salt = randomBytes(16).toString("hex");
      this.salt = salt
  
      // Hash the password using the salt
      this.password = encryptFunc(this.password, salt);
    }
    next();
  });

module.exports = model("User", UserSchema);
