import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller.js";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password is not valid"),
  ],
  loginUser
);

export default router;
