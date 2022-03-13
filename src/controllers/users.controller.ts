import { IRouter, Router } from "express";
import { UsersService } from "../services";

const UsersController: IRouter = Router();

UsersController.post("/sign-up", async (req, res) => {
  try {
    const newUser = await UsersService.signUp(req.body);
    res
      .status(201)
      .json({
        status: 201,
        message: "Successfully signed-up new user.",
        data: newUser,
      });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        message: `Something went wrong while signing up: ${error.message}`,
      });
  }
});

export default UsersController;
