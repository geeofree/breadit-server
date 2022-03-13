import { IRouter, Router } from "express";
import { UsersService } from "../services";

const UsersController: IRouter = Router();

UsersController.post("/sign-up", async (req, res) => {
  try {
    const newUser = await UsersService.signUp(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully signed-up new user.",
      data: newUser,
    });
  } catch (error: any) {
    if (error.message.includes("username")) {
      return res
        .status(400)
        .json({ status: 400, message: "Username has already been taken." });
    }

    console.error(`Something went wrong while signing up:`, error);

    res.status(500).json({
      status: 500,
      message: `Something went wrong while signing up: ${error.message}`,
    });
  }
});

UsersController.post("/sign-in", async (req, res) => {
  try {
    const token = await UsersService.signIn(req.body);

    if (token === null) {
      return res.status(404).json({
        status: 404,
        message:
          "Failed to sign-in. Invalid username or password. Please try again.",
      });
    }

    res
      .status(200)
      .json({ status: 200, message: "Sign-in successful.", data: token });
  } catch (error: any) {
    console.error(`Something went wrong while signing in:`, error);
    res.status(500).json({
      status: 500,
      message: `Something went wrong while signing in: ${error.message}`,
    });
  }
});

export default UsersController;
