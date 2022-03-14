import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../database/models";

async function ValidateJwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader) {
      return res
        .status(400)
        .json({
          status: 400,
          message:
            "Please provide an Authorization header with a bearer token scheme.",
        });
    }

    const [_, token] = authHeader.split(" ");

    if (!token) {
      return res
        .status(400)
        .json({ status: 400, message: "Please provide a bearer token" });
    }

    const currentUser = verify(token, process.env.JWT_SECRET || "sshhh");
    req.currentUser = currentUser as User;
    next();
  } catch (error: any) {
    console.error("Something went wrong while verifying jwt:", error);
    res
      .status(500)
      .json({
        status: 500,
        message: `Something went wrong while verifying jwt: ${error.message}`,
      });
  }
}

export default ValidateJwtMiddleware;
