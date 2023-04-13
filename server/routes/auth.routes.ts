import express from "express";
import { check } from "express-validator";

import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import {
  // login,
  logout,
  signIn,
  userIsLoggedIn,
} from "../core/controllers/AuthController";

const authRouter = express.Router();

authRouter.post(
  "/api/register",
  [
    check("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }),
    check("email").isEmail().normalizeEmail(),
    check("name").not().isEmpty().trim(),
  ],
  signIn
);
// authRouter.post("/api/login", login);
authRouter.post("/api/logout", logout);
authRouter.get("/api/user", isAuthenticated, userIsLoggedIn);

export default authRouter;
