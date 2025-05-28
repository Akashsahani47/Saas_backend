import { check } from "express-validator";

export const adminRegisterValidation = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    check("name")
    .notEmpty()
    .withMessage("Name is required")
];

export const userRegisterValidation = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
];
