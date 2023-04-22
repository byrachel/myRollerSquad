import type { NextApiResponse } from "next";
import bcrypt from "bcrypt";
// import cookie from "cookie";
// import { v4 as uuidv4 } from "uuid";

import prisma from "../../../server/prisma/db/client";
import handler, {
  initValidation,
  post,
  check,
} from "../../../server/middleware/validators";
// import { generateTokens } from "../../../server/utils/jwt";
import { E1, E3 } from "src/constants/ErrorMessages";

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage("Check your email."),
  check("password")
    .isStrongPassword({
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
    })
    .withMessage("password is empty or incorrect."),
]);

import { withSessionRoute } from "@/server/middleware/auth/withSession";

export default withSessionRoute(loginRoute);

async function loginRoute(req: any, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(401).json({ code: E1 });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ code: E3 });

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.password) {
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) return res.status(400).json({ code: E3 });

      const user = (req.session.user = {
        id: existingUser.id,
        role: existingUser.role,
        isLoggedIn: true,
      });
      await req.session.save();

      res.status(200).json({ user });
    } else {
      res.status(400).json({ code: E3 });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ code: E3 });
  }
}
